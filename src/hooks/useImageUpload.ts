import { useState } from "react";
import { getPresignedUrl, uploadImageToS3 } from "@/api/imageApi";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setUploading(true);
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
