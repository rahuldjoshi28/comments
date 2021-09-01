import { ActionTypes } from "./actions";

export function reducer(comments, action) {
  switch (action.type) {
    case ActionTypes.ADD:
      return [action.newComment, ...comments];
    case ActionTypes.LIKE:
      return like(comments, action.trail, action.userName);
    case ActionTypes.DELETE:
      return delComment(comments, action.trail);
    case ActionTypes.REPLY:
      return reply(comments, action.newComment, action.trail);
    default:
      return comments;
  }
}

function reply(comments, post, trail) {
  let newComments = [...comments];
  let itr = newComments;
  trail.forEach((trailId, index) => {
    const target = itr.find(({ id }) => id === trailId);
    if (index === trail.length - 1) {
      target.replies = [...target.replies, post];
      return;
    }
    itr = target.replies;
  });
  return newComments;
}

function delComment(comments, trail) {
  if (trail.length === 1) {
    return comments.filter(({ id }) => id !== trail[0]);
  }

  let newState = [...comments];
  let itr = newState;

  for (let i = 0; i < trail.length - 1; i++) {
    newState = newState.find(({ id }) => id === trail[i]);
    if (i !== trail.length - 2) {
      newState = newState.replies;
    }
  }

  newState.replies = newState.replies.filter(
    (cmt) => cmt.id !== trail[trail.length - 1]
  );
  return itr;
}

function like(comments, trail, currentUser) {
  return comments.map((comment) => {
    if (comment.id !== trail[0]) return comment;

    if (trail.length === 1) {
      if (comment.likes[currentUser]) {
        const { [currentUser]: omit, ...rest } = comment.likes;
        return {
          ...comment,
          likes: rest,
        };
      } else {
        return {
          ...comment,
          likes: {
            ...comment.likes,
            [currentUser]: true,
          },
        };
      }
    }

    return {
      ...comment,
      replies: like(comment.replies, trail.slice(1), currentUser),
    };
  });
}
