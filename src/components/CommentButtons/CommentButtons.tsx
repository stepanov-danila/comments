import { CommentButtonProps } from "@myl-comments";

export const CommentButtonSubmit = ({
  children,
  onClick,
  disabled = false,
}: CommentButtonProps) => {
  return (
    <div
      className="myl-comment-button-submit"
      onClick={onClick}
      data-disabled={disabled || null}
    >
      {children}
    </div>
  );
};

export const CommentButtonLink = ({
  children,
  onClick,
  disabled = false,
}: CommentButtonProps) => {
  return (
    <div
      className="myl-comment-button-link"
      onClick={onClick}
      data-disabled={disabled || null}
    >
      {children}
    </div>
  );
};

export const CommentButtonAction = ({
  children,
  onClick,
  disabled = false,
}: CommentButtonProps) => {
  return (
    <div
      className="myl-comment-button-action"
      onClick={onClick}
      data-disabled={disabled || null}
    >
      {children}
    </div>
  );
};
