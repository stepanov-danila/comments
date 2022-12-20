import {
  AddLikeRequestParamsType,
  AddCommentRequestParamsType,
  GetCommentsRequestType,
  RemoveArticleLikeRequestParamsType,
  DeleteCommentRequestParamsType,
  UpdateCommentRequestParamsType,
  GetAuthorOfArticleRequestType,
  GetPopularityDataType,
  IncreaseViewByCurrentUserType,
  DeleteLikeRequestParamsType,
  AddArticleLikeRequestParamsType,
} from "@myl-comments";
import axios from "axios";

const { webAbsoluteUrl } = _spPageContextInfo;

// Конкретный экземпляр axios, для настройки работы с одним api
const axiosInstance = axios.create({
  baseURL: `/_vti_bin/mylanit.design/webservice.svc`,
});

const get = (url, params = {}) => {
  return axiosInstance
    .get(url, {
      params,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

const post = (url, data) => {
  return axiosInstance
    .post(url, data, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
};

export const api = {
  getComments(data: GetCommentsRequestType) {
    return get("GetComments", data);
  },
  getItemId(serverRequestPath: string) {
    return axios.get(
      `${webAbsoluteUrl}/_api/Web/GetFileByServerRelativePath(decodedurl='${serverRequestPath}')?$select=UniqueId`
    );
  },
  getMyPictureUrl() {
    return axios.get(
      `/_api/SP.UserProfiles.PeopleManager/GetMyProperties?$select=PictureUrl`
    );
  },
  getAuthorOfArticle(data: GetAuthorOfArticleRequestType) {
    return axios.get(
      `${webAbsoluteUrl}/_api/web/lists('${data.ListId}')/items(${data.PageItemId})?$expand=Author&$select=Title,Author/Id,Author/Title,Author/EMail`
    );
  },
  getPopularityData(data: GetPopularityDataType) {
    return axios.get(
      `/_vti_bin/mylanit.design/webservice.svc/GetPopularityData?itemId=${data.ItemId}`
    );
  },
  increaseViewByCurrentUser(data: IncreaseViewByCurrentUserType) {
    return axios.post(
      `/_vti_bin/mylanit.design/webservice.svc/IncreaseViewByCurrentUser?siteId=${data.SiteId}&webId=${data.WebId}&listId=${data.ListId}&itemId=${data.ItemId}`
    );
  },

  addComment(data: AddCommentRequestParamsType) {
    return post("AddCommentByCurrentAuthor", data);
  },
  deleteComment(data: DeleteCommentRequestParamsType) {
    return post("DeleteComment", data);
  },
  updateComment(data: UpdateCommentRequestParamsType) {
    return post("UpdateCommentByCurrentAuthor", data);
  },
  addLike(data: AddLikeRequestParamsType) {
    return post("AppendLike", data);
  },
  deleteLike(data: DeleteLikeRequestParamsType) {
    return axios.post(
      `/_vti_bin/mylanit.design/webservice.svc/DeleteLike?dbItemId=${data.dbItemId}`
    );
  },
  addArticleLike(data: AddArticleLikeRequestParamsType) {
    return post("AppendLike", data);
  },
  removeArticleLike(data: RemoveArticleLikeRequestParamsType) {
    return axios.post(
      `/_vti_bin/mylanit.design/webservice.svc/RemoveLike?siteId=${data.SiteId}&webId=${data.WebId}&listId=${data.ListId}&itemId=${data.ItemId}`
    );
  },
};
