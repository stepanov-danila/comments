import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommentItemType, RequestParamsType } from "@myl-comments";
import { useDispatch, useSelector } from "react-redux";
import { selectArticleInfo } from "../../redux/selectors";
import {
  changeCommentById,
  changeModalDeleteCommentShow,
  changeModalErrorShow,
  changeDeleteCommentRequestParams,
} from "../../redux/slice";
import CommentEditor from "../CommentEditor/CommentEditor";
import CommentList from "../CommentList/CommentList";
import CommentUserWidget from "../CommentUserWidget/CommentUserWidget";
import {
  CornerDownRightIcon,
  CornerUpLeftIcon,
  DeleteIcon,
  EditIcon,
} from "../Svg/Icons";
import {
  CommentButtonAction,
  CommentButtonLink,
} from "../CommentButtons/CommentButtons";
import { Utils } from "../../utils";
import { api } from "../../api/api";
import LikesWidget from "../Likes/LikesWidget/LikesWidget";

const CommentItem = ({
  Author,
  AuthorLogin,
  showAllComments,
  CanDeleteItem,
  CanUpdateItem,
  CreatedDate,
  Id,
  ItemId,
  ListId,
  SiteId,
  WebId,
  Text,
  FullText,
  Likes,
  ReplyTo1 = Utils.EMPTY_ID,
  Replies = [],
  Replies1 = [],
  isTargetComment = false,
  isRoot = false,
  parent,
}: CommentItemType) => {
  const dispatch = useDispatch();

  const $commentRef = useRef<HTMLDivElement>();

  // const commentById = useSelector(selectCommentById);
  const articleInfo = useSelector(selectArticleInfo);
  const {
    author: { email: authorOfArticleEmail },
  } = articleInfo;

  const [repliesOpened, setRepliesOpened] = useState<boolean>(false);
  const [editorIsVissible, setEditorIsVissible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const formatedDate = Utils.formatCommentCreatedDateString(CreatedDate);
  const showEditor = isTargetComment && editorIsVissible;
  const userName =
    Author.FirstName && Author.LastName
      ? `${Author.LastName} ${Author.FirstName}`
      : Author.FullName;

  const commentParams = useMemo(() => {
    return {
      ListId,
      ItemId,
      SiteId,
      WebId,
    } as RequestParamsType;
  }, [ListId, ItemId, SiteId, WebId]);

  const isArticleAuthor = useMemo(() => {
    return authorOfArticleEmail === Author.Email;
  }, [Author, authorOfArticleEmail]);

  const repliesCount = useMemo(
    () => Utils.getCommentRepliesCount(Replies1),
    [Replies1]
  );

  const replysExists = repliesCount > 0;

  const activateEditor = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(changeCommentById(Id));
      setEditorIsVissible(true);
    },
    [Id, dispatch]
  );

  const handleReply = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    activateEditor(e);
  };

  const handleReplysToggle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setRepliesOpened((prevState) => !prevState);
  };

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    activateEditor(e);
    setIsEdit(true);
  };

  const addLike = useCallback(async () => {
    try {
      const params = {
        ...commentParams,
        dbItemId: Id,
        ArticleUrl: `${articleInfo.url}#comment-${Id}`,
        ArticleTitle: articleInfo.title,
        CommentAuthorEmail: Author.Email,
      };

      const responseData = await api.addLike(params);

      if (!responseData?.Success) {
        dispatch(changeModalErrorShow(true));
      }
    } catch (error) {
      console.error(error);
      dispatch(changeModalErrorShow(true));
    }
  }, [Author.Email, Id, commentParams, articleInfo, dispatch]);

  const removeLike = useCallback(async () => {
    try {
      const params = {
        dbItemId: Id,
      };

      const responseData = await api.deleteLike(params);

      if (!responseData?.data?.Success) {
        dispatch(changeModalErrorShow(true));
      }
    } catch (error) {
      console.error(error);
      dispatch(changeModalErrorShow(true));
    }
  }, [Id, dispatch]);

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(
        changeDeleteCommentRequestParams({
          Id,
          ArticleUrl: articleInfo.url,
          ArticleTitle: articleInfo.title,
          Limit: 5,
        })
      );
      dispatch(changeModalDeleteCommentShow(true));
    },
    [dispatch, Id, articleInfo.title, articleInfo.url]
  );

  useEffect(() => {
    if ($commentRef.current?.innerHTML !== undefined) {
      $commentRef.current.innerHTML = FullText;
    }
  }, [FullText, isEdit]);

  useEffect(() => {
    setRepliesOpened(showAllComments);
  }, [showAllComments]);

  return (
    <>
      {!isEdit && (
        <div id={`comment-${Id}`} className="myl-comment-item">
          <div className="myl-comment-item__user">
            {Author.CardURL ? (
              <a href={Author.CardURL}>
                <CommentUserWidget
                  pictureUrl={Author.PictureURL}
                  pictureAlt={userName}
                  presenceState={Author.PresenceState}
                />
              </a>
            ) : (
              <CommentUserWidget
                pictureUrl={Author.PictureURL}
                pictureAlt={userName}
                presenceState={Author.PresenceState}
              />
            )}
          </div>
          <div className="myl-comment-item__body">
            <div className="myl-comment-item__header">
              <h3 className="myl-comment-item__fullname">
                {Author.CardURL ? (
                  <a href={Author.CardURL}>{userName}</a>
                ) : (
                  userName
                )}
              </h3>
              {Author.Department && (
                <h4 className="myl-comment-item__department">
                  {Author.Department}
                </h4>
              )}
              {isArticleAuthor && (
                <div className="myl-comment-item__author">Автор</div>
              )}
            </div>
            <div className="myl-comment-item__text" ref={$commentRef} />
            <div className="myl-comment-item__footer">
              <div className="myl-comment-item__likes">
                <LikesWidget
                  likes={Likes}
                  onAddLike={addLike}
                  onRemoveLike={removeLike}
                />
              </div>
              <div className="myl-comment-item__date">{formatedDate}</div>
              <div className="myl-comment-item__reply">
                <CommentButtonLink onClick={handleReply}>
                  Ответить
                </CommentButtonLink>
              </div>
              {(CanUpdateItem || CanDeleteItem) && (
                <div className="myl-comment-item__actions">
                  {CanUpdateItem && (
                    <CommentButtonAction onClick={handleEdit}>
                      <EditIcon />
                    </CommentButtonAction>
                  )}
                  {CanDeleteItem && (
                    <CommentButtonAction onClick={handleRemove}>
                      <DeleteIcon />
                    </CommentButtonAction>
                  )}
                </div>
              )}
            </div>
            {replysExists && (
              <div
                className="myl-comment-item__replies-toggler"
                onClick={handleReplysToggle}
              >
                {repliesOpened ? (
                  <>
                    <CornerUpLeftIcon />
                    <span>свернуть ответы</span>
                  </>
                ) : (
                  <>
                    <CornerDownRightIcon />
                    <span>{`${repliesCount} ${Utils.getRepliesText(
                      repliesCount
                    )}`}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {showEditor && (
        <div className="myl-comment-editor-container">
          <div className="myl-comment-editor-container__inner">
            <CommentEditor
              {...commentParams}
              commentId={Id}
              cancelShow={() => {
                setEditorIsVissible(false);
                setIsEdit(false);
              }}
              initialValue={
                isEdit ? Utils.removeUserLinkFromCommentText(FullText) : ""
              }
              isEditMode={isEdit}
              isRoot={isRoot}
              parent={isEdit && !isRoot ? parent : Author}
            />
          </div>
        </div>
      )}
      {replysExists && repliesOpened && (
        <CommentList comments={Replies1} parent={Author} />
      )}
    </>
  );
};

export default memo(CommentItem);
