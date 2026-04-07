import { Icon } from '../common/Icon';

type HeaderAction =
  | { type: 'write'; label?: string }
  | { type: 'comment'; label?: string }
  | { type: 'more'; label?: string }
  | { type: 'delete'; label?: string }
  | { type: 'publish'; label?: string };

interface HeaderProps {
  actions?: HeaderAction[];
}

function HeaderActionButton({ action }: { action: HeaderAction }) {
  if (action.type === 'write') {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-2 text-[12px] font-medium text-[#8d8d8d] transition-colors hover:text-slate-900"
      >
        <Icon name="edit" size={14} />
        {action.label ?? '깃로그 쓰기'}
      </button>
    );
  }

  if (action.type === 'comment') {
    return (
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center text-[#444444] transition-colors hover:text-slate-900"
        aria-label={action.label ?? '댓글'}
      >
        <Icon name="message-square" size={16} />
      </button>
    );
  }

  if (action.type === 'more') {
    return (
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center text-[#444444] transition-colors hover:text-slate-900"
        aria-label={action.label ?? '더보기'}
      >
        <Icon name="more-vertical" size={16} />
      </button>
    );
  }

  if (action.type === 'delete') {
    return (
      <button
        type="button"
        className="text-[12px] font-medium text-[#ff5b5b] transition-colors hover:text-[#e04444]"
      >
        {action.label ?? '삭제하기'}
      </button>
    );
  }

  return (
    <button type="button" className="text-[12px] font-medium text-[#222222] transition-colors hover:text-black">
      {action.label ?? '게시하기'}
    </button>
  );
}

export function Header({ actions = [{ type: 'write' }] }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#ececec] bg-[#fbfbfa]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center text-[#333333] transition-colors hover:text-black"
            aria-label="메뉴"
          >
            <Icon name="menu" size={16} />
          </button>

          <div className="text-[22px] font-semibold italic tracking-tight text-black">GITLOG</div>
        </div>

        <div className="flex items-center gap-4">
          {actions.map((action, index) => (
            <HeaderActionButton key={`${action.type}-${index}`} action={action} />
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
