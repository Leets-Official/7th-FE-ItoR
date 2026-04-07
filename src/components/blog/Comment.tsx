import { Avatar } from '../common/Avartar';

interface CommentProps {
  author: string;
  date: string;
  content: string;
}

export function Comment({ author, content, date }: CommentProps) {
  return (
    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
      <Avatar name={author} size="sm" />
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">{author}</span>
          <span className="text-xs text-slate-400">{date}</span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{content}</p>
      </div>
    </div>
  );
}

export default Comment;
