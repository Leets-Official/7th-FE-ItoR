import { StartGitLogButton } from '@/components/button/StartGitLogButton'
import './ButtonTestPage.css'

export default function ButtonTestPage() {
  return (
    <section className="button-test-page">
      <div className="button-test-page__content">
        <h1 className="button-test-page__title">Button Component Test</h1>
        <p className="button-test-page__description">
          Figma 스펙 기준 버튼 variant 미리보기입니다.
        </p>
        <div className="button-test-page__group">
          <h2 className="button-test-page__subtitle">Start Git Log Button</h2>
          <div className="button-test-page__preview" aria-label="버튼 컴포넌트 테스트 영역">
            <StartGitLogButton variant="point" />
            <StartGitLogButton variant="grayOutline" />
            <StartGitLogButton variant="grayPlain" />
            <StartGitLogButton variant="active" />
            <StartGitLogButton variant="grayFilledOutline" />
            <StartGitLogButton variant="grayFilled" />
          </div>
        </div>
      </div>
    </section>
  )
}
