import { memo } from "react";
import { CommentItemType, CommentListProps } from "@myl-comments";
import CommentItem from "../CommentItem/CommentItem";
import {
  selectCommentById,
  selectShowAllComments,
} from "../../redux/selectors";
import { useSelector } from "react-redux";

const CommentList = ({
  comments,
  isRoot = false,
  parent,
}: CommentListProps) => {
  const commentById = useSelector(selectCommentById);
  const showAllComments = useSelector(selectShowAllComments);

  return (
    <ul className="myl-comment-list" data-root={isRoot ? true : null}>
      {comments?.length > 0 &&
        comments.map((item: CommentItemType) => (
          <li key={item.Id} className="myl-comment-list__item">
            <CommentItem
              {...item}
              isTargetComment={commentById === item.Id}
              showAllComments={showAllComments}
              isRoot={isRoot}
              parent={parent}
            />
          </li>
        ))}
    </ul>
  );
};

export default memo(CommentList);
