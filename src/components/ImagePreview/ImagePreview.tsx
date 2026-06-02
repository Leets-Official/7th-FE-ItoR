import { DeleteForeverIcon } from "@/assets/icons";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import * as S from "./ImagePreview.styled";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  onDelete?: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, onDelete }) => {
  const dropdownItems = [
    {
      label: "",
      onClick: onDelete,
      icon: <DeleteForeverIcon width={22} height={22} className={S.dropdownIcon} />,
    },
  ];

  return (
    <div className={S.wrapper}>
      <DropdownMenu
        trigger={<img src={src} alt={alt} className={S.image} />}
        items={dropdownItems}
        position="left"
        menuClassName={S.dropdownMenu}
      />
    </div>
  );
};

export default ImagePreview;
