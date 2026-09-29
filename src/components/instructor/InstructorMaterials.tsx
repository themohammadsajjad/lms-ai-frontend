import {
  BookOpen,
  CheckCircle2,
  FileText,
  Film,
  Presentation,
  Trash2,
  Upload,
} from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { instructorService } from '../../services/instructorService';
import {
  instructorMaterialService,
  type MaterialType,
} from '../../services/instructorMaterialService';

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function getMaterialIcon(type: MaterialType) {
  if (type === 'video') {
    return <Film size={18} />;
  }

  if (type === 'slides') {
    return <Presentation size={18} />;
  }

  return <FileText size={18} />;
}

function InstructorMaterials() {
  const courses = instructorService.getCourses();

  const [courseId, setCourseId] = useState(
    courses[0]?.id ?? '',
  );

  const [title, setTitle] = useState('');

  const [materialType, setMaterialType] =
    useState<MaterialType>('video');

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [materials, setMaterials] = useState(() =>
    instructorMaterialService.getMaterials(),
  );

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const selectedCourse = courses.find(
    (course) => course.id === courseId,
  );

  const courseMaterials = useMemo(
    () =>
      materials.filter(
        (material) =>
          material.courseId === courseId,
      ),
    [materials, courseId],
  );

  function getAcceptValue() {
    if (materialType === 'video') {
      return 'video/mp4,video/webm,video/ogg';
    }

    if (materialType === 'pdf') {
      return 'application/pdf,.pdf';
    }

    return '.ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';
  }

  function resetForm() {
    setTitle('');
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleUpload() {
    if (
      !courseId ||
      !title.trim() ||
      !selectedFile
    ) {
      return;
    }

    const updated =
      instructorMaterialService.uploadMaterial({
        courseId,
        title,
        type: materialType,
        file: selectedFile,
      });

    setMaterials(updated);
    resetForm();
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
            Upload learning content
          </h2>

          <p>
            Add videos, PDFs and slide decks
            to your courses.
          </p>
        </div>

        <div className="course-status-summary">
          <strong>
            {courseMaterials.length}
          </strong>

          <span>
            Materials
          </span>
        </div>
      </div>

      <div className="material-upload-layout">
        <section className="material-upload-panel">
          <div className="material-upload-heading">
            <div className="material-upload-icon">
              <Upload size={20} />
            </div>

            <div>
              <span>
                New material
              </span>

              <h3>
                Add course content
              </h3>
            </div>
          </div>

          <div className="material-form">
            <label className="material-form-field">
              <span>
                Course
              </span>

              <select
                value={courseId}
                onChange={(event) => {
                  setCourseId(
                    event.target.value,
                  );

                  resetForm();
                }}
              >
                {courses.map(
                  (course) => (
                    <option
                      key={course.id}
                      value={course.id}
                    >
                      {course.title}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="material-form-field">
              <span>
                Material type
              </span>

              <select
                value={materialType}
                onChange={(event) => {
                  setMaterialType(
                    event.target
                      .value as MaterialType,
                  );

                  setSelectedFile(null);

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
                onChange={(event) =>
                  setTitle(
                    event.target.value,
                  )
                }
                placeholder="e.g. Introduction to React Hooks"
              />
            </label>

            <div className="material-form-full">
              <span className="material-field-label">
                File
              </span>

              <input
                ref={fileInputRef}
                id="instructor-material-file"
                className="material-file-input"
                type="file"
                accept={getAcceptValue()}
                onChange={(event) =>
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
                  <Upload size={24} />

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
                      Select a file from
                      your computer
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
              !title.trim() ||
              !selectedFile
            }
            onClick={handleUpload}
          >
            <Upload size={15} />
            Add material
          </button>

          <p className="material-demo-note">
            Frontend demo: file metadata is
            saved locally. Actual file bytes
            would be uploaded to storage by
            the backend in production.
          </p>
        </section>

        <aside className="material-course-summary">
          <div>
            <BookOpen size={20} />
          </div>

          <span>
            Selected course
          </span>

          <h3>
            {selectedCourse?.title ??
              'No course selected'}
          </h3>

          <p>
            {selectedCourse?.description ??
              'Choose a course to manage its materials.'}
          </p>

          <div className="material-summary-count">
            <strong>
              {courseMaterials.length}
            </strong>

            <span>
              Uploaded materials
            </span>
          </div>
        </aside>
      </div>

      <section className="material-library-section">
        <div className="section-heading">
          <div>
            <h2>
              Course material library
            </h2>

            <p>
              Files added to{' '}
              <strong>
                {selectedCourse?.title}
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
                  key={material.id}
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
                    <Trash2 size={16} />
                  </button>
                </article>
              ),
            )}
          </div>
        ) : (
          <div className="material-empty-state">
            <FileText size={28} />

            <h3>
              No materials yet
            </h3>

            <p>
              Upload a video, PDF or slide
              deck for this course.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

export default InstructorMaterials;