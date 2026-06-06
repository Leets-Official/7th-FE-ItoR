import { useNavigate } from 'react-router-dom';

import { Modal } from '@/components/common/Modal';

interface JoinSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinSuccessModal({ isOpen, onClose }: JoinSuccessModalProps) {
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="회원가입이 완료되었습니다!"
      cancelText="확인"
      confirmText="로그인하기"
      confirmTone="primary"
      onCancel={() => navigate('/main')}
      onConfirm={() => navigate('/login')}
    />
  );
}
