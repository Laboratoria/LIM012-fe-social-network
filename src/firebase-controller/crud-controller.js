import { deletingPost, deletingPostFromUser, updatePosts, updatePostsFromUser } from '../firebase/crud.js';

export const deletePost = (postId, userId) => {
  deletingPost(postId);
  deletingPostFromUser(userId, postId);
};
export const editPost = (userId, postId, newContent, newVisibility) => {
  updatePostsFromUser(userId, postId, newContent, newVisibility);
  return updatePosts(postId, newContent, newVisibility)
    .then(() => {
      window.history.back();
    })
    .catch(() => {
      window.history.back();
    });
};
