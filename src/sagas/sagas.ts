import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  fetchData,
  changeCommentsAndReplies,
  changeStatus,
  changeAddCommentRequestParams,
  changeUserInfo,
  changeUpdateCommentRequestParams,
  deleteComment,
  changeModalDeleteCommentShow,
  changeArticleInfo,
  changeModalErrorShow,
  changeModalDeleteCommentLoad,
  changeCommentsAndRepliesCount,
  addArticleLike,
  removeArticleLike,
  loadMoreComments,
  changeSkip,
  changeCommentsCount,
  changeLoadMoreCommentsFetching,
  changeAdditionalCommentsAndReplies,
  fetchArticleInfo,
} from "../redux/slice";
import { CommentsStatusEnum } from "../enums";
import {
  selectAddCommentRequestParams,
  selectUpdateCommentRequestParams,
  selectDeleteCommentRequestParams,
  selectCommentsAndReplies,
  selectUserInfo,
  selectSkip,
  selectAdditionalCommentsAndReplies,
  selectCommentsAndRepliesCount,
} from "../redux/selectors";
import {
  AddCommentRequestParamsType,
  DeleteCommentRequestParamsType,
  ResponseType,
  UpdateCommentRequestParamsType,
  CommentListType,
  CommentItemType,
  UserInfoType,
} from "@myl-comments";
import { api } from "../api/api";
import { Utils } from "../utils";

function* tryCatch(gen: any) {
  try {
    yield* gen();
  } catch (error) {
    console.error(error);
    yield put(changeStatus(CommentsStatusEnum.Error));
  }
}

function* fetchArticleInfoWorkerSaga() {
  function* work() {
    const {
      listId: listIdRaw,
      pageItemId,
      webId: webIdRaw,
      siteId: siteIdRaw,
      serverRequestPath,
    } = yield _spPageContextInfo;

    const itemIdResponse = yield call(api.getItemId, serverRequestPath);

    const WebId = webIdRaw.replace("{", "").replace("}", "");
    const SiteId = siteIdRaw.replace("{", "").replace("}", "");
    const ListId = listIdRaw.replace("{", "").replace("}", "");
    const ItemId = itemIdResponse.data.UniqueId;

    let articleCounters;
    let articleLikes;

    try {
      const popularityResponse = yield call(api.getPopularityData, {
        ItemId,
      });

      articleCounters = {
        comments:
          popularityResponse?.data?.GetPopularityDataResult?.CommentsCount ?? 0,
        views:
          popularityResponse?.data?.GetPopularityDataResult?.ViewsCount ?? 0,
        likes:
          popularityResponse?.data?.GetPopularityDataResult?.LikesCount ?? 0,
      };

      articleLikes =
        popularityResponse?.data?.GetPopularityDataResult?.Likes ?? [];
    } catch (error) {
      console.error(error);

      articleCounters = {
        comments: 0,
        views: 0,
        likes: 0,
      };

      articleLikes = [];
    }

    try {
      const increaseViewResponse = yield call(api.increaseViewByCurrentUser, {
        SiteId,
        WebId,
        ItemId,
        ListId,
      });
    } catch (error) {
      console.error(error);
    }

    const authorOfArticle = yield call(api.getAuthorOfArticle, {
      PageItemId: pageItemId,
      ListId,
    });

    yield put(
      changeArticleInfo({
        url: window.location.origin + serverRequestPath,
        title: authorOfArticle?.data?.Title ?? "",
        author: {
          id: authorOfArticle?.data?.Author?.Id ?? Utils.EMPTY_ID,
          email: authorOfArticle?.data?.Author?.EMail ?? "",
        },
        counters: articleCounters,
        likes: articleLikes,
      })
    );
  }

  yield* tryCatch(work);
}

function* fetchDataWorkerSaga() {
  function* work() {
    yield put(changeStatus(CommentsStatusEnum.Fetching));

    const {
      userLoginName,
      userDisplayName,
      userEmail,
      listId: listIdRaw,
      pageItemId,
      userId,
      webId: webIdRaw,
      siteId: siteIdRaw,
      serverRequestPath,
    } = yield _spPageContextInfo;

    const myPictureUrlResponse = yield call(api.getMyPictureUrl);
    const itemIdResponse = yield call(api.getItemId, serverRequestPath);

    const WebId = webIdRaw.replace("{", "").replace("}", "");
    const SiteId = siteIdRaw.replace("{", "").replace("}", "");
    const ListId = listIdRaw.replace("{", "").replace("}", "");
    const ItemId = itemIdResponse.data.UniqueId;

    yield put(
      changeUserInfo({
        login: userLoginName,
        fullName: userDisplayName,
        email: userEmail,
        pictureURL:
          myPictureUrlResponse?.data?.PictureUrl ??
          Utils.EMPLOYEE_AVATAR_URL_PLACEHOLDER,
        presenceState: 0,
        PageItemId: pageItemId,
        UserId: userId,
        ListId,
        ItemId,
        WebId,
        SiteId,
      })
    );

    const skip = yield select(selectSkip);

    const fetchedData = yield call(api.getComments, {
      ItemId,
      Limit: Utils.INIT_COMMENTS_LIMIT,
      skip,
    });

    if (fetchedData?.status === 404) {
      throw new Error("Сервис не работает");
    }

    yield put(changeCommentsAndReplies(fetchedData.CommentsAndReplies));
    yield put(
      changeCommentsAndRepliesCount(fetchedData.CommentsAndRepliesCount)
    );
    yield put(changeCommentsCount(fetchedData.CommentsCount));
    yield put(changeSkip(Utils.SKIP_STEP));

    yield put(changeStatus(CommentsStatusEnum.Fetched));
  }

  yield* tryCatch(work);
}

function* loadMoreCommentsWorkerSaga() {
  function* work() {
    yield put(changeLoadMoreCommentsFetching(true));

    const skip = yield select(selectSkip);
    const userInfo: UserInfoType = yield select(selectUserInfo);
    const additionalCommentsAndReplies = yield select(
      selectAdditionalCommentsAndReplies
    );

    const fetchedData = yield call(api.getComments, {
      ItemId: userInfo.ItemId,
      Limit: Utils.INIT_COMMENTS_LIMIT,
      skip,
    });

    if (fetchedData?.status === 404) {
      throw new Error("Сервис не работает");
    }

    yield put(changeSkip(skip + Utils.SKIP_STEP));

    const newComments = fetchedData.CommentsAndReplies;

    yield put(
      changeAdditionalCommentsAndReplies([
        ...additionalCommentsAndReplies,
        ...newComments,
      ])
    );
    yield put(changeCommentsCount(fetchedData.CommentsCount));
    yield put(changeLoadMoreCommentsFetching(false));
  }

  yield* tryCatch(work);
}

function* addCommentWorkerSaga() {
  function* work() {
    const commentsAndReplies: CommentListType = yield select(
      selectCommentsAndReplies
    );
    const commentsAndRepliesCount: number = yield select(
      selectCommentsAndRepliesCount
    );
    const additionalCommentsAndReplies: CommentListType = yield select(
      selectAdditionalCommentsAndReplies
    );
    const createCommentParams: AddCommentRequestParamsType = yield select(
      selectAddCommentRequestParams
    );

    const newCommentResponse: CommentItemType = yield call(
      api.addComment,
      createCommentParams
    );

    if (!!newCommentResponse?.Id) {
      const clonedComments: CommentListType = yield Utils.getClonedComments(
        commentsAndReplies
      );

      if (createCommentParams?.ReplyTo1 === undefined) {
        yield put(
          changeCommentsAndReplies([newCommentResponse, ...clonedComments])
        );
      } else {
        const updated: CommentListType = yield Utils._.eachDeep(
          clonedComments,
          (value: CommentItemType) => {
            if (
              value?.Id !== undefined &&
              value?.Replies1 !== undefined &&
              value?.Id === createCommentParams?.ReplyTo1
            ) {
              value.Replies1.push(newCommentResponse);
            }
          }
        );

        yield put(changeCommentsAndReplies(updated));
        yield put(
          changeCommentsCount(
            additionalCommentsAndReplies.length + updated.length
          )
        );
      }
      yield put(changeCommentsAndRepliesCount(commentsAndRepliesCount + 1));
    } else {
      yield put(changeModalErrorShow(true));
    }
  }

  yield* tryCatch(work);
}

