import {
  AddLikeRequestParamsType,
  CommentListType,
  AddCommentRequestParamsType,
  IdType,
  DeleteLikeRequestParamsType,
  UserInfoType,
  DeleteCommentRequestParamsType,
  UpdateCommentRequestParamsType,
  ModalStateType,
  ArticleInfoType,
} from "@myl-comments";
import { createSelector } from "reselect";
import { CommentsStatusEnum } from "../enums";

export const selectTest = createSelector<any, string>(
  ({ comments }) => comments,
  ({ test }) => test
);

export const selectUserInfo = createSelector<any, UserInfoType>(
  ({ comments }) => comments,
  ({ userInfo }) => userInfo
);

export const selectArticleInfo = createSelector<any, ArticleInfoType>(
  ({ comments }) => comments,
  ({ articleInfo }) => articleInfo
);

export const selectCommentsAndReplies = createSelector<any, CommentListType>(
  ({ comments }) => comments,
  ({ commentsAndReplies }) => commentsAndReplies
);

export const selectAdditionalCommentsAndReplies = createSelector<
  any,
  CommentListType
>(
  ({ comments }) => comments,
  ({ additionalCommentsAndReplies }) => additionalCommentsAndReplies
);

export const selectLoadMoreCommentsFetching = createSelector<any, boolean>(
  ({ comments }) => comments,
  ({ loadMoreCommentsFetching }) => loadMoreCommentsFetching
);

export const selectCommentsAndRepliesCount = createSelector<any, number>(
  ({ comments }) => comments,
  ({ commentsAndRepliesCount }) => commentsAndRepliesCount
);

export const selectСommentsCount = createSelector<any, number>(
  ({ comments }) => comments,
  ({ commentsCount }) => commentsCount
);

export const selectShowCommentsEditor = createSelector<any, boolean>(
  ({ comments }) => comments,
  ({ showEditor }) => showEditor
);

export const selectShowAllComments = createSelector<any, boolean>(
  ({ comments }) => comments,
  ({ showAll }) => showAll
);

export const selectSkip = createSelector<any, number>(
  ({ comments }) => comments,
  ({ skip }) => skip
);

export const selectStatus = createSelector<any, CommentsStatusEnum>(
  ({ comments }) => comments,
  ({ status }) => status
);

export const selectCommentById = createSelector<any, IdType>(
  ({ comments }) => comments,
  ({ commentById }) => commentById
);

export const selectAddCommentRequestParams = createSelector<
  any,
  AddCommentRequestParamsType
>(
  ({ comments }) => comments,
  ({ requestsParams }) => requestsParams.addComment
);

export const selectDeleteCommentRequestParams = createSelector<
  any,
  DeleteCommentRequestParamsType
>(
  ({ comments }) => comments,
  ({ requestsParams }) => requestsParams.deleteComment
);

export const selectUpdateCommentRequestParams = createSelector<
  any,
  UpdateCommentRequestParamsType
>(
  ({ comments }) => comments,
  ({ requestsParams }) => requestsParams.updateComment
);

export const selectAddLikeRequestParams = createSelector<
  any,
  AddLikeRequestParamsType
>(
  ({ comments }) => comments,
  ({ requestsParams }) => requestsParams.addLike
);

export const selectRemoveLikeRequestParams = createSelector<
  any,
  DeleteLikeRequestParamsType
>(
  ({ comments }) => comments,
  ({ requestsParams }) => requestsParams.removeLike
);

export const selectModalDeleteComment = createSelector<any, ModalStateType>(
  ({ comments }) => comments,
  ({ modals }) => modals.deleteComment
);

export const selectModalError = createSelector<any, ModalStateType>(
  ({ comments }) => comments,
  ({ modals }) => modals.error
);
