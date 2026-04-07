import { TOAST_BASE_CLASS, TOAST_VARIANT_CLASS } from './Toast.style'
import { cn } from '@/utils/cn'

type ToastVariant = keyof typeof TOAST_VARIANT_CLASS

type ToastProps = {
  className?: string
  message?: string
  variant?: ToastVariant
}

function ErrorIcon() {
  return (
    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
        fill="currentColor"
      />
    </svg>
  )
}

function DoneIcon() {
  return (
    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8.9999 16.2L4.7999 12L3.3999 13.4L8.9999 19L20.9999 6.99998L19.5999 5.59998L8.9999 16.2Z" fill="currentColor" />
    </svg>
  )
}

export function Toast({ className, message, variant = 'error' }: ToastProps) {
  const isError = variant === 'error'
  const resolvedMessage = message ?? (isError ? '내용을 입력해주세요' : '저장되었습니다!')

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      className={cn(TOAST_BASE_CLASS, TOAST_VARIANT_CLASS[variant], className)}
    >
      {isError ? <ErrorIcon /> : <DoneIcon />}
      <p className="m-0">{resolvedMessage}</p>
    </div>
  )
}
