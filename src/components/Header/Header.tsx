import { ReorderIcon, ChatIcon, MoreVertIcon } from "@/assets/icons/index";
import type { HeaderProps } from "./Header.types";
import {
  baseHeader,
  leftGroup,
  titleStyle,
  chatMenuWrapper,
  chatMenuButton,
  actionWrapper,
  deleteButton,
  publishButton,
} from "./Header.styled";
import Button from "@/components/SmallButton/SmallButton";

const Header: React.FC<HeaderProps> = ({
  title = "GITLOG",
  variant = "write",
  onWriteClick,
  onChatClick,
  onMenuClick,
  onMoreClick,
  onDeleteClick,
  onPublishClick,
  onEditClick,
  onSaveClick,
  onCancelClick,
  showMoreIcon = true,
}) => {
  return (
    <header className={baseHeader}>
      <div className={leftGroup}>
        <button
          onClick={onMenuClick}
          aria-label="사이드바 열기"
          className="transition hover:opacity-70"
        >
          <ReorderIcon width={22} height={24} />
        </button>

        <span className={titleStyle}>{title}</span>
      </div>

      {variant === "write" && (
        <Button label="글 쓰러 가기" variant="secondaryOutline" onClick={onWriteClick} />
      )}

      {variant === "chatMenu" && (
        <div className={chatMenuWrapper}>
          <button onClick={onChatClick} className={chatMenuButton} aria-label="댓글로 이동">
            <ChatIcon />
          </button>

          {showMoreIcon && (
            <button onClick={onMoreClick} className={chatMenuButton} aria-label="더보기 메뉴">
              <MoreVertIcon />
            </button>
          )}
        </div>
      )}

      {variant === "action" && (
        <div className={actionWrapper}>
          <button className={deleteButton} onClick={onDeleteClick}>
            삭제하기
          </button>
          <button className={publishButton} onClick={onPublishClick}>
            게시하기
          </button>
        </div>
      )}

      {variant === "plain" && <></>}

      {variant === "edit" && (
        <div className={actionWrapper}>
          <button className={publishButton} onClick={onEditClick}>
            수정하기
          </button>
        </div>
      )}

      {variant === "saveCancel" && (
        <div className={actionWrapper}>
          <button className={deleteButton} onClick={onCancelClick}>
            취소하기
          </button>
          <button className={publishButton} onClick={onSaveClick}>
            저장하기
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