function* updateCommentWorkerSaga() {
  function* work() {
    const updateCommentParams: UpdateCommentRequestParamsType = yield select(
      selectUpdateCommentRequestParams
    );
    const commentsAndReplies: CommentListType = yield select(
      selectCommentsAndReplies
    );

    const responseData: ResponseType = yield call(
      api.updateComment,
      updateCommentParams
    );

    if (responseData.Success) {
      const clonedComments: CommentListType = yield Utils.getClonedComments(
        commentsAndReplies
      );

      const updated: CommentListType = yield Utils._.eachDeep(
        clonedComments,
        (value) => {
          if (value?.Id !== undefined && value?.Id === updateCommentParams.Id) {
            if (value?.Text !== undefined && value?.FullText !== undefined) {
              value.Text = updateCommentParams.Text;
              value.FullText = updateCommentParams.FullText;
            }
          }
        }
      );

      yield put(changeCommentsAndReplies(updated));
    } else {
      yield put(changeModalErrorShow(true));
    }
  }

  yield* tryCatch(work);
}

function* deleteCommentWorkerSaga() {
  function* work() {
    const deleteCommentParams: DeleteCommentRequestParamsType = yield select(
      selectDeleteCommentRequestParams
    );
    const commentsAndReplies: CommentListType = yield select(
      selectCommentsAndReplies
    );
    const commentsAndRepliesCount: number = yield select(
      selectCommentsAndRepliesCount
    );

    yield put(changeModalDeleteCommentLoad(true));
    const responseData = yield call(api.deleteComment, deleteCommentParams);

    if (!!responseData?.Success) {
      const clonedComments: CommentListType = yield Utils.getClonedComments(
        commentsAndReplies
      );

      const filtered = yield Utils._.filterDeep(
        clonedComments,
        (value, key, parentValue) => {
          if (value?.Id !== undefined && value?.Id === deleteCommentParams.Id) {
            return false;
          }
          return true;
        },
        {
          childrenPath: ["Replies1"],
          onFalse: {
            skipChildren: true, // false if childrenPath
            cloneDeep: false, // true if childrenPath
            keepIfEmpty: false,
          },
        }
      );

      yield put(
        changeCommentsAndReplies(filtered?.length === undefined ? [] : filtered)
      );
      yield put(changeCommentsAndRepliesCount(commentsAndRepliesCount - 1));
      yield put(changeModalDeleteCommentShow(false));
    } else {
      yield put(changeModalErrorShow(true));
    }

    yield put(changeModalDeleteCommentLoad(false));
  }

  yield* tryCatch(work);
}

function* addArticleLikeWorkerSaga() {
  try {
    const userInfo: UserInfoType = yield select(selectUserInfo);

    const { ItemId, ListId, SiteId, WebId } = userInfo;

    const addArticleLikeResponse = yield call(api.addArticleLike, {
      ItemId,
      ListId,
      SiteId,
      WebId,
    });
  } catch (error) {
    console.error(error);
  }
}
function* removeArticleLikeWorkerSaga() {
  try {
    const userInfo: UserInfoType = yield select(selectUserInfo);

    const { ItemId, ListId, SiteId, WebId } = userInfo;

    const removeArticleLikeResponse = yield call(api.removeArticleLike, {
      ItemId,
      ListId,
      SiteId,
      WebId,
    });
  } catch (error) {
    console.error(error);
  }
}

function* rootSaga() {
  yield all([
    yield takeEvery(fetchData, fetchDataWorkerSaga),
    yield takeEvery(fetchArticleInfo, fetchArticleInfoWorkerSaga),
    yield takeEvery(loadMoreComments, loadMoreCommentsWorkerSaga),
    yield takeEvery(changeAddCommentRequestParams, addCommentWorkerSaga),
    yield takeEvery(changeUpdateCommentRequestParams, updateCommentWorkerSaga),
    yield takeEvery(deleteComment, deleteCommentWorkerSaga),
    yield takeEvery(addArticleLike, addArticleLikeWorkerSaga),
    yield takeEvery(removeArticleLike, removeArticleLikeWorkerSaga),
  ]);
}

export default rootSaga;
