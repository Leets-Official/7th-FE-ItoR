import * as S from "./MyPageSetting.styled";

export default function MyPageSettingSkeleton() {
  return (
    <>
      <section className={S.profileSection}>
        <div className={S.profileSectionInner}>
          <div className={S.avatarWrapper}>
            <div className="h-[96px] w-[96px] animate-pulse rounded-full bg-gray-200" />
          </div>

          <main className={S.profileHeader}>
            <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
          </main>
        </div>
      </section>

      <main className={S.formWrapper}>
        <div className="mb-4 h-10 w-full animate-pulse rounded bg-gray-200" />
        <div className="mb-4 h-10 w-full animate-pulse rounded bg-gray-200" />
        <div className="mb-4 h-10 w-full animate-pulse rounded bg-gray-200" />
      </main>
    </>
  );
}
