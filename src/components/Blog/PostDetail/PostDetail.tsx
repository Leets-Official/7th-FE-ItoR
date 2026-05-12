import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Avatar from "@/components/Avatar/Avatar";
import CommentSection from "@/components/Blog/CommentSection/CommentSection";
import LoginModal from "@/components/Blog/LoginModal/LoginModal";
import DropdownMenuList from "@/components/DropdownMenu/DropdownMenuList";
import Modal from "@/components/Modal/Modal";
import PageLayout from "@/layouts/PageLayout";
import * as S from "./PostDetail.styled";
import { useUserStore } from "@/store/useUserStore";

import PostDetailSkeleton from "./PostDetailSkeleton";
import { usePostDetail } from "./usePostDetail";

export default function PostDetail() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isLogin = !!user;

  const {
    post,
    loading,
    commentCount,
    setCommentCount,
    isOwner,
    commentRef,
    scrollToComments,
    handleDeletePost,
  } = usePostDetail(postId);

  const menuItems = [
    { label: "수정하기", onClick: () => navigate(`/edit/${postId}`) },
    { label: "삭제하기", onClick: () => setIsDeleteModalOpen(true) },
  ];

  return (
    <PageLayout
      headerVariant="chatMenu"
      onChatClick={scrollToComments}
      onMoreClick={() => setIsMenuOpen((prev) => !prev)}
      showMoreIcon={isOwner}
      onLoginClick={() => setIsLoginOpen(true)}
    >
      {isOwner && isMenuOpen && (
        <div className="absolute top-[55px] right-6 z-[60]">
          <DropdownMenuList
            items={menuItems}
            onItemClick={(item) => {
              item.onClick?.();
              setIsMenuOpen(false);
            }}
            position="right"
          />
        </div>
      )}

      {!loading && !post && (
        <div className="flex h-[calc(100vh-70px)] items-center justify-center text-gray-500">
          게시글을 찾을 수 없습니다.
        </div>
      )}

      {loading ? (
        <PostDetailSkeleton />
      ) : (
        post && (
          <main className={S.container}>
            <section className={S.group}>
              <h1 className={S.title}>{post.title}</h1>

              <div className={S.meta}>
                <Avatar src={post.profileUrl} size="xs" />
                <span className={S.nick}>{post.nickName}</span>
                <span className={S.date}>
                  {new Date(post.createdAt).toLocaleDateString()} 댓글 {commentCount}
                </span>
              </div>
            </section>

            <div className={S.divider} />

            <section className={S.group}>
              {post.content ? (
                <p className={S.content}>{post.content}</p>
              ) : (
                post.contents?.map((c) =>
                  c.contentType === "TEXT" ? (
                    <p key={c.contentOrder} className={S.content}>
                      {c.content}
                    </p>
                  ) : (
                    <img
                      key={c.contentOrder}
                      src={c.content}
                      alt="게시글 이미지"
                      className="mt-4 rounded-xl"
                    />
                  ),
                )
              )}
            </section>

            <div className={S.divider} />

            <section className={S.group} ref={commentRef}>
              <CommentSection
                isLoggedIn={isLogin}
                postId={postId!}
                postAuthorProfile={post.profileUrl}
                postAuthorName={post.nickName}
                onLoginClick={() => setIsLoginOpen(true)}
                onSubmit={() => setCommentCount((prev) => prev + 1)}
              />
            </section>
          </main>
        )
      )}

      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <Modal
        title="해당 블로그를 삭제하시겠어요?"
        description="삭제한 블로그는 다시 확인할 수 없어요."
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePost}
        confirmText="삭제하기"
        cancelText="취소"
        confirmColor="bg-brand-red text-white hover:opacity-90"
      />
    </PageLayout>
  );
}
