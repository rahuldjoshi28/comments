export const ActionTypes = {
  ADD: "addComment",
  LIKE: "likeComment",
  DELETE: "deleteComment",
  REPLY: "replyComment",
};

export const Actions = {
  addComment(newComment) {
    return {
      type: ActionTypes.ADD,
      newComment,
    };
  },
  replyComment(newComment, trail) {
    return {
      type: ActionTypes.REPLY,
      newComment,
      trail,
    };
  },
  deleteComment(trail) {
    return {
      type: ActionTypes.DELETE,
      trail,
    };
  },
  likeComment(trail, userName) {
    return {
      type: ActionTypes.LIKE,
      trail,
      userName,
    };
  },
};
