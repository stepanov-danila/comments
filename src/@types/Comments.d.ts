declare module "@myl-comments" {
  import { CommentsStatusEnum, AuthorPresenceStateEnum } from "../redux/enums";

  export type ResponseType = {
    Message: string;
    Success: boolean;
  };

  export type RequestParamsType = {
    ListId: GuidType;
    ItemId: GuidType;
    SiteId: GuidType;
    WebId: GuidType;
  };

  export type GetCommentsRequestType = {
    ItemId: GuidType;
    Limit: number;
    skip?: number;
  };

  export type GetAuthorOfArticleRequestType = {
    PageItemId: GuidType;
    ListId: GuidType;
  };

  export type GetPopularityDataType = {
    ItemId: GuidType;
  };

  export type IncreaseViewByCurrentUserType = RequestParamsType;

  export type AddCommentRequestParamsType = RequestParamsType & {
    Text: string;
    FullText: string;
    Limit: number;
    ReplyTo1?: IdType;
    ArticleUrl: string;
    ArticleTitle: string;
    ArticleAuthorEmail: string;
  };

  export type UpdateCommentRequestParamsType = {
    Id: number;
    Text: string;
    FullText: string;
    ArticleUrl: string;
    ArticleTitle: string;
    ArticleAuthorEmail: string;
    Limit: number;
  };

  export type DeleteCommentRequestParamsType = {
    Id: number;
    ArticleUrl: string;
    ArticleTitle: string;
    Limit: number;
  };

  export type AddLikeRequestParamsType = RequestParamsType & {
    dbItemId: number;
    ArticleUrl: string;
    ArticleTitle: string;
    CommentAuthorEmail: string;
  };

  export type DeleteLikeRequestParamsType = {
    dbItemId: number;
  };

  export type AddArticleLikeRequestParamsType = RequestParamsType;
  export type RemoveArticleLikeRequestParamsType = RequestParamsType;

  export type IdType = number;
  export type GuidType = string;
  export type DateStringType = string;
  export type LoginType = string;

  export type CommentListType = CommentItemType[] | [];

  export type UserInfoType = {
    login: string;
    fullName: string;
    email: string;
    pictureURL: string;
    presenceState: AuthorPresenceStateEnum;
    PageItemId: number;
    UserId: number;
  } & RequestParamsType;

  export type ArticleInfoType = {
    url: string;
    title: string;
    author: {
      id: IdType;
      email: string;
    };
    counters: {
      comments: number;
      views: number;
      likes: number;
    };
    likes: ICommentAuthor[] | [];
  };

  export type ModalStateType = {
    opened: boolean;
    load?: boolean;
  };

  export type CommentStoreType = {
    userInfo: UserInfoType;
    articleInfo: ArticleInfoType;
    status: CommentsStatusEnum;
    commentsAndReplies: CommentListType;
    additionalCommentsAndReplies: CommentListType;
    loadMoreCommentsFetching: boolean;
    commentsAndRepliesCount: number;
    commentsCount: number;
    commentById: IdType;
    showEditor: boolean;
    showAll: boolean;
    skip: number;
    requestsParams: {
      addComment: AddCommentRequestParamsType;
      updateComment: UpdateCommentRequestParamsType;
      deleteComment: DeleteCommentRequestParamsType;
      addLike: AddLikeRequestParamsType;
      removeLike: RemoveLikeRequestParamsType;
    };
    modals: {
      deleteComment: ModalStateType;
      error: ModalStateType;
    };
  };

  export type CommentEditorType = RequestParamsType & {
    commentId?: IdType;
    initialValue?: string;
    cancelShow?: () => void;
    isEditMode?: boolean;
    isRoot?: boolean;
    parent?: ICommentAuthor;
    disableCancelButtonOnInit?: boolean;
  };

  export type CommentItemType = RequestParamsType & {
    Author: ICommentAuthor;
    AuthorLogin: LoginType;
    CanDeleteItem: boolean;
    CanUpdateItem: boolean;
    showAllComments?: boolean;
    CreatedDate: DateStringType;
    Id: IdType;
    Text: string;
    FullText: string;
    Likes: ICommentAuthor[] | [];
    ReplyTo1?: IdType;
    Replies?: CommentItemType[];
    Replies1?: CommentItemType[];
    isTargetComment?: boolean;
    isRoot?: boolean;
    parent?: ICommentAuthor;
  };

  export interface ICommentAuthor {
    CardURL: string;
    Email: string;
    FirstName?: string;
    FullName: string;
    LastName?: string;
    Login: string;
    PictureURL: string;
    PresenceState: AuthorPresenceStateEnum;
    // PresenceStateCssClass: string;
    // PresenceStatus: boolean;
    // PresenceTime: string;
    // SAPId: string;
    // SurName: string;
    // WorkComingTime: string;
    // AboutMe: string;
    // BirthDay: string;
    Department?: string;
    // IsInArticles: boolean;
    // IsRewarded: boolean;
    // JobTitle: string;
    // MobilePhone: string;
    // Office: string;
    // Rewards: string;
    // Skype: string;
    // WorkBeginDate: string;
    // WorkPhone: string;
  }

  export type CommentUserWidgetProps = {
    pictureUrl: string;
    pictureAlt: string;
    presenceState: AuthorPresenceStateEnum;
  };

  export type CommentButtonProps = {
    children: any;
    onClick: React.MouseEventHandler;
    disabled?: boolean;
  };

  export type CommentListProps = {
    comments: CommentListType;
    isRoot?: boolean;
    parent?: ICommentAuthor;
  };
}
