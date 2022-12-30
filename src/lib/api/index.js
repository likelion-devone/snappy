import axios from "axios";
import { getTokenFromLocalStorage } from "lib/storage/localStorage";

const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

const axiosInstance = {
  withAuth: axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    headers: {
      "Acess-Control-Allow-Origin": "*",
    },
    // timeout: 10000,
  }),
  withoutAuth: axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    headers: {
      "Acess-Control-Allow-Origin": "*",
    },
    // timeout: 10000,
  }),
};

axiosInstance.withAuth.interceptors.request.use((req) => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    throw new Error("토큰이 없습니다.");
  } else req.headers.Authorization = `Bearer ${token}`;
  return req;
});

const reqWithoutAuth = {
  user: {
    login: ({ email, password }) => ({
      method: METHOD.POST,
      url: "/user/login",
      data: { user: { email, password } },
    }),
    checkEmail: ({ email }) => ({
      method: METHOD.POST,
      url: "/user/emailvalid",
      data: { user: { email } },
    }),
    checkAccountname: ({ accountname }) => ({
      method: METHOD.POST,
      url: "/user/accountnamevalid",
      data: {
        user: { accountname },
      },
    }),
    create: ({ username, email, password, accountname, intro, image }) => ({
      method: METHOD.POST,
      url: "/user",
      data: {
        user: { username, email, password, accountname, intro, image },
      },
    }),
  },
  image: {
    uploadfile: ({ formData }) => ({
      method: METHOD.POST,
      url: "/image/uploadfile",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    }),
    uploadfiles: ({ formData }) => ({
      method: METHOD.POST,
      url: "/image/uploadfiles",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: formData,
    }),
  },
};

