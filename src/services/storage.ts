import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import { storage } from "@/lib/firebase";

export interface UploadFileResult {
    url: string;
    path: string;
}

export async function uploadFile(
  file: File,
  folder: string
): Promise<UploadFileResult> {

  const fileName = `${Date.now()}-${file.name}`;

  const storageRef = ref(
    storage,
    `${folder}/${fileName}`
  );

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  return {
    url,
    path: storageRef.fullPath,
  };
}

export async function deleteFile(
  path: string
){
  const storageRef = ref(storage, path)

  await deleteObject(storageRef)
}

export function getStoragePathFromUrl(
    url: string
): string | null {

    try {

        const match = url.match(
            /\/o\/([^?]+)/
        );

        if (!match) {
            return null;
        }

        return decodeURIComponent(match[1]);

    } catch (error) {

        console.error(
            "No se pudo obtener el path:",
            error
        );

        return null;
    }
}