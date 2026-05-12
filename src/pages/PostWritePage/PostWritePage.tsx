import HeaderLegacy from "@/components/Header/HeaderLegacy";
import TextField from "@/components/Text/TextField";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import Modal from "@/components/Modal/Modal";
import PageLayout from "@/layouts/PageLayout";
import * as S from "./PostWritePage.styled";
import { useState, useRef } from "react";
import { usePostForm } from "./usePostForm";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useImageValidation } from "@/hooks/useImageValidation";
import { useApiError } from "@/hooks/useApiError";

const PostWritePage: React.FC = () => {
  const {
    title,
    content,
    images,
    setTitle,
    setContent,
    setImages,
    handlePublish,
    handleDeleteImage,
  } = usePostForm();

  const { uploadImage } = useImageUpload();
  const { validateAndShowError } = useImageValidation();
  const { handleError } = useApiError();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCancel = () => {
    if (confirm("작성 중인 내용을 취소하시겠습니까?")) {
      window.location.href = "/blog";
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateAndShowError(file)) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      const uploadedUrl = await uploadImage(file);
      setImages((prev: string[]) => [...prev, uploadedUrl]);
    } catch (error) {
      handleError(error, "이미지 업로드");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <PageLayout
      headerVariant="action"
      onDeleteClick={() => setIsDeleteModalOpen(true)}
      onPublishClick={handlePublish}
      onCancelClick={handleCancel}
    >
      <section className={S.form}>
        <div className={S.spacer} />
        <HeaderLegacy
          showPhotoButton={true}
          showFileButton={false}
          onPhotoClick={() => fileInputRef.current?.click()}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <TextField
          variant="borderless"
          placeholder="제목"
          value={title}
          className={S.title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={S.divider} />

        <TextField
          variant="borderless"
          multiline
          fullWidth
          placeholder="어떠한 것을 깨달았나요?"
          value={content}
          className={S.content}
          onChange={(e) => setContent(e.target.value)}
        />

        {images.length > 0 && (
          <div className={S.imageList}>
            {images.map((src, idx) => (
              <ImagePreview
                key={idx}
                src={src}
                alt={`첨부 이미지 ${idx + 1}`}
                onDelete={() => handleDeleteImage(idx)}
              />
            ))}
          </div>
        )}
      </section>

      <Modal
        open={isDeleteModalOpen}
        title="정말 삭제하시겠습니까?"
        description="입력 중이던 내용은 저장되지 않습니다."
        onClose={() => setIsDeleteModalOpen(false)}
        confirmText="삭제하기"
        cancelText="취소"
        confirmColor="bg-brand-red text-white hover:opacity-90"
        onConfirm={() => (window.location.href = "/blog")}
      />
    </PageLayout>
  );
};

export default PostWritePage;
