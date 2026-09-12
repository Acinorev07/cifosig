import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import { storage } from "@/lib/firebase";

export async function uploadFile(
  file: File,
  folder: string
): Promise<string> {

  const fileName = `${Date.now()}-${file.name}`;

  const storageRef = ref(
    storage,
    `${folder}/${fileName}`
  );

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  return url;
}