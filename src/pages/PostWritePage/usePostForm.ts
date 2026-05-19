import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, fetchPostDetail, type Post } from "@/api/postApi";
import { useToast } from "@/contexts/ToastContext";

export const usePostForm = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId?: string }>();
  const { showToast } = useToast();

  const isEditMode = Boolean(postId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!isEditMode || !postId) return;
      setLoading(true);

      try {
        const res = await fetchPostDetail(postId);
        const post: Post | undefined = res?.data;

        if (res.code === 200 && post) {
          setTitle(post.title);
          setContent(
            (post.contents ?? [])
              .filter((c) => c.contentType === "TEXT")
              .map((c) => c.content)
              .join("\n"),
          );
          setImages(
            (post.contents ?? []).filter((c) => c.contentType === "IMAGE").map((c) => c.content),
          );
          showToast("게시글 데이터를 불러왔습니다.", "success");
        } else {
          showToast("게시글 불러오기에 실패했습니다.", "error");
        }
      } catch (err) {
        console.error("게시글 로딩 실패:", err);
        showToast("게시글을 불러오는 중 오류가 발생했습니다.", "error");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [isEditMode, postId, showToast]);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      showToast("내용을 입력해 주세요.", "error");
      return;
    }

    const payload: Pick<Post, "title" | "contents"> = {
      title,
      contents: [
        { contentOrder: 1, content, contentType: "TEXT" },
        ...images.map((url, idx) => ({
          contentOrder: idx + 2,
          content: url,
          contentType: "IMAGE" as const,
        })),
      ],
    };

    try {
      const res = isEditMode ? await updatePost(postId!, payload) : await createPost(payload);

      if (res.code === 200 || res.code === 201) {
        showToast(
          isEditMode ? "게시글이 수정되었습니다!" : "게시글이 등록되었습니다!",
          "success",
        );

        setTimeout(() => navigate("/blog", { replace: true }), 1000);
      } else {
        showToast(res.message || "요청 실패", "error");
      }
    } catch (err) {
      console.error("게시글 저장 실패:", err);
      showToast("서버 오류가 발생했습니다.", "error");
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    title,
    content,
    images,
    loading,
    setTitle,
    setContent,
    setImages,
    handlePublish,
    handleDeleteImage,
    isEditMode,
  };
};
