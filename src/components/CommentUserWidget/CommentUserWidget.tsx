import { CommentUserWidgetProps } from "@myl-comments";
import { Utils } from "../../utils";

const CommentUserWidget = ({
  pictureUrl,
  pictureAlt,
  presenceState,
}: CommentUserWidgetProps) => {
  return (
    <div className="myl-comment-user-widget">
      <div className="myl-comment-user-widget__avatar">
        <img src={pictureUrl} alt={pictureAlt} />
      </div>
      <div
        className="myl-comment-user-widget__presense"
        data-status={Utils.mapPresenseTypeToText(presenceState)}
      />
    </div>
  );
};

export default CommentUserWidget;
