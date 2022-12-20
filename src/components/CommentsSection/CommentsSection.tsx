import {
  createRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../../AchievementsBoard/components/Preloader/Preloader";
import { CommentsStatusEnum } from "../../enums";
import {
  selectCommentsAndReplies,
  selectCommentsAndRepliesCount,
  selectShowAllComments,
  selectShowCommentsEditor,
  selectStatus,
  selectUserInfo,
} from "../../redux/selectors";
import { changeShowAllComments, fetchData } from "../../redux/slice";
import { Utils } from "../../utils";
import AdditionalComments from "../AdditionalComments/AdditionalComments";
import { CommentButtonLink } from "../CommentButtons/CommentButtons";
import CommentEditor from "../CommentEditor/CommentEditor";
import CommentList from "../CommentList/CommentList";
import { ChevronSvgIcon } from "../Svg/Icons";

const CommentsSection = () => {
  const $section = createRef<HTMLDivElement>();

  const dispatch = useDispatch();

  const { ListId, ItemId, WebId, SiteId } = useSelector(selectUserInfo);
  const commentsAndReplies = useSelector(selectCommentsAndReplies);
  const commentsAndRepliesCount = useSelector(selectCommentsAndRepliesCount);
  const showEditor = useSelector(selectShowCommentsEditor);
  const showAllComments = useSelector(selectShowAllComments);
  const status = useSelector(selectStatus);

  const [expanded, setExpanded] = useState<boolean>(true);

  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const shouldScroll = useMemo(
    () =>
      searchParams.get("scrollToComments") === Utils.SCROLL_TO_COMMENTS_VALUE,
    [searchParams]
  );

  const handleToggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setExpanded((expanded) => !expanded);
  };

  const handleShowAll = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(changeShowAllComments(!showAllComments));
  };

  const scrollIntoView = useCallback(() => {
    $section.current.scrollIntoView();
  }, [$section]);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    if (
      shouldScroll &&
      $section.current &&
      status === CommentsStatusEnum.Fetching
    ) {
      scrollIntoView();
    }
  }, [$section, scrollIntoView, shouldScroll, status]);

  if (status === CommentsStatusEnum.Error) {
    return <h2>Упс! Что-то пошло не так...</h2>;
  }

  if (status === CommentsStatusEnum.Fetching) {
    return (
      <div ref={$section}>
        <Preloader isFullScreen={false} />
      </div>
    );
  }

  return (
    <section className="myl-comments-section">
      <div className="myl-comments-section__head">
        <div
          className="myl-comments-section__toggler"
          onClick={handleToggle}
          data-expanded={expanded}
        >
          <ChevronSvgIcon />
        </div>
        <h3 className="myl-comments-section__count">
          Комментарии: {commentsAndRepliesCount}
        </h3>
        <div className="myl-comments-section__expand">
          <CommentButtonLink onClick={handleShowAll}>
            {showAllComments
              ? "Свернуть все комментарии"
              : "Показать все комментарии"}
          </CommentButtonLink>
        </div>
      </div>
      {showEditor && (
        <div className="myl-comments-section__editor">
          <CommentEditor
            ListId={ListId}
            ItemId={ItemId}
            WebId={WebId}
            SiteId={SiteId}
            disableCancelButtonOnInit
          />
        </div>
      )}
      {expanded && (
        <div className="myl-comments-section__body">
          {commentsAndReplies.length > 0 ? (
            <>
              <CommentList comments={commentsAndReplies} isRoot />
              <AdditionalComments />
            </>
          ) : (
            <p style={{ padding: "20px 0" }}>Пока еще нет комментариев</p>
          )}
        </div>
      )}
    </section>
  );
};

export default memo(CommentsSection);
