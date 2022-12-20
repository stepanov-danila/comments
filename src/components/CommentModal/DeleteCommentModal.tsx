import { useDispatch, useSelector } from "react-redux";
import { selectModalDeleteComment } from "../../redux/selectors";
import { changeModalDeleteCommentShow, deleteComment } from "../../redux/slice";

const DeleteCommentModal = () => {
  const dispatch = useDispatch();

  const { load } = useSelector(selectModalDeleteComment);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(changeModalDeleteCommentShow(false));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (!load) {
      dispatch(deleteComment());
    }
  };

  return (
    <section className="myl-comment-modal">
      <div className="myl-comment-modal-bg" onClick={handleClose}></div>
      <div className="myl-comment-modal-win">
        <div
          className="myl-comment-modal-win__close"
          title="Закрыть"
          onClick={handleClose}
        >
          <div className="mdi mdi-close"></div>
        </div>
        <div className="myl-comment-modal-win__content">
          <span className="mdi mdi-alert-circle-outline"></span>
          <h2>Удаление комментария</h2>
          <p>Вы действительно хотите удалить комментарий?</p>
        </div>
        <div className="myl-comment-modal-win__btns">
          <div
            className="myl-comment-modal-win__btn btn"
            data-variant="dark"
            onClick={handleClose}
          >
            Отмена
          </div>
          <div
            className="myl-comment-modal-win__btn btn"
            onClick={handleSubmit}
            data-disabled={load}
          >
            Удалить
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteCommentModal;
