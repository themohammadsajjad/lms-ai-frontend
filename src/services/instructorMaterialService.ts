export type MaterialType =
  | 'video'
  | 'pdf'
  | 'slides';

export interface CourseMaterial {
  id: string;
  courseId: string;
  title: string;
  type: MaterialType;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
}

export interface UploadMaterialData {
  courseId: string;
  title: string;
  type: MaterialType;
  file: File;
}

const MATERIALS_KEY =
  'lms_instructor_materials';

function readMaterials(): CourseMaterial[] {
  const stored =
    localStorage.getItem(
      MATERIALS_KEY,
    );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(
      stored,
    ) as CourseMaterial[];
  } catch {
    return [];
  }
}

function saveMaterials(
  materials: CourseMaterial[],
) {
  localStorage.setItem(
    MATERIALS_KEY,
    JSON.stringify(materials),
  );
}

export const instructorMaterialService = {
  getMaterials(): CourseMaterial[] {
    return readMaterials();
  },

  getMaterialsForCourse(
    courseId: string,
  ): CourseMaterial[] {
    return readMaterials().filter(
      (material) =>
        material.courseId ===
        courseId,
    );
  },

  uploadMaterial(
    data: UploadMaterialData,
  ): CourseMaterial[] {
    const materials =
      readMaterials();

    const newMaterial: CourseMaterial = {
      id: crypto.randomUUID(),
      courseId: data.courseId,
      title: data.title.trim(),
      type: data.type,
      fileName: data.file.name,
      fileSize: data.file.size,
      fileType: data.file.type,
      uploadedAt:
        new Date().toISOString(),
    };

    const updated = [
      newMaterial,
      ...materials,
    ];

    saveMaterials(updated);

    return updated;
  },

  deleteMaterial(
    materialId: string,
  ): CourseMaterial[] {
    const updated =
      readMaterials().filter(
        (material) =>
          material.id !==
          materialId,
      );

    saveMaterials(updated);

    return updated;
  },

  getMaterialCountForCourse(
    courseId: string,
  ): number {
    return this.getMaterialsForCourse(
      courseId,
    ).length;
  },
};