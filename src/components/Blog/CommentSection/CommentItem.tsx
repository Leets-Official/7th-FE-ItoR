import { useState, useRef, useEffect } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { MoreVertIcon } from "@/assets/icons";
import DropdownMenuList from "@/components/DropdownMenu/DropdownMenuList";
import * as S from "./CommentSection.styled";
import type { CommentItemProps } from "./CommentItem.types";
import TextField from "@/components/Text/TextField";
import Button from "@/components/Button/Button";

const CommentItem: React.FC<CommentItemProps> = ({
  author,
  date,
  content,
  profileUrl,
  isOwner = false,
  isLoggedIn = false,
  onDelete,
  onEdit,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "수정하기", onClick: () => setIsEditing(true) },
    { label: "삭제하기", onClick: onDelete },
  ];

  return (
    <div className={S.commentItemWrapper}>
      <Avatar src={profileUrl} size="xs" />
      <div className={S.commentItemContent}>
        <div className={S.commentHeader}>
          <div className={S.commentMeta}>
            <p className={S.commentNick}>{author}</p>
            <span className={S.commentDate}>{date}</span>
          </div>

          {isLoggedIn && isOwner && (
            <div className={S.menuWrapper} ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className={S.commentMenuButton}
                aria-label="댓글 메뉴"
              >
                <MoreVertIcon width={18} height={18} />
              </button>

              {isMenuOpen && (
                <div className={S.dropdownPosition}>
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
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2">
            <TextField
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              size="md"
              multiline
              fullWidth
            />
            <div className="flex gap-2">
              <Button
                label="저장"
                size="xs"
                variant="inverse"
                onClick={() => {
                  onEdit?.(editedContent);
                  setIsEditing(false);
                }}
              />
              <Button
                label="취소"
                size="xs"
                variant="tertiary"
                onClick={() => {
                  setEditedContent(content);
                  setIsEditing(false);
                }}
              />
            </div>
          </div>
        ) : (
          <p className={S.commentText}>{content}</p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
