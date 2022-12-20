import { CommentStoreType } from "@myl-comments";
import { CommentsStatusEnum } from "../enums";
import { Utils } from "../utils";

export const initialState: CommentStoreType = {
  userInfo: {
    login: "",
    fullName: "",
    pictureURL: "",
    email: "",
    presenceState: "",
    PageItemId: Utils.EMPTY_ID,
    UserId: Utils.EMPTY_ID,
    ...Utils.INIT_REQUEST_PARAMS_DATA,
  },
  articleInfo: {
    url: window.location.href,
    title: "",
    author: {
      id: Utils.EMPTY_ID,
      email: "",
    },
    counters: {
      comments: 0,
      views: 0,
      likes: 0,
    },
    likes: [],
  },
  status: CommentsStatusEnum.Fetching,
  commentsAndReplies: [],
  additionalCommentsAndReplies: [],
  commentsAndRepliesCount: 0,
  loadMoreCommentsFetching: false,
  commentsCount: 0,
  showEditor: true,
  showAll: true,
  skip: 0,
  commentById: Utils.EMPTY_ID,
  requestsParams: {
    addComment: {
      ...Utils.INIT_REQUEST_PARAMS_DATA,
      Text: "",
      FullText: "",
      Limit: 5,
      ReplyTo1: Utils.EMPTY_ID,
      ArticleUrl: "",
      ArticleTitle: "",
      ArticleAuthorEmail: "",
    },
    updateComment: {
      Id: Utils.EMPTY_ID,
      Text: "",
      FullText: "",
      ArticleUrl: "",
      ArticleTitle: "",
      ArticleAuthorEmail: "",
      Limit: 5,
    },
    deleteComment: {
      Id: Utils.EMPTY_ID,
      ArticleUrl: "",
      ArticleTitle: "",
      Limit: 5,
    },
    addLike: {
      ...Utils.INIT_REQUEST_PARAMS_DATA,
      dbItemId: Utils.EMPTY_ID,
      ArticleUrl: "",
      ArticleTitle: "",
      CommentAuthorEmail: "",
    },
    removeLike: {
      ...Utils.INIT_REQUEST_PARAMS_DATA,
    },
  },
  modals: {
    deleteComment: {
      opened: false,
      load: false,
    },
    error: {
      opened: false,
    },
  },
};
