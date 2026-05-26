import { useUserStore, type User } from "@/store/useUserStore";
import type { ApiPost, Comment, Post, PostContent } from "@/types/post";

type StoredComment = Comment & {
  authorEmail: string;
};

type StoredPost = Omit<Post, "comments" | "content"> & {
  authorEmail: string;
  comments: StoredComment[];
};

const MOCK_POSTS_KEY = "mock-posts";
const MOCK_DELAY_MS = 200;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const currentIso = () => new Date().toISOString();

const getCurrentUser = () => useUserStore.getState().user;

const ensureUser = () => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }
  return user;
};

const toPreviewContents = (contents: PostContent[] | undefined) => contents?.slice(0, 2) ?? [];

const seedPosts = (): StoredPost[] => [
  {
    postId: "1",
    authorEmail: "tester@leets.land",
    title: "첫 번째 목업 게시글",
    nickName: "tester",
    profileUrl: "",
    createdAt: currentIso(),
    commentCount: 2,
    contents: [
      {
        contentOrder: 1,
        content: "백엔드 없이도 화면 흐름을 확인할 수 있도록 넣어둔 예시 글입니다.",
        contentType: "TEXT",
      },
    ],
    comments: [
      {
        commentId: 1,
        content: "이 댓글도 mock 데이터예요.",
        nickName: "tester",
        profileUrl: "",
        createdAt: currentIso(),
        isOwner: true,
        authorEmail: "tester@leets.land",
      },
      {
        commentId: 2,
        content: "작성, 수정, 삭제 흐름 확인용으로 하나 더 넣어뒀어요.",
        nickName: "guest",
        profileUrl: "",
        createdAt: currentIso(),
        isOwner: false,
        authorEmail: "guest@local.dev",
      },
    ],
    isOwner: true,
    introduction: "Mock account",
  },
  {
    postId: "2",
    authorEmail: "guest@local.dev",
    title: "이미지 포함 게시글",
    nickName: "guest",
    profileUrl: "",
    createdAt: currentIso(),
    commentCount: 0,
    contents: [
      {
        contentOrder: 1,
        content: "이미지 업로드도 프론트에서 확인할 수 있도록 구성했습니다.",
        contentType: "TEXT",
      },
      {
        contentOrder: 2,
        content:
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect width='100%25' height='100%25' fill='%23e5eef9'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23456' font-size='28'>Mock Image</text></svg>",
        contentType: "IMAGE",
      },
    ],
    comments: [],
    isOwner: false,
    introduction: "",
  },
];

const readPosts = (): StoredPost[] => {
  const raw = localStorage.getItem(MOCK_POSTS_KEY);
  if (!raw) {
    const initial = seedPosts();
    localStorage.setItem(MOCK_POSTS_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as StoredPost[];
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Reset invalid local mock data.
  }

  const initial = seedPosts();
  localStorage.setItem(MOCK_POSTS_KEY, JSON.stringify(initial));
  return initial;
};

const writePosts = (posts: StoredPost[]) => {
  localStorage.setItem(MOCK_POSTS_KEY, JSON.stringify(posts));
};

const toApiPost = (post: StoredPost): ApiPost => ({
  postId: post.postId,
  title: post.title,
  nickName: post.nickName,
  profileUrl: post.profileUrl,
  createdAt: post.createdAt,
  commentCount: post.comments.length,
  contents: toPreviewContents(post.contents),
});

const toPostDetail = (post: StoredPost, viewer: User | null): Post => ({
  postId: post.postId,
  title: post.title,
  nickName: post.nickName,
  profileUrl: post.profileUrl,
  createdAt: post.createdAt,
  commentCount: post.comments.length,
  contents: post.contents ?? [],
  comments: post.comments.map((comment) => ({
    commentId: comment.commentId,
    content: comment.content,
    nickName: comment.nickName,
    profileUrl: comment.profileUrl,
    createdAt: comment.createdAt,
    isOwner: viewer?.email === comment.authorEmail,
  })),
  isOwner: viewer?.email === post.authorEmail,
  introduction: post.introduction ?? "",
});

const findPostOrThrow = (postId: string) => {
  const post = readPosts().find((candidate) => candidate.postId === postId);
  if (!post) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }
  return post;
};

export const mockFetchPosts = async (page: number, size: number) => {
  await wait(MOCK_DELAY_MS);

  const posts = readPosts().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const start = (page - 1) * size;
  const pagedPosts = posts.slice(start, start + size);

  return {
    code: 200,
    message: "Mock posts fetched",
    data: {
      posts: pagedPosts.map((post) => toApiPost(post)),
      pageMax: Math.max(1, Math.ceil(posts.length / size)),
    },
  };
};

export const mockFetchPostDetail = async (postId: string) => {
  await wait(MOCK_DELAY_MS);

  const viewer = getCurrentUser();
  const post = findPostOrThrow(postId);

  return {
    code: 200,
    message: "Mock post fetched",
    data: toPostDetail(post, viewer),
  };
};

export const mockCreatePost = async (payload: Pick<Post, "title" | "contents">) => {
  await wait(MOCK_DELAY_MS);

  const user = ensureUser();
  const posts = readPosts();
  const newPost: StoredPost = {
    postId: String(posts.length > 0 ? Math.max(...posts.map((post) => Number(post.postId))) + 1 : 1),
    authorEmail: user.email,
    title: payload.title,
    nickName: user.nickname,
    profileUrl: user.profilePicture,
    createdAt: currentIso(),
    commentCount: 0,
    contents: payload.contents ?? [],
    comments: [],
    isOwner: true,
    introduction: user.introduction,
  };

  writePosts([newPost, ...posts]);

  return {
    code: 201,
    message: "Mock post created",
    data: { postId: newPost.postId },
  };
};

export const mockUpdatePost = async (postId: string, payload: Pick<Post, "title" | "contents">) => {
  await wait(MOCK_DELAY_MS);

  const user = ensureUser();
  const posts = readPosts();
  const nextPosts = posts.map((post) => {
    if (post.postId !== postId) return post;
    if (post.authorEmail !== user.email) {
      throw new Error("본인 게시글만 수정할 수 있습니다.");
    }
    return {
      ...post,
      title: payload.title,
      contents: payload.contents ?? [],
    };
  });

  writePosts(nextPosts);

  return {
    code: 200,
    message: "Mock post updated",
    data: { postId },
  };
};

export const mockDeletePost = async (postId: string) => {
  await wait(MOCK_DELAY_MS);

  const user = ensureUser();
  const posts = readPosts();
  const target = posts.find((post) => post.postId === postId);
  if (!target) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }
  if (target.authorEmail !== user.email) {
    throw new Error("본인 게시글만 삭제할 수 있습니다.");
  }

  writePosts(posts.filter((post) => post.postId !== postId));

  return {
    code: 200,
    message: "Mock post deleted",
    data: null,
  };
};

export const mockCreateComment = async (postId: string, content: string) => {
  await wait(MOCK_DELAY_MS);

  const user = ensureUser();
  const posts = readPosts();
  const nextPosts = posts.map((post) => {
    if (post.postId !== postId) return post;

    const nextCommentId =
      posts.flatMap((candidate) => candidate.comments).reduce((max, comment) => Math.max(max, comment.commentId), 0) +
      1;

    return {
      ...post,
      comments: [
        ...post.comments,
        {
          commentId: nextCommentId,
          content,
          nickName: user.nickname,
          profileUrl: user.profilePicture,
          createdAt: currentIso(),
          isOwner: true,
          authorEmail: user.email,
        },
      ],
    };
  });

  writePosts(nextPosts);

  return {
    code: 201,
    message: "Mock comment created",
    data: null,
  };
};

export const mockUpdateComment = async (commentId: number, content: string) => {
  await wait(MOCK_DELAY_MS);

  const user = ensureUser();
  const posts = readPosts();
  let updated = false;

  const nextPosts = posts.map((post) => ({
    ...post,
    comments: post.comments.map((comment) => {
      if (comment.commentId !== commentId) return comment;
      if (comment.authorEmail !== user.email) {
        throw new Error("본인 댓글만 수정할 수 있습니다.");
      }
      updated = true;
      return { ...comment, content };
    }),
  }));

  if (!updated) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }

  writePosts(nextPosts);

  return {
    code: 200,
    message: "Mock comment updated",
    data: null,
  };
};

export const mockDeleteComment = async (commentId: number) => {
  await wait(MOCK_DELAY_MS);

  const user = ensureUser();
  const posts = readPosts();
  let removed = false;

  const nextPosts = posts.map((post) => ({
    ...post,
    comments: post.comments.filter((comment) => {
      if (comment.commentId !== commentId) return true;
      if (comment.authorEmail !== user.email) {
        throw new Error("본인 댓글만 삭제할 수 있습니다.");
      }
      removed = true;
      return false;
    }),
  }));

  if (!removed) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }

  writePosts(nextPosts);

  return {
    code: 200,
    message: "Mock comment deleted",
    data: null,
  };
};

export const mockFetchMyInfo = async () => {
  await wait(MOCK_DELAY_MS);

  const user = ensureUser();

  return {
    code: 200,
    message: "Mock user fetched",
    data: user,
    loginType: user.loginType,
  };
};

export const mockUpdateUserInfo = async (payload: Partial<User>) => {
  await wait(MOCK_DELAY_MS);

  const user = ensureUser();
  const updatedUser: User = {
    ...user,
    email: payload.email ?? user.email,
    nickname: payload.nickname ?? user.nickname,
    profilePicture: payload.profilePicture ?? user.profilePicture,
    birthDate: payload.birthDate ?? user.birthDate,
    name: payload.name ?? user.name,
    introduction: payload.introduction ?? user.introduction,
    loginType: user.loginType,
  };

  useUserStore.getState().setUser(updatedUser);

  const posts = readPosts();
  const nextPosts = posts.map((post) => {
    if (post.authorEmail !== user.email) return post;
    return {
      ...post,
      nickName: updatedUser.nickname,
      profileUrl: updatedUser.profilePicture,
      introduction: updatedUser.introduction,
      comments: post.comments.map((comment) =>
        comment.authorEmail === user.email
          ? {
              ...comment,
              nickName: updatedUser.nickname,
              profileUrl: updatedUser.profilePicture,
            }
          : comment,
      ),
    };
  });

  writePosts(nextPosts);

  return {
    code: 200,
    message: "Mock user updated",
    data: updatedUser,
    loginType: updatedUser.loginType,
  };
};
