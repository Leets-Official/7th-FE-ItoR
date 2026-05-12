import * as S from "./PostDetail.styled";

export default function PostDetailSkeleton() {
  return (
    <main className={S.container}>
      <section className={S.group}>
        <div className="h-8 w-2/3 animate-pulse rounded-md bg-gray-200" />
        <div className="mt-3 flex items-center gap-2">
          <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      </section>

      <div className={S.divider} />

      <section className={S.group}>
        <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-6 w-full animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
      </section>

      <div className={S.divider} />

      <section className={S.group}>
        <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
      </section>
    </main>
  );
}
