import { ICommentAuthor } from "@myl-comments";
import { useState } from "react";
import { DeleteIcon } from "../Svg/Icons";

type LikesBoxProps = {
  likes: ICommentAuthor[] | [];
};

const LikesBox = ({ likes }: LikesBoxProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className="likes-box"
      data-expanded={expanded}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="likes-box__head">
        <h5 className="likes-box__title">
          <span className="font-icon font-icon-like"></span>
          <p>
            Понравилось <span>{likes.length}</span>
          </p>
        </h5>
        {likes.length > 6 && (
          <>
            {expanded ? (
              <div
                className="likes-box__close"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
              >
                <DeleteIcon style={{ height: "20px", width: "20px" }} />
              </div>
            ) : (
              <div
                className="likes-box__all"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
              >
                Все
              </div>
            )}
          </>
        )}
      </div>
      <div className="likes-box__body">
        {likes.length > 0 && (
          <ul className="likes-box__list">
            {likes.map((like: ICommentAuthor, index: number) => (
              <li key={index}>
                <a
                  href={like.CardURL ?? "/"}
                  className="account-item"
                  title={like.FullName}
                >
                  <div
                    className="account-item__pic"
                    /* style={{
                      backgroundImage: `url(${like.PictureURL})`,
                    }} */
                  >
                    <img src={like.PictureURL} alt={like.FullName} />
                  </div>
                  <p className="account-item__name">
                    <span>{like.FullName}</span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LikesBox;
