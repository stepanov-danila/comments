import { useSelector } from "react-redux";
import { selectModalDeleteComment, selectModalError } from "./redux/selectors";
import CommentsSection from "./components/CommentsSection/CommentsSection";
import DeleteCommentModal from "./components/CommentModal/DeleteCommentModal";
import ErrorModal from "./components/CommentModal/ErrorModal";
import "./assets/styles/sass/styles.sass";
import ArticleInfoCounts from "./components/Article/ArticleInfoCounts/ArticleInfoCounts";

const CommentsApp = () => {
  const { opened: showDeleteModal } = useSelector(selectModalDeleteComment);
  const { opened: showErrorModal } = useSelector(selectModalError);

  return (
    <>
      <ArticleInfoCounts />
      <CommentsSection />
      {showDeleteModal && <DeleteCommentModal />}
      {showErrorModal && <ErrorModal />}
    </>
  );
};

export default CommentsApp;
