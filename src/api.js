const POSTS = [
  { id: 1, title: "Post 1", body: "post 1 body", userId: "abcdefg" },
  { id: 2, title: "Post 2" },
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
