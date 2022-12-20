import {
  CommentItemType,
  CommentListType,
  DateStringType,
  IdType,
  RequestParamsType,
} from "@myl-comments";
import { AuthorPresenceStateEnum } from "./enums";
import lodash from "lodash";
import deepdash from "deepdash-es";

export namespace Utils {
  export const _ = deepdash(lodash);

  export const INIT_REQUEST_PARAMS_DATA: RequestParamsType = {
    ListId: "",
    ItemId: "",
    WebId: "",
    SiteId: "",
  };

  export const EMPTY_ID: IdType = -1;

  export const SKIP_STEP: number = 10;
  export const INIT_COMMENTS_LIMIT: number = 10;

  export const SCROLL_TO_COMMENTS_VALUE: string = "1";

  export const EMPLOYEE_AVATAR_URL_PLACEHOLDER: string =
    "/_layouts/15/images/mylanit.design/person.png";

  export const getClonedComments = (
    comments: CommentListType
  ): CommentListType => {
    return _.cloneDeep(comments);
  };

  export const mapPresenseTypeToText = (
    type: AuthorPresenceStateEnum
  ): string => {
    switch (type) {
      case AuthorPresenceStateEnum.Online:
        return "online";
      case AuthorPresenceStateEnum.WasRecently:
        return "was-recently";
      case AuthorPresenceStateEnum.Away:
        return "away";
      case AuthorPresenceStateEnum.NoData:
      default:
        return "no-data";
    }
  };

  export const formatCommentCreatedDateString = (
    createdDate: DateStringType
  ): string => {
    const createdDateTimestamp = parseInt(
      createdDate.slice(createdDate.indexOf("(") + 1, createdDate.indexOf("+"))
    );
    const nowTimestamp = Date.now();

    const passedTime: number = Math.round(
      (nowTimestamp - createdDateTimestamp) / 1000 / 60
    );

    if (passedTime < 60) {
      return passedTime === 0 ? "несколько секунд назад" : `${passedTime} мин`;
    }
    if (passedTime >= 60 && passedTime < 1440) {
      return `${Math.round(passedTime / 60)} ч`;
    }
    if (passedTime >= 1440 && passedTime < 10080) {
      return `${Math.round(passedTime / 1440)} дн`;
    }
    if (passedTime >= 10080 && passedTime < 43200) {
      return `${Math.round(passedTime / 10080)} нед`;
    }
    if (passedTime >= 43200 && passedTime < 15768000) {
      return `${Math.round(passedTime / 43200)} мес`;
    }
    if (passedTime >= 15768000 && passedTime < 63072000) {
      return `${Math.round(passedTime / 15768000)} года назад`;
    }
    if (passedTime >= 63072000) {
      return `${Math.round(passedTime / 15768000)} лет назад`;
    }
  };

  export const getTextContentFromHtmlText = (htmlText: string): string => {
    const div = document.createElement("div");
    div.innerHTML = htmlText;
    div.remove();
    return div.innerText;
  };

  export const removeImagesFromHtmlText = (htmlText: string) => {
    const div = document.createElement("div");
    div.innerHTML = htmlText;
    const images = div.querySelectorAll("img");
    Array.from(images).forEach((img) => img.remove());
    return removeEmptyParagraphsFromHtmlText(div.innerHTML);
  };

  export const removeEmptyParagraphsFromHtmlText = (htmlText: string) => {
    return htmlText.replaceAll("<p></p>", "");
  };

  export const removeUserLinkFromCommentText = (htmlText: string): string => {
    const div = document.createElement("div");
    div.innerHTML = htmlText;
    const responseUserLink = div.querySelector(
      ".myl-comment-item__response-user-link"
    );
    if (!!responseUserLink) {
      responseUserLink.remove();
    }
    return div.innerHTML;
  };

  export const getCommentRepliesCount = (replies: CommentItemType[]) => {
    let repliesCount = 0;
    _.eachDeep(
      replies,
      (value) => {
        repliesCount += 1;
      },
      {
        childrenPath: ["Replies1"],
      }
    );
    return repliesCount;
  };

  export const getRepliesText = (repliesCount: number) => {
    if (repliesCount === 1) return "ответ";
    if (repliesCount > 1 && repliesCount < 5) return "ответа";
    return "ответов";
  };

  export const trimLogin = (login: string): string =>
    login.replace("\\", "").slice(3).toLocaleLowerCase();
}
