import * as S from "./MyPage.styled";

export default function MyPageSkeleton() {
  return (
    <>
      <section className={S.profileSection}>
        <div className={S.profileSectionInner}>
          <div className={S.profileInner}>
            <div className="h-[96px] w-[96px] animate-pulse rounded-full bg-gray-200" />
            <div className="mt-4 h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 h-8 w-36 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </section>

      <main className={S.mainWrapper}>
        <ul className={S.listWrapper}>
          {[1, 2, 3].map((i) => (
            <li key={i} className="border-b border-gray-100 p-4">
              <div className="mb-2 h-5 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
