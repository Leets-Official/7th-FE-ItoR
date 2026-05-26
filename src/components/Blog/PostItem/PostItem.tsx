import Avatar from "@/components/Avatar/Avatar";
import type { ApiPost } from "@/types/post";
import { formatPostDate } from "@/utils/dateUtils";
import {
  listItem,
  upperWrapper,
  textSection,
  postTitle,
  postMeta,
  postNickName,
  postImage,
} from "./PostItem.styled";

interface PostItemProps {
  post: ApiPost;
  isLast?: boolean;
  onClick?: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onClick }) => {
  const previewText = (post.contents ?? []).find((c) => c.contentType === "TEXT")?.content ?? "";
  const previewImage = (post.contents ?? []).find((c) => c.contentType === "IMAGE")?.content;

  return (
    <li className={`${listItem} cursor-pointer`} onClick={onClick}>
      <div className={upperWrapper}>
        <div className={textSection}>
          <h2 className={postTitle}>{post.title}</h2>

          {previewText && (
            <p className="text-brand-darkGray mt-1 w-full max-w-[600px] truncate text-sm">
              {previewText}
            </p>
          )}
        </div>

        {previewImage && <img src={previewImage} alt={post.title} className={postImage} />}
      </div>

      <div className={postMeta}>
        <Avatar src={post.profileUrl} size="xs" />
        <span className={postNickName}>{post.nickName}</span>
        <span>{formatPostDate(post.createdAt)}</span>
        <span>댓글 {post.commentCount}</span>
      </div>
    </li>
  );
};

export default PostItem;
