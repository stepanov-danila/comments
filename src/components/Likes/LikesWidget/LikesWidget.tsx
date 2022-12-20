import { ICommentAuthor } from "@myl-comments";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../redux/selectors";
import { Utils } from "../../../utils";
import LikesBox from "../../CommentLikesPopup/LikesBox";
import PopupBox from "../../CommentLikesPopup/PopupBox";
import { LikeIcon } from "../../Svg/Icons";

type Props = {
  likes: ICommentAuthor[] | [];
  onAddLike: () => void;
  onRemoveLike: () => void;
};

const LikesWidget = ({ likes: likesProps, onAddLike, onRemoveLike }: Props) => {
  const userInfo = useSelector(selectUserInfo);

  const [likes, setLikes] = useState<ICommentAuthor[] | []>([]);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [showLikesPopup, setShowLikesPopup] = useState<boolean>(false);

  const likedColor = liked ? "#00AEFF" : "#BFBFBF";

  const addLike = useCallback(() => {
    const clonedLikes = [...likes];

    clonedLikes.push({
      CardURL: `http://mylnt-web-01.lan.lanit.ru/Pages/Employee.aspx?AccountName=${userInfo.login}`,
      FullName: userInfo.fullName,
      Login: userInfo.login,
      PresenceState: userInfo.presenceState,
      PictureURL: userInfo.pictureURL,
      Email: userInfo.email,
    });

    setLikes(clonedLikes);

    onAddLike();
  }, [likes, userInfo, onAddLike]);

  const removeLike = useCallback(() => {
    let clonedLikes = [...likes];

    clonedLikes = clonedLikes.filter(
      (like) =>
        Utils.trimLogin(like?.Login ?? "") !== Utils.trimLogin(userInfo.login)
    );

    setLikes(clonedLikes);

    onRemoveLike();
  }, [likes, userInfo.login, onRemoveLike]);

  const handleLike = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();

      if (liked) {
        removeLike();
      } else {
        addLike();
      }
    },
    [liked, addLike, removeLike]
  );

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setShowLikesPopup(true);
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setShowLikesPopup(false);
  };

  useEffect(() => {
    setLikes(likesProps);
  }, [likesProps]);

  useEffect(() => {
    setLikesCount(likes.length);
  }, [likes]);

  useEffect(() => {
    setLiked(
      !!likes.find(
        (like: ICommentAuthor | undefined) =>
          Utils.trimLogin(like?.Login ?? "") === Utils.trimLogin(userInfo.login)
      )
    );
  }, [userInfo.login, likes]);

  return (
    <div
      className="likes-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="likes-widget" onClick={handleLike}>
        <LikeIcon color={likedColor} />
        {likesCount !== 0 && (
          <span
            style={{
              color: likedColor,
            }}
          >
            {likesCount}
          </span>
        )}
      </div>
      {showLikesPopup && likesCount > 0 && (
        <PopupBox>
          <LikesBox likes={likes} />
        </PopupBox>
      )}
    </div>
  );
};

export default LikesWidget;
