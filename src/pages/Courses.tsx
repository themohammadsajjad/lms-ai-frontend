import { useMemo, useState } from 'react';
import {
  BookOpen,
  Clock3,
  Search,
  Star,
  Users,
} from 'lucide-react';
import {
  Link,
  useSearchParams,
} from 'react-router-dom';
import { courseCatalogService } from '../services/courseCatalogService';
import { courseService } from '../services/courseService';

function Courses() {
  const [searchParams] =
    useSearchParams();

  const catalogCourses =
    useMemo(
      () =>
        courseCatalogService.getCatalogCourses(),
      [],
    );

  const [search, setSearch] =
    useState(
      searchParams.get(
        'search',
      ) ?? '',
    );

  const [
    category,
    setCategory,
  ] = useState('All');

  const [
    difficulty,
    setDifficulty,
  ] = useState('All');

  const [
    rating,
    setRating,
  ] = useState('All');

  const categories = [
    'All',
    ...Array.from(
      new Set(
        catalogCourses.map(
          (course) =>
            course.category,
        ),
      ),
    ),
  ];

  const difficulties = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  const filteredCourses =
    useMemo(() => {
      return catalogCourses.filter(
        (course) => {
          const query =
            search
              .trim()
              .toLowerCase();

          const matchesSearch =
            !query ||
            course.title
              .toLowerCase()
              .includes(query) ||
            course.instructor
              .toLowerCase()
              .includes(query);

          const matchesCategory =
            category ===
              'All' ||
            course.category ===
              category;

          const matchesDifficulty =
            difficulty ===
              'All' ||
            course.level ===
              difficulty;

          const minimumRating =
            rating === 'All'
              ? 0
              : Number(
                  rating,
                );

          const matchesRating =
            course.rating >=
            minimumRating;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesDifficulty &&
            matchesRating
          );
        },
      );
    }, [
      catalogCourses,
      search,
      category,
      difficulty,
      rating,
    ]);

  function clearFilters() {
    setSearch('');
    setCategory('All');
    setDifficulty('All');
    setRating('All');
  }

  const hasActiveFilters =
    search.trim() !== '' ||
    category !== 'All' ||
    difficulty !==
      'All' ||
    rating !== 'All';

  return (
    <section className="courses-page">
      <div className="page-heading courses-heading">
        <div>
          <span className="eyebrow">
            Course library
          </span>

          <h1>
            Explore courses
          </h1>

          <p>
            Discover new
            skills or continue
            learning from your
            enrolled courses.
          </p>
        </div>

        <div className="catalog-count">
          <strong>
            {
              filteredCourses.length
            }
          </strong>

          <span>
            Courses available
          </span>
        </div>
      </div>

      <div className="catalog-toolbar">
        <div className="catalog-search">
          <Search
            size={18}
          />

          <input
            type="search"
            placeholder="Search by course or instructor..."
            value={search}
            onChange={(
              event,
            ) =>
              setSearch(
                event.target
                  .value,
              )
            }
          />
        </div>

        <div className="catalog-select-filters">
          <label>
            <span>
              Difficulty
            </span>

            <select
              value={
                difficulty
              }
              onChange={(
                event,
              ) =>
                setDifficulty(
                  event.target
                    .value,
                )
              }
            >
              {difficulties.map(
                (level) => (
                  <option
                    key={
                      level
                    }
                    value={
                      level
                    }
                  >
                    {level ===
                    'All'
                      ? 'All difficulties'
                      : level}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span>
              Rating
            </span>

            <select
              value={
                rating
              }
              onChange={(
                event,
              ) =>
                setRating(
                  event.target
                    .value,
                )
              }
            >
              <option value="All">
                All ratings
              </option>

              <option value="4.8">
                4.8 and above
              </option>

              <option value="4.7">
                4.7 and above
              </option>

              <option value="4.5">
                4.5 and above
              </option>
            </select>
          </label>

          {hasActiveFilters && (
            <button
              type="button"
              className="catalog-clear-filters"
              onClick={
                clearFilters
              }
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="category-filters">
          {categories.map(
            (item) => (
              <button
                type="button"
                key={item}
                className={
                  category ===
                  item
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setCategory(
                    item,
                  )
                }
              >
                {item}
              </button>
            ),
          )}
        </div>
      </div>

      {filteredCourses.length >
      0 ? (
        <div className="course-catalog-grid">
          {filteredCourses.map(
            (
              course,
              index,
            ) => {
              const enrolled =
                courseService.isEnrolled(
                  course,
                );

              return (
                <article
                  className="catalog-card"
                  key={
                    course.id
                  }
                >
                  <div
                    className={`catalog-cover catalog-cover-${
                      (index %
                        4) +
                      1
                    }`}
                  >
                    <div className="catalog-badges">
                      <span>
                        {
                          course.category
                        }
                      </span>

                      {enrolled && (
                        <span className="enrolled-badge">
                          Enrolled
                        </span>
                      )}
                    </div>

                    <div className="catalog-cover-icon">
                      <BookOpen
                        size={
                          28
                        }
                      />
                    </div>
                  </div>

                  <div className="catalog-body">
                    <div className="catalog-level-row">
                      <span>
                        {
                          course.level
                        }
                      </span>

                      <div>
                        <Star
                          size={
                            13
                          }
                          fill={
                            course.rating >
                            0
                              ? 'currentColor'
                              : 'none'
                          }
                        />

                        {course.rating >
                        0
                          ? course.rating
                          : 'New'}
                      </div>
                    </div>

                    <h2>
                      {
                        course.title
                      }
                    </h2>

                    <p className="catalog-instructor">
                      By{' '}
                      {
                        course.instructor
                      }
                    </p>

                    <p className="catalog-description">
                      {
                        course.description
                      }
                    </p>

                    <div className="catalog-meta">
                      <span>
                        <BookOpen
                          size={
                            14
                          }
                        />

                        {
                          course.lessons
                        }{' '}
                        lessons
                      </span>

                      <span>
                        <Clock3
                          size={
                            14
                          }
                        />

                        {
                          course.duration
                        }
                      </span>

                      <span>
                        <Users
                          size={
                            14
                          }
                        />

                        {course.students.toLocaleString()}
                      </span>
                    </div>

                    {enrolled &&
                      course.progress >
                        0 && (
                        <div className="catalog-progress">
                          <div>
                            <span>
                              Your
                              progress
                            </span>

                            <strong>
                              {
                                course.progress
                              }
                              %
                            </strong>
                          </div>

                          <div className="progress-track">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${course.progress}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                    <Link
                      to={`/courses/${course.id}`}
                      className="catalog-button"
                    >
                      {enrolled
                        ? 'Continue course'
                        : 'View course'}
                    </Link>
                  </div>
                </article>
              );
            },
          )}
        </div>
      ) : (
        <div className="catalog-empty">
          <Search
            size={28}
          />

          <h3>
            No courses found
          </h3>

          <p>
            Try changing your
            search or filters.
          </p>

          <button
            type="button"
            onClick={
              clearFilters
            }
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

export default Courses;