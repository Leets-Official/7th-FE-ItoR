import { Avatar } from '../common/Avartar';

export interface PostCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  likes: number;
  comments: number;
}

export function PostCard({ author, comments, date, excerpt, image, title }: PostCardProps) {
  return (
    <article className="grid items-start gap-5 border-b border-slate-200/90 py-7 md:grid-cols-[minmax(0,1fr)_112px]">
      <div className="min-w-0">
        <h3 className="mb-2 text-[22px] font-semibold leading-tight text-[#222222]">{title}</h3>
        <p className="mb-4 line-clamp-2 text-[14px] leading-6 text-[#7a7a7a]">{excerpt}</p>

        <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#9b9b9b]">
          <Avatar name={author} size="sm" className="h-5 w-5 text-[10px]" />
          <span className="font-medium text-[#5f5f5f]">{author}</span>
          <span>·</span>
          <span>{date}</span>
          <span>·</span>
          <span>댓글 {comments}</span>
        </div>
      </div>

      <div className="h-24 w-28 overflow-hidden rounded-sm bg-slate-200">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,_#355b3d,_#8ca98e)]" />
        )}
      </div>
    </article>
  );
}

export default PostCard;
