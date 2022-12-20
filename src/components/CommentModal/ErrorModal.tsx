import React from "react";
import { useDispatch } from "react-redux";
import { changeModalErrorShow } from "../../redux/slice";

const ErrorModal = () => {
  const dispatch = useDispatch();

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(changeModalErrorShow(false));
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
          <div className="mdi mdi-attention"></div>
        </div>
        <div className="myl-comment-modal-win__content">
          <span className="mdi mdi-alert-circle-outline"></span>
          <h2>УПС!</h2>
          <p>Что-то пошло не так...</p>
          <p>Попробуйте позже</p>
        </div>
        <div className="myl-comment-modal-win__btns">
          <div className="myl-comment-modal-win__btn btn" onClick={handleClose}>
            Закрыть
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorModal;
