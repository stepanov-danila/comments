import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../../AchievementsBoard/components/Preloader/Preloader";
import {
  selectAdditionalCommentsAndReplies,
  selectCommentsAndReplies,
  selectLoadMoreCommentsFetching,
  selectСommentsCount,
} from "../../redux/selectors";
import { loadMoreComments } from "../../redux/slice";
import CommentList from "../CommentList/CommentList";

const AdditionalComments = () => {
  const dispatch = useDispatch();

  const commentsCount = useSelector(selectСommentsCount);
  const additionalCommentsAndReplies = useSelector(
    selectAdditionalCommentsAndReplies
  );
  const commentsAndReplies = useSelector(selectCommentsAndReplies);
  const loadMoreCommentsFetching = useSelector(selectLoadMoreCommentsFetching);

  const [moreExists, setMoreExists] = useState(false);

  const $scrollContainer = document.querySelector(".view") || window;

  const handleLoadMore = useCallback(
    (event: Event) => {
      if ($scrollContainer instanceof Window) {
        const { scrollHeight, offsetHeight } =
          document.documentElement as HTMLElement;
        const { scrollY } = window as Window;

        if (
          offsetHeight + scrollY > Math.round(scrollHeight) - 10 &&
          moreExists &&
          !loadMoreCommentsFetching
        ) {
          dispatch(loadMoreComments());
          $scrollContainer.scrollTo(0, scrollY - 50);
        }
      } else if ($scrollContainer instanceof HTMLDivElement) {
        const { scrollHeight, offsetHeight, scrollTop } =
          event.target as HTMLDivElement;

        if (
          offsetHeight + scrollTop > Math.round(scrollHeight) - 10 &&
          moreExists &&
          !loadMoreCommentsFetching
        ) {
          dispatch(loadMoreComments());
          $scrollContainer.scrollTop = scrollTop - 50;
        }
      }
    },
    [$scrollContainer, dispatch, moreExists, loadMoreCommentsFetching]
  );

  useEffect(() => {
    $scrollContainer.addEventListener("scroll", handleLoadMore);

    return () => {
      $scrollContainer.removeEventListener("scroll", handleLoadMore);
    };
  }, [$scrollContainer, handleLoadMore]);

  useEffect(() => {
    setMoreExists(
      commentsAndReplies.length + additionalCommentsAndReplies.length <
        commentsCount
    );
  }, [additionalCommentsAndReplies, commentsAndReplies, commentsCount]);

  return (
    <>
      {additionalCommentsAndReplies.length > 0 && (
        <CommentList comments={additionalCommentsAndReplies} isRoot />
      )}
      {loadMoreCommentsFetching && <Preloader isFullScreen={false} />}
    </>
  );
};

export default memo(AdditionalComments);
