import { useState } from "react";
import { getPresignedUrl, uploadImageToS3 } from "@/api/imageApi";

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setUploading(true);

      if (USE_MOCK_AUTH) {
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("이미지 업로드에 실패했습니다."));
          reader.readAsDataURL(file);
        });
      }

      const presignedUrl = await getPresignedUrl(file.name);
      await uploadImageToS3(presignedUrl, file);

      return presignedUrl.split("?")[0];
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
