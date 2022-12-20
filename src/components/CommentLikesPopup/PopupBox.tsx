type PopupBoxProps = {
  children: JSX.Element;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
};

const PopupBox = ({ children }: PopupBoxProps) => {
  return (
    <div
      className="popup-box"
      data-mode="feed-card-likes"
      style={{
        display: "block",
      }}
    >
      <div className="popup-box__content">{children}</div>
    </div>
  );
};

export default PopupBox;
