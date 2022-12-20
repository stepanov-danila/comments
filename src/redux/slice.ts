import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchData() {},
    fetchArticleInfo() {},
    loadMoreComments() {},
    deleteComment() {},
    changeUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    changeArticleInfo(state, action) {
      state.articleInfo = action.payload;
    },
    changeStatus(state, action) {
      state.status = action.payload;
    },
    changeSkip(state, action) {
      state.skip = action.payload;
    },
    changeCommentsAndReplies(state, action) {
      state.commentsAndReplies = action.payload;
    },
    changeAdditionalCommentsAndReplies(state, action) {
      state.additionalCommentsAndReplies = action.payload;
    },
    changeLoadMoreCommentsFetching(state, action) {
      state.loadMoreCommentsFetching = action.payload;
    },
    changeCommentsAndRepliesCount(state, action) {
      state.commentsAndRepliesCount = action.payload;
    },
    changeCommentsCount(state, action) {
      state.commentsCount = action.payload;
    },
    changeShowCommentsEditor(state, action) {
      state.showEditor = action.payload;
    },
    changeShowAllComments(state, action) {
      state.showAll = action.payload;
    },
    changeCommentById(state, action) {
      state.commentById = action.payload;
    },
    changeAddCommentRequestParams(state, action) {
      state.requestsParams.addComment = action.payload;
    },
    changeUpdateCommentRequestParams(state, action) {
      state.requestsParams.updateComment = action.payload;
    },
    changeDeleteCommentRequestParams(state, action) {
      state.requestsParams.deleteComment = action.payload;
    },
    changeAddLikeRequestParams(state, action) {
      state.requestsParams.addLike = action.payload;
    },
    changeRemoveLikeRequestParams(state, action) {
      state.requestsParams.removeLike = action.payload;
    },
    changeModalDeleteCommentShow(state, action) {
      state.modals.deleteComment.opened = action.payload;
    },
    changeModalDeleteCommentLoad(state, action) {
      state.modals.deleteComment.load = action.payload;
    },
    changeModalErrorShow(state, action) {
      state.modals.error.opened = action.payload;
    },
    addArticleLike() {},
    removeArticleLike() {},
  },
});

export const {
  fetchData,
  fetchArticleInfo,
  loadMoreComments,
  changeLoadMoreCommentsFetching,
  changeUserInfo,
  changeArticleInfo,
  deleteComment,
  changeStatus,
  changeSkip,
  changeCommentsAndReplies,
  changeAdditionalCommentsAndReplies,
  changeCommentsAndRepliesCount,
  changeCommentsCount,
  changeShowCommentsEditor,
  changeShowAllComments,
  changeCommentById,
  changeAddCommentRequestParams,
  changeUpdateCommentRequestParams,
  changeDeleteCommentRequestParams,
  changeAddLikeRequestParams,
  changeRemoveLikeRequestParams,
  changeModalDeleteCommentShow,
  changeModalDeleteCommentLoad,
  changeModalErrorShow,
  addArticleLike,
  removeArticleLike,
} = commentsSlice.actions;
export default commentsSlice.reducer;
