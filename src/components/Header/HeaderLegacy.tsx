import { AddPhotoAlternateIcon, FolderOpenIcon } from "@/assets/icons/index";
import { legacyHeader, legacyButtonGroup, legacyButton } from "./Header.styled";

interface HeaderLegacyProps {
  showPhotoButton?: boolean;
  showFileButton?: boolean;
  onPhotoClick?: () => void;
  onFileClick?: () => void;
}

const HeaderLegacy: React.FC<HeaderLegacyProps> = ({
  showPhotoButton = true,
  showFileButton = true,
  onPhotoClick,
  onFileClick,
}) => {
  return (
    <div className={legacyHeader}>
      <div className={legacyButtonGroup}>
        {showPhotoButton && (
          <button className={legacyButton} type="button" onClick={onPhotoClick}>
            <AddPhotoAlternateIcon className="text-brand-gray h-3 w-3" />
            사진 추가하기
          </button>
        )}

        {showFileButton && (
          <button className={legacyButton} type="button" onClick={onFileClick}>
            <FolderOpenIcon className="text-brand-gray h-3 w-3" />
            파일 추가하기
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderLegacy;