const req = {
  user: {
    authInfo: () => ({
      method: METHOD.GET,
      url: "/user/myinfo",
    }),
    checkToken: () => ({
      method: METHOD.GET,
      url: "user/checktoken",
    }),
  },
  profile: {
    editProfile: ({ username, accountname, intro, image }) => ({
      method: METHOD.PUT,
      url: "/user",
      data: { user: { username, accountname, intro, image } },
    }),
    personalProfile: ({ accountname }) => ({
      method: METHOD.GET,
      url: "/profile/" + accountname,
    }),
    following: ({ accountname }) => ({
      method: METHOD.GET,
      url: `/profile/${accountname}/following`,
    }),
    followingPagination: ({ accountname, limit, skip }) => ({
      method: METHOD.GET,
      url: `/profile/${accountname}/following`,
      params: { limit, skip },
    }),
    follower: ({ accountname }) => ({
      method: METHOD.GET,
      url: `/profile/${accountname}/follower`,
    }),
    followerPagination: ({ accountname, limit, skip }) => ({
      method: METHOD.GET,
      url: `/profile/${accountname}/follower`,
      params: { limit, skip },
    }),
    follow: ({ accountname }) => ({
      method: METHOD.POST,
      url: `/profile/${accountname}/follow`,
    }),
    unfollow: ({ accountname }) => ({
      method: METHOD.DELETE,
      url: `/profile/${accountname}/unfollow`,
    }),
  },
  search: {
    user: ({ keyword }) => ({
      method: METHOD.GET,
      url: "/user/searchuser",
      params: {
        keyword,
      },
    }),
  },
  post: {
    feed: () => ({
      method: METHOD.GET,
      url: "/post/feed",
    }),
    feedPagination: ({ limit, skip }) => ({
      method: METHOD.GET,
      url: "/post/feed",
      params: { limit, skip },
    }),
    userposts: ({ accountname }) => ({
      method: METHOD.GET,
      url: `/post/${accountname}/userpost`,
    }),
    userpostsPagination: ({ accountname, limit, skip }) => ({
      method: METHOD.GET,
      url: `/post/${accountname}/userpost`,
      params: { limit, skip },
    }),
    detail: ({ postId }) => ({
      method: METHOD.GET,
      url: "/post/" + postId,
    }),
    create: ({ content, image }) => ({
      method: METHOD.POST,
      url: "/post",
      data: {
        post: {
          content,
          image,
        },
      },
    }),
    report: ({ postId }) => ({
      method: METHOD.POST,
      url: `/post/${postId}/report`,
    }),
    edit: ({ postId, content, image }) => ({
      method: METHOD.PUT,
      url: "/post/" + postId,
      data: {
        post: {
          content,
          image,
        },
      },
    }),
    remove: ({ postId }) => ({
      method: METHOD.DELETE,
      url: "/post/" + postId,
    }),
  },
  like: {
    activate: ({ postId }) => ({
      method: METHOD.POST,
      url: `/post/${postId}/heart`,
    }),
    cancle: ({ postId }) => ({
      method: METHOD.DELETE,
      url: `/post/${postId}/unheart`,
    }),
  },
  comment: {
    load: ({ postId }) => ({
      method: METHOD.GET,
      url: `/post/${postId}/comments`,
    }),
    loadPagination: ({ postId, limit, skip }) => ({
      method: METHOD.GET,
      url: `/post/${postId}/comments`,
      parameters: {
        limit,
        skip,
      },
    }),
    create: ({ postId, content }) => ({
      method: METHOD.POST,
      url: `/post/${postId}/comments`,
      data: { comment: { content } },
    }),
    report: ({ postId, commentId }) => ({
      method: METHOD.POST,
      url: `/post/${postId}/comments/${commentId}/report`,
    }),
    remove: ({ postId, commentId }) => ({
      method: METHOD.DELETE,
      url: `/post/${postId}/comments/${commentId}`,
    }),
  },
  product: {
    load: ({ accountname }) => ({
      method: METHOD.GET,
      url: "/product/" + accountname,
    }),
    loadPagination: ({ accountname, limit, skip }) => ({
      method: METHOD.GET,
      url: "/product/" + accountname,
      parameters: {
        limit,
        skip,
      },
    }),
    detail: ({ productId }) => ({
      method: METHOD.GET,
      url: "/product/detail/" + productId,
    }),
    add: ({ itemName, price, link, itemImage }) => ({
      method: METHOD.POST,
      url: "/product",
      data: {
        product: {
          itemName,
          price,
          link,
          itemImage,
        },
      },
    }),
    edit: ({ productId, itemName, price, link, itemImage }) => ({
      method: METHOD.PUT,
      url: "/product/" + productId,
      data: {
        product: {
          itemName,
          price,
          link,
          itemImage,
        },
      },
    }),
    remove: ({ productId }) => ({
      method: METHOD.DELETE,
      url: "/product/" + productId,
    }),
  },
  noAuth: reqWithoutAuth,
};

/**
 *
 * @param {() => Promise<axios.AxiosResponse<any, any>>} axiosRequest
 * @returns {Promise<Object.<string, any>>}
 */
const errorHandler = async (axiosRequest) => {
  try {
    const result = await axiosRequest();

    if ("status" in result.data) {
      if (`${result.data.status}` !== "200") {
        throw { response: result };
      }
    }

    return result.data;
  } catch (error) {
    if (error.response) {
      if (typeof error.response.data === "string") {
        throw { message: error.response.data, status: error.response.status };
      }

      throw error.response.data;
    }
    console.error(error);
  }
};

const serverWithoutAuth = (config, ...params) =>
  errorHandler(async () => axiosInstance.withoutAuth(config(...params)));

/**
 * 서버와의 통신시 사용하는 함수
 *
 * auth 없이 통신하는 경우 `server.noAuth`를 사용해주세요.
 *
 * @param {Function} config
 */
let server = (config, ...params) =>
  errorHandler(async () => axiosInstance.withAuth(config(...params)));

server.noAuth = serverWithoutAuth;

export { req, server };
