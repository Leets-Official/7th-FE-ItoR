import { useEffect, useRef, useState, type ChangeEventHandler } from 'react';

export function useProfileImage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageError, setProfileImageError] = useState('');

  const isBlobUrl = (url: string) => url.startsWith('blob:');

  useEffect(
    () => () => {
      if (profileImage && isBlobUrl(profileImage)) {
        URL.revokeObjectURL(profileImage);
      }
    },
    [profileImage],
  );

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleProfileFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setProfileImageError('* 이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    if (profileImage && isBlobUrl(profileImage)) {
      URL.revokeObjectURL(profileImage);
    }

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    setProfileImageError('');
    event.target.value = '';
  };

  return {
    fileInputRef,
    profileImage,
    setProfileImage,
    profileImageError,
    setProfileImageError,
    openFileDialog,
    handleProfileFileChange,
  };
}
