import { useMemo, useState } from 'react';
import {
  BookOpen,
  Clock3,
  Search,
  Star,
  Users,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { courses } from '../data/mockData';
import { courseService } from '../services/courseService';

function Courses() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get('search') ?? '',
);
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    ...Array.from(new Set(courses.map((course) => course.category))),
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === 'All' || course.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <section className="courses-page">
      <div className="page-heading courses-heading">
        <div>
          <span className="eyebrow">Course library</span>
          <h1>Explore courses</h1>
          <p>
            Discover new skills or continue learning from your enrolled
            courses.
          </p>
        </div>

        <div className="catalog-count">
          <strong>{filteredCourses.length}</strong>
          <span>Courses available</span>
        </div>
      </div>

      <div className="catalog-toolbar">
        <div className="catalog-search">
          <Search size={18} />

          <input
            type="search"
            placeholder="Search by course or instructor..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="course-catalog-grid">
          {filteredCourses.map((course, index) => {
            const enrolled = courseService.isEnrolled(course);

            return (
              <article className="catalog-card" key={course.id}>
                <div className={`catalog-cover catalog-cover-${(index % 4) + 1}`}>
                  <div className="catalog-badges">
                    <span>{course.category}</span>

                    {enrolled && (
                      <span className="enrolled-badge">Enrolled</span>
                    )}
                  </div>

                  <div className="catalog-cover-icon">
                    <BookOpen size={28} />
                  </div>
                </div>

                <div className="catalog-body">
                  <div className="catalog-level-row">
                    <span>{course.level}</span>

                    <div>
                      <Star size={13} fill="currentColor" />
                      {course.rating}
                    </div>
                  </div>

                  <h2>{course.title}</h2>
                  <p className="catalog-instructor">
                    By {course.instructor}
                  </p>

                  <p className="catalog-description">
                    {course.description}
                  </p>

                  <div className="catalog-meta">
                    <span>
                      <BookOpen size={14} />
                      {course.lessons} lessons
                    </span>

                    <span>
                      <Clock3 size={14} />
                      {course.duration}
                    </span>

                    <span>
                      <Users size={14} />
                      {course.students.toLocaleString()}
                    </span>
                  </div>

                  {enrolled && course.progress > 0 && (
                    <div className="catalog-progress">
                      <div>
                        <span>Your progress</span>
                        <strong>{course.progress}%</strong>
                      </div>

                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/courses/${course.id}`}
                    className="catalog-button"
                  >
                    {enrolled ? 'Continue course' : 'View course'}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="catalog-empty">
          <Search size={28} />
          <h3>No courses found</h3>
          <p>Try another search term or category.</p>
        </div>
      )}
    </section>
  );
}

export default Courses;