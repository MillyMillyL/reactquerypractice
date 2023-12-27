const POSTS = [
  { id: 1, title: "Post 1", body: "post 1 body", userId: "abcdefg" },
  { id: 2, title: "Post 2", body: "post 2 body", userId: "abcdefg" },
  { id: 3, title: "Post 3", body: "post 3 body", userId: "abcdefg" },
  { id: 4, title: "Post 4", body: "post 4 body", userId: "abcdefg" },
  { id: 5, title: "Post 5", body: "post 5 body", userId: "abcdefg" },
  { id: 6, title: "Post 6", body: "post 6 body", userId: "abcdefg" },
  { id: 7, title: "Post 7", body: "post 7 body", userId: "abcdefg" },
  { id: 8, title: "Post 8", body: "post 8 body", userId: "abcdefg" },
  { id: 9, title: "Post 9", body: "post 9 body", userId: "abcdefg" },
  { id: 10, title: "Post 10", body: "post 10 body", userId: "abcdefg" },
  { id: 11, title: "Post 11", body: "post 11 body", userId: "abcdefg" },
  { id: 12, title: "Post 12", body: "post 12 body", userId: "abcdefg" },
  { id: 13, title: "Post 13", body: "post 13 body", userId: "abcdefg" },
  { id: 14, title: "Post 14", body: "post 14 body", userId: "abcdefg" },
  { id: 15, title: "Post 15", body: "post 15 body", userId: "abcdefg" },
  { id: 16, title: "Post 16", body: "post 16 body", userId: "abcdefg" },
];

const USERS = [{ userId: "abcdefg", name: "AAAAA" }];

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export async function getPosts() {
  const posts = await wait(1000).then(() => [...POSTS]);
  return posts;
}

export async function addPost({ title, body }) {
  const newPost = { id: crypto.randomUUID(), title, body, userId: "abcdefg" };

  wait(1000).then(() => POSTS.push(newPost));

  return newPost;
}

export async function getPost(id) {
  const posts = await getPosts();
  const post = posts.find((post) => post.id === id);
  return post;
}

export async function getUser(userId) {
  const users = await wait(1000).then(() => [...USERS]);
  const postUser = users.find((user) => user.userId === userId);
  return postUser;
}

export async function getPostsPaginated(page) {
  const posts = await getPosts();
  const sortedPosts = posts.sort((a, b) => b.title - a.title);
  const hasNext = page * 2 < sortedPosts.length;
  const paginatedPosts = {
    posts: [sortedPosts[2 * page - 2], sortedPosts[2 * page - 1]],
    nextPage: hasNext ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
  };
  return paginatedPosts;
}
