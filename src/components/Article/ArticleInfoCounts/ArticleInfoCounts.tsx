import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectArticleInfo } from "../../../redux/selectors";
import {
  addArticleLike,
  fetchArticleInfo,
  removeArticleLike,
} from "../../../redux/slice";
import LikesWidget from "../../Likes/LikesWidget/LikesWidget";

const ArticleInfoCounts = () => {
  const dispatch = useDispatch();
  const { counters, likes } = useSelector(selectArticleInfo);

  useEffect(() => {
    dispatch(fetchArticleInfo());
  }, []);

  return (
    <section className="myl-article-info-counts">
      <div
        className="myl-article-info-counts__item"
        title="Количество комментариев"
      >
        <span className="font-icon font-icon-comments" />
        <p>{counters.comments}</p>
      </div>
      <div
        className="myl-article-info-counts__item"
        title="Количество просмотров"
      >
        <span className="font-icon font-icon-view" />
        <p>{counters.views}</p>
      </div>
      <div className="myl-article-info-counts__item">
        <LikesWidget
          likes={likes}
          onAddLike={() => {
            dispatch(addArticleLike());
          }}
          onRemoveLike={() => {
            dispatch(removeArticleLike());
          }}
        />
      </div>
    </section>
  );
};

export default ArticleInfoCounts;
