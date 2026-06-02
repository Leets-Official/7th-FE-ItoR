import type { JSX } from "react";
import type { ModalProps } from "./Modal.types";
import {
  overlay,
  container,
  title,
  description,
  actions,
  buttonCancel,
  buttonConfirm,
} from "./Modal.styled";

export default function Modal({
  open,
  title: modalTitle,
  description: modalDescription,
  onClose,
  onConfirm,
  confirmText = "삭제하기",
  cancelText = "취소",
  confirmColor,
  cancelColor,
  children,
}: ModalProps): JSX.Element | null {
  if (!open) return null;

  return (
    <div className={overlay}>
      <div className={container}>
        {children ? (
          children
        ) : (
          <>
            <div>
              <div className={title}>{modalTitle}</div>
              {modalDescription && <div className={description}>{modalDescription}</div>}
            </div>

            <div className={actions}>
              <button onClick={onClose} className={`${buttonCancel} ${cancelColor ?? ""}`}>
                {cancelText}
              </button>
              <button onClick={onConfirm} className={`${buttonConfirm} ${confirmColor ?? ""}`}>
                {confirmText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
