import { useMemo, useState } from 'react';

import { PostList } from './components/blog/PostList';
import { DropdownMenu, Icon, Input, MenuItem, MenuShell } from './components/common';
import { Layout } from './components/layout/Layout';

const posts = [
  {
    title: '16 Title one line',
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and an...",
    author: '닉네임',
    date: 'Feb 17, 2025',
    category: 'Frontend',
    tags: ['design-system', 'react'],
    likes: 18,
    comments: 0,
  },
  {
    title: '16 Title one line',
    excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: '닉네임',
    date: 'Feb 17, 2025',
    category: 'UI',
    tags: ['layout', 'responsive'],
    likes: 27,
    comments: 0,
  },
  {
    title: '16 Title one line',
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type an...",
    author: '닉네임',
    date: 'Feb 17, 2025',
    category: 'Component',
    tags: ['button', 'feedback'],
    likes: 12,
    comments: 0,
  },
  {
    title: '16 Title one line',
    excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: '닉네임',
    date: 'Feb 17, 2025',
    category: 'Editor',
    tags: ['editor', 'ux'],
    likes: 21,
    comments: 0,
  },
];

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const keyword = search.trim().toLowerCase();
      if (!keyword) return true;

      return [post.title, post.excerpt, post.author, ...post.tags].join(' ').toLowerCase().includes(keyword);
    });
  }, [search]);

  return (
    <Layout>
      <div className="mx-auto max-w-[880px]">
        <section className="mb-10 rounded-[24px] border border-dashed border-violet-300 bg-[#ece6ff]/50 p-5">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-violet-600">menu</p>
              <MenuShell>
                <span className="text-sm text-[#2e2e2e]">☒</span>
              </MenuShell>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-violet-600">dropdown</p>
              <DropdownMenu>
                <MenuItem>menu 1</MenuItem>
              </DropdownMenu>
              <DropdownMenu>
                <MenuItem>menu 1</MenuItem>
                <MenuItem>menu 1</MenuItem>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-violet-600">dropdown menu group</p>
              <DropdownMenu className="min-w-[170px]">
                <MenuItem>menu 1</MenuItem>
                <MenuItem active>menu 1</MenuItem>
              </DropdownMenu>
            </div>
          </div>
        </section>

        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="w-full max-w-sm">
            <Input
              id="post-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="검색"
              leftAddon={<Icon name="search" size={16} />}
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 pt-2 text-[13px] font-medium text-[#8a8a8a] transition-colors hover:text-slate-900"
          >
            <Icon name="edit" size={14} />
            깃로그 쓰기
          </button>
        </div>

        <PostList posts={filteredPosts} currentPage={page} totalPages={5} onPageChange={setPage} />
      </div>
    </Layout>
  );
}

export default App;
