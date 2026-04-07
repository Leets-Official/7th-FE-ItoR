import { Button, MiniButton } from '@/components/button'
import { DeleteConfirmModal } from '@/components/modal'
import { Toast } from '@/components/toast'
import './ButtonTestPage.css'

const START_BUTTON_VARIANTS = [
  'point',
  'grayOutline',
  'grayPlain',
  'active',
  'grayFilledOutline',
  'grayFilled',
] as const

const COMPACT_BUTTON_VARIANTS = ['plain', 'gray90'] as const

export default function ButtonTestPage() {
  return (
    <section className="button-test-page">
      <div className="button-test-page__content">
        <h1 className="button-test-page__title">Button Component Test</h1>
        <p className="button-test-page__description">
          Figma 스펙 기준 버튼 variant 미리보기입니다.
        </p>
        <div className="button-test-page__group">
          <h2 className="button-test-page__subtitle">Button</h2>
          <div className="button-test-page__preview" aria-label="버튼 컴포넌트 테스트 영역">
            {START_BUTTON_VARIANTS.map((variant) => (
              <Button key={variant} variant={variant} />
            ))}
          </div>
        </div>
        <div className="button-test-page__group">
          <h2 className="button-test-page__subtitle">Mini Button</h2>
          <div className="button-test-page__preview" aria-label="컴팩트 버튼 테스트 영역">
            {COMPACT_BUTTON_VARIANTS.map((variant) => (
              <MiniButton key={variant} variant={variant} />
            ))}
          </div>
        </div>
        <div className="button-test-page__group">
          <h2 className="button-test-page__subtitle">Modal</h2>
          <div className="button-test-page__modal-preview" aria-label="삭제 확인 모달 테스트 영역">
            <DeleteConfirmModal />
            <DeleteConfirmModal variant="titleOnly" />
          </div>
        </div>
        <div className="button-test-page__group">
          <h2 className="button-test-page__subtitle">Toast</h2>
          <div className="button-test-page__preview" aria-label="토스트 컴포넌트 테스트 영역">
            <Toast variant="error" />
            <Toast variant="success" />
          </div>
        </div>
      </div>
    </section>
  )
}
