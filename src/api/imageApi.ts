import api from "@/api";

export const getPresignedUrl = async (fileName: string): Promise<string> => {
  const res = await api.get("/images/presigned-url", {
    params: { fileName },
  });
  if (res.data?.code !== 200) {
    throw new Error("Presigned URL 요청 실패");
  }
  return res.data.data;
};

export const uploadImageToS3 = async (presignedUrl: string, file: File): Promise<void> => {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
  if (!response.ok) {
    throw new Error("S3 업로드 실패");
  }
};
