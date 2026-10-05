import {
  BookOpen,
  CheckCircle2,
  FileText,
  Film,
  Layers3,
  Presentation,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  courses as catalogCourses,
} from '../../data/mockData';
import {
  lessonsByCourse,
} from '../../data/learningData';
import { instructorService } from '../../services/instructorService';
import {
  instructorMaterialService,
  type MaterialType,
} from '../../services/instructorMaterialService';

function formatFileSize(
  size: number,
) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (
    size <
    1024 * 1024
  ) {
    return `${(
      size / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function getMaterialIcon(
  type: MaterialType,
) {
  if (type === 'video') {
    return (
      <Film size={18} />
    );
  }

  if (type === 'slides') {
    return (
      <Presentation
        size={18}
      />
    );
  }

  return (
    <FileText size={18} />
  );
}

function getCatalogCourse(
  courseTitle?: string,
) {
  return catalogCourses.find(
    (course) =>
      course.title ===
      courseTitle,
  );
}

function getModuleNames(
  courseTitle?: string,
): string[] {
  const course =
    getCatalogCourse(
      courseTitle,
    );

  return (
    course?.modules.map(
      (module) =>
        module.title,
    ) ?? []
  );
}

function getLectureNames(
  courseTitle: string | undefined,
  moduleName: string,
): string[] {
  const course =
    getCatalogCourse(
      courseTitle,
    );

  if (!course) {
    return [];
  }

  return (
    lessonsByCourse[
      course.id
    ] ?? []
  )
    .filter(
      (lesson) =>
        lesson.module ===
        moduleName,
    )
    .map(
      (lesson) =>
        lesson.title,
    );
}

function InstructorMaterials() {
  const courses =
    instructorService.getCourses();

  const firstCourse =
    courses[0];

  const firstModules =
    getModuleNames(
      firstCourse?.title,
    );

  const initialModule =
    firstModules[0] ?? '';

  const firstLectures =
    getLectureNames(
      firstCourse?.title,
      initialModule,
    );

  const [courseId, setCourseId] =
    useState(
      firstCourse?.id ?? '',
    );

  const [
    moduleName,
    setModuleName,
  ] = useState(
    initialModule,
  );

  const [
    lectureName,
    setLectureName,
  ] = useState(
    firstLectures[0] ?? '',
  );

  const [title, setTitle] =
    useState('');

  const [
    materialType,
    setMaterialType,
  ] =
    useState<MaterialType>(
      'video',
    );

  const [
    selectedFile,
    setSelectedFile,
  ] =
    useState<File | null>(
      null,
    );

  const [
    materials,
    setMaterials,
  ] = useState(() =>
    instructorMaterialService.getMaterials(),
  );

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const selectedCourse =
    courses.find(
      (course) =>
        course.id ===
        courseId,
    );

  const moduleOptions =
    useMemo(
      () =>
        getModuleNames(
          selectedCourse?.title,
        ),
      [
        selectedCourse
          ?.title,
      ],
    );

  const lectureOptions =
    useMemo(
      () =>
        getLectureNames(
          selectedCourse?.title,
          moduleName,
        ),
      [
        selectedCourse
          ?.title,
        moduleName,
      ],
    );

  const courseMaterials =
    useMemo(
      () =>
        materials.filter(
          (material) =>
            material.courseId ===
            courseId,
        ),
      [
        materials,
        courseId,
      ],
    );

  const lectureMaterials =
    useMemo(
      () =>
        courseMaterials.filter(
          (material) =>
            material.moduleName ===
              moduleName &&
            material.lectureName ===
              lectureName,
        ),
      [
        courseMaterials,
        moduleName,
        lectureName,
      ],
    );

  function getAcceptValue() {
    if (
      materialType ===
      'video'
    ) {
      return 'video/mp4,video/webm,video/ogg';
    }

    if (
      materialType ===
      'pdf'
    ) {
      return 'application/pdf,.pdf';
    }

    return '.ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';
  }

  function resetUploadFields() {
    setTitle('');
    setSelectedFile(
      null,
    );

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        '';
    }
  }

  function handleCourseChange(
    newCourseId: string,
  ) {
    setCourseId(
      newCourseId,
    );

    const newCourse =
      courses.find(
        (course) =>
          course.id ===
          newCourseId,
      );

    const modules =
      getModuleNames(
        newCourse?.title,
      );

    const nextModule =
      modules[0] ?? '';

    const lectures =
      getLectureNames(
        newCourse?.title,
        nextModule,
      );

    setModuleName(
      nextModule,
    );

    setLectureName(
      lectures[0] ?? '',
    );

    resetUploadFields();
  }

  function handleModuleChange(
    newModuleName: string,
  ) {
    setModuleName(
      newModuleName,
    );

    const lectures =
      getLectureNames(
        selectedCourse?.title,
        newModuleName,
      );

    setLectureName(
      lectures[0] ?? '',
    );

    resetUploadFields();
  }

  function handleUpload() {
    if (
      !courseId ||
      !moduleName.trim() ||
      !lectureName.trim() ||
      !title.trim() ||
      !selectedFile
    ) {
      return;
    }

    const updated =
      instructorMaterialService.uploadMaterial(
        {
          courseId,
          moduleName,
          lectureName,
          title,
          type:
            materialType,
          file:
            selectedFile,
        },
      );

    setMaterials(
      updated,
    );

    resetUploadFields();
  }

  function handleDelete(
    materialId: string,
  ) {
    setMaterials(
      instructorMaterialService.deleteMaterial(
        materialId,
      ),
    );
  }

  return (
    <section className="instructor-materials-section">
      <div className="instructor-section-heading">
        <div>
          <span className="eyebrow">
            Course materials
          </span>

          <h2>
            Upload learning
            content
          </h2>

          <p>
            Add videos, PDFs
            and slide decks to
            individual modules
            and lectures.
          </p>
        </div>

        <div className="course-status-summary">
          <strong>
            {
              courseMaterials.length
            }
          </strong>

          <span>
            Course materials
          </span>
        </div>
      </div>

      <div className="material-upload-layout">
        <section className="material-upload-panel">
          <div className="material-upload-heading">
            <div className="material-upload-icon">
              <Upload
                size={20}
              />
            </div>

            <div>
              <span>
                New material
              </span>

              <h3>
                Add lecture
                content
              </h3>
            </div>
          </div>

          <div className="material-form">
            <label className="material-form-field">
              <span>
                Course
              </span>

              <select
                value={
                  courseId
                }
                onChange={(
                  event,
                ) =>
                  handleCourseChange(
                    event.target
                      .value,
                  )
                }
              >
                {courses.map(
                  (course) => (
                    <option
                      key={
                        course.id
                      }
                      value={
                        course.id
                      }
                    >
                      {
                        course.title
                      }
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="material-form-field">
              <span>
                Module
              </span>

              {moduleOptions.length >
              0 ? (
                <select
                  value={
                    moduleName
                  }
                  onChange={(
                    event,
                  ) =>
                    handleModuleChange(
                      event
                        .target
                        .value,
                    )
                  }
                >
                  {moduleOptions.map(
                    (module) => (
                      <option
                        key={
                          module
                        }
                        value={
                          module
                        }
                      >
                        {module}
                      </option>
                    ),
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  value={
                    moduleName
                  }
                  onChange={(
                    event,
                  ) => {
                    setModuleName(
                      event
                        .target
                        .value,
                    );

                    setLectureName(
                      '',
                    );
                  }}
                  placeholder="e.g. Module 1"
                />
              )}
            </label>

            <label className="material-form-field">
              <span>
                Lecture
              </span>

              {lectureOptions.length >
              0 ? (
                <select
                  value={
                    lectureName
                  }
                  onChange={(
                    event,
                  ) => {
                    setLectureName(
                      event
                        .target
                        .value,
                    );

                    resetUploadFields();
                  }}
                >
                  {lectureOptions.map(
                    (lecture) => (
                      <option
                        key={
                          lecture
                        }
                        value={
                          lecture
                        }
                      >
                        {
                          lecture
                        }
                      </option>
                    ),
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  value={
                    lectureName
                  }
                  onChange={(
                    event,
                  ) =>
                    setLectureName(
                      event
                        .target
                        .value,
                    )
                  }
                  placeholder="e.g. Introduction lecture"
                />
              )}
            </label>

            <label className="material-form-field">
              <span>
                Material type
              </span>

              <select
                value={
                  materialType
                }
                onChange={(
                  event,
                ) => {
                  setMaterialType(
                    event
                      .target
                      .value as MaterialType,
                  );

                  setSelectedFile(
                    null,
                  );

                  if (
                    fileInputRef.current
                  ) {
                    fileInputRef.current.value =
                      '';
                  }
                }}
              >
                <option value="video">
                  Video lecture
                </option>

                <option value="pdf">
                  PDF document
                </option>

                <option value="slides">
                  Slides
                </option>
              </select>
            </label>

            <label className="material-form-field material-form-full">
              <span>
                Material title
              </span>

              <input
                type="text"
                value={title}
                onChange={(
                  event,
                ) =>
                  setTitle(
                    event
                      .target
                      .value,
                  )
                }
                placeholder="e.g. React Hooks reference slides"
              />
            </label>

            <div className="material-form-full">
              <span className="material-field-label">
                File
              </span>

              <input
                ref={
                  fileInputRef
                }
                id="instructor-material-file"
                className="material-file-input"
                type="file"
                accept={
                  getAcceptValue()
                }
                onChange={(
                  event,
                ) =>
                  setSelectedFile(
                    event.target
                      .files?.[0] ??
                      null,
                  )
                }
              />

              {!selectedFile ? (
                <label
                  htmlFor="instructor-material-file"
                  className="material-file-picker"
                >
                  <Upload
                    size={24}
                  />

                  <div>
                    <strong>
                      Choose{' '}
                      {materialType ===
                      'video'
                        ? 'video'
                        : materialType ===
                            'pdf'
                          ? 'PDF'
                          : 'slides'}
                    </strong>

                    <span>
                      Select a
                      file from
                      your
                      computer
                    </span>
                  </div>
                </label>
              ) : (
                <div className="material-selected-file">
                  <div className="material-selected-icon">
                    {getMaterialIcon(
                      materialType,
                    )}
                  </div>

                  <div>
                    <strong>
                      {
                        selectedFile.name
                      }
                    </strong>

                    <span>
                      {formatFileSize(
                        selectedFile.size,
                      )}
                    </span>
                  </div>

                  <CheckCircle2
                    size={18}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="material-upload-submit"
            disabled={
              !courseId ||
              !moduleName.trim() ||
              !lectureName.trim() ||
              !title.trim() ||
              !selectedFile
            }
            onClick={
              handleUpload
            }
          >
            <Upload
              size={15}
            />

            Add material
          </button>

          <p className="material-demo-note">
            Frontend demo:
            material metadata is
            stored locally.
            Actual file bytes
            would be uploaded to
            object storage by the
            backend.
          </p>
        </section>

        <aside className="material-course-summary">
          <div>
            <BookOpen
              size={20}
            />
          </div>

          <span>
            Selected course
          </span>

          <h3>
            {selectedCourse
              ?.title ??
              'No course selected'}
          </h3>

          <p>
            {selectedCourse
              ?.description ??
              'Choose a course to manage its materials.'}
          </p>

          <div className="material-location-summary">
            <div>
              <Layers3
                size={15}
              />

              <section>
                <span>
                  Module
                </span>

                <strong>
                  {moduleName ||
                    'Not selected'}
                </strong>
              </section>
            </div>

            <div>
              <Film
                size={15}
              />

              <section>
                <span>
                  Lecture
                </span>

                <strong>
                  {lectureName ||
                    'Not selected'}
                </strong>
              </section>
            </div>
          </div>

          <div className="material-summary-count">
            <strong>
              {
                lectureMaterials.length
              }
            </strong>

            <span>
              Materials in
              selected lecture
            </span>
          </div>
        </aside>
      </div>

      <section className="material-library-section">
        <div className="section-heading">
          <div>
            <h2>
              Course material
              library
            </h2>

            <p>
              Files added to{' '}
              <strong>
                {selectedCourse
                  ?.title}
              </strong>
              .
            </p>
          </div>
        </div>

        {courseMaterials.length >
        0 ? (
          <div className="material-library-list">
            {courseMaterials.map(
              (material) => (
                <article
                  className="material-library-card"
                  key={
                    material.id
                  }
                >
                  <div
                    className={`material-library-icon ${material.type}`}
                  >
                    {getMaterialIcon(
                      material.type,
                    )}
                  </div>

                  <div className="material-library-info">
                    <span>
                      {material.type ===
                      'video'
                        ? 'Video'
                        : material.type ===
                            'pdf'
                          ? 'PDF'
                          : 'Slides'}
                    </span>

                    <h3>
                      {
                        material.title
                      }
                    </h3>

                    <p>
                      {
                        material.fileName
                      }
                    </p>

                    <div className="material-library-location">
                      <span>
                        <Layers3
                          size={12}
                        />

                        {
                          material.moduleName
                        }
                      </span>

                      <span>
                        <Film
                          size={12}
                        />

                        {
                          material.lectureName
                        }
                      </span>
                    </div>
                  </div>

                  <div className="material-library-meta">
                    <span>
                      {formatFileSize(
                        material.fileSize,
                      )}
                    </span>

                    <small>
                      {new Date(
                        material.uploadedAt,
                      ).toLocaleString()}
                    </small>
                  </div>

                  <button
                    type="button"
                    className="material-delete-button"
                    onClick={() =>
                      handleDelete(
                        material.id,
                      )
                    }
                    aria-label={`Delete ${material.title}`}
                  >
                    <Trash2
                      size={16}
                    />
                  </button>
                </article>
              ),
            )}
          </div>
        ) : (
          <div className="material-empty-state">
            <FileText
              size={28}
            />

            <h3>
              No materials yet
            </h3>

            <p>
              Upload a video,
              PDF or slide deck
              for a module and
              lecture.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

export default InstructorMaterials;