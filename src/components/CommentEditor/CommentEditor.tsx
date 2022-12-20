import {
  AddCommentRequestParamsType,
  CommentEditorType,
  UpdateCommentRequestParamsType,
} from "@myl-comments";
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectArticleInfo, selectUserInfo } from "../../redux/selectors";
import {
  changeAddCommentRequestParams,
  changeCommentById,
  changeUpdateCommentRequestParams,
} from "../../redux/slice";
import { Utils } from "../../utils";
import {
  CommentButtonLink,
  CommentButtonSubmit,
} from "../CommentButtons/CommentButtons";
import CommentUserWidget from "../CommentUserWidget/CommentUserWidget";

const CommentEditor = ({
  WebId,
  SiteId,
  ListId,
  ItemId,
  commentId,
  initialValue = "",
  cancelShow = () => {},
  isEditMode = false,
  isRoot = false,
  parent,
  disableCancelButtonOnInit = false,
}: CommentEditorType) => {
  const editorRef = useRef(null);

  const dispatch = useDispatch();

  const { fullName, pictureURL, presenceState } = useSelector(selectUserInfo);
  const articleInfo = useSelector(selectArticleInfo);

  const [valid, setValid] = useState<boolean>(true);
  const [htmlText, setHtmlText] = useState<string>("");
  const [cancelButtonDisabled, setCancelButtonDisabled] = useState(false);

  const isResponse = useMemo(
    () => !!parent && !!commentId,
    [parent, commentId]
  );

  const isRootEdit = isRoot && isEditMode;
  const maxSize = 1000;

  const responseUserLink = useMemo(
    () =>
      `<p class='myl-comment-item__response-user-link'><a href='${
        parent?.CardURL || "#"
      }' target='_blank'>${parent?.FirstName || parent?.FullName}</a></p>`,
    [parent]
  );

  const handleInit = (event, editor) => {
    editorRef.current = editor;

    const htmlTextContent = editor.getContent();

    setHtmlText(htmlTextContent);
  };

  const handleEditorChange = (value, editor) => {
    const htmlTextContent = editor.getContent();
    const textContent = editor.getContent({ format: "text" });

    setHtmlText(htmlTextContent);
  };

  const handleBeforeAddUndo = (event, editor) => {
    const textContent = editor.getContent({ format: "text" });

    // note that this is the opposite test as in handleEditorChange
    // because we are determining when to deny adding an undo level
    if (textContent.length > maxSize) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    const textContent = editorRef.current.getContent({ format: "text" });

    const FullText =
      isResponse && !isRootEdit ? responseUserLink + htmlText : htmlText;

    const Text = Utils.removeEmptyParagraphsFromHtmlText(
      Utils.removeImagesFromHtmlText(FullText)
    );

    if (editorRef.current) {
      if (textContent.length !== 0 && textContent.length <= maxSize) {
        setValid(true);
        if (isEditMode) {
          dispatch(
            changeUpdateCommentRequestParams({
              Id: commentId,
              Text,
              FullText,
              ArticleUrl: `${articleInfo.url}#comment-${commentId}`,
              ArticleTitle: articleInfo.title,
              ArticleAuthorEmail: articleInfo.author.email,
              Limit: 5,
            } as UpdateCommentRequestParamsType)
          );
        } else {
          dispatch(
            changeAddCommentRequestParams({
              WebId,
              SiteId,
              ListId,
              ItemId,
              Text,
              FullText,
              Limit: 5,
              ReplyTo1: commentId,
              ArticleUrl: articleInfo.url,
              ArticleTitle: articleInfo.title,
              ArticleAuthorEmail: articleInfo.author.email,
              ParentCommentAuthorEmail: parent?.Email ?? null,
            } as AddCommentRequestParamsType)
          );
        }
        cancelShow();
        editorRef.current.setContent("");
        setHtmlText("");
      } else {
        setValid(false);
      }

      dispatch(changeCommentById(Utils.EMPTY_ID));
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    editorRef.current.setContent("");
    setHtmlText("");
    cancelShow();
    dispatch(changeCommentById(Utils.EMPTY_ID));
  };

  useEffect(() => {
    setCancelButtonDisabled(
      disableCancelButtonOnInit &&
        Utils.getTextContentFromHtmlText(htmlText).length === 0
    );
  }, [htmlText, disableCancelButtonOnInit]);

  return (
    <div className="myl-comment-editor">
      <div className="myl-comment-editor__user">
        <CommentUserWidget
          pictureUrl={pictureURL}
          pictureAlt={fullName}
          presenceState={presenceState}
        />
      </div>
      <div className="myl-comment-editor__editor">
        <div className="myl-comment-editor__field" data-valid={valid}>
          <div className="myl-comment-editor__widget">
            <Editor
              value={htmlText}
              initialValue={initialValue}
              onInit={handleInit}
              onEditorChange={handleEditorChange}
              onBeforePaste={handleBeforeAddUndo}
              onBeforeAddUndo={handleBeforeAddUndo}
              init={{
                height: "100%",
                placeholder: "Написать ответ",
                language: "ru",
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor emoticons",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar: "bold italic | numlist bullist | emoticons image link",
                content_style:
                  "body { font-family:FiraSans, Arial, sans-serif; font-size:14px, line-height: 17px; font-weight: 400; }",
                /* enable title field in the Image dialog*/
                image_title: true,
                /* enable automatic uploads of images represented by blob or data URIs*/
                automatic_uploads: true,
                /*
                URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                images_upload_url: 'postAcceptor.php',
                here we add custom filepicker only to Image dialog
              */
                file_picker_types: "image",
                /* and here's our custom image picker*/
                file_picker_callback: function (cb, value, meta) {
                  const tinymce = this;
                  var input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*");

                  /*
                  Note: In modern browsers input[type="file"] is functional without
                  even adding it to the DOM, but that might not be the case in some older
                  or quirky browsers like IE, so you might want to add it to the DOM
                  just in case, and visually hide it. And do not forget do remove it
                  once you do not need it anymore.
                */

                  input.addEventListener("change", function () {
                    const file = this.files[0];

                    const reader = new FileReader();

                    reader.readAsDataURL(file);

                    reader.onload = () => {
                      const id = "blobid" + new Date().getTime();
                      const blobCache = tinymce.editorUpload.blobCache;
                      const result = reader.result as string;
                      const base64 = result.split(",")[1];
                      const blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);
                      /* call the callback and populate the Title field with the file name */
                      cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.onerror = (error) => {
                      console.error(error);
                    };
                  });

                  input.click();
                },
              }}
            />
          </div>
          <div className="myl-comment-editor__toolbar">
            <CommentButtonLink
              onClick={handleCancel}
              disabled={cancelButtonDisabled}
            >
              Отмена
            </CommentButtonLink>
            <CommentButtonSubmit onClick={handleSubmit}>
              Отправить
            </CommentButtonSubmit>
          </div>
        </div>
        {!valid && (
          <p className="myl-comment-editor__helper">
            Поле не должно быть пустым и количество введенных символов не должно
            превышать 1000
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentEditor;
