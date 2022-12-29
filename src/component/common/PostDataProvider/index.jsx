import { createContext, useCallback } from "react";
import PropTypes from "prop-types";

import useAPI from "hook/useAPI";
import useAuthInfo from "hook/useAuthInfo";

import { req } from "lib/api";

/**
 * @typedef {Object} AuthorData
 * @property {string} _id
 * @property {string} username
 * @property {string} accountname
 * @property {Array.<string>} following
 * @property {Array.<string>} follower
 * @property {number} followerCount
 * @property {number} followingCount
 */

/**
 * @typedef {Object} PostData
 * @property {string} id
 * @property {string} content
 * @property {string} image
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {boolean} hearted
 * @property {number} heartCount
 * @property {number} commentCount
 * @property {AuthorData} author
 */

/**
 * @typedef {Object} PostDataContextObject
 * @property {PostData} postData
 * @property {PostData} myPostData
 * @property {PostData} userPostData
 * @property {Object.<string, any>} postDataError
 * @property {Object.<string, any>} myPostDataError
 * @property {Object.<string, any>} userPostDataError
 * @property {boolean} isPostDataLoading
 * @property {boolean} isMyPostDataLoading
 * @property {boolean} isUserPostDataLoading
 * @property {() => Promise<PostData>} getPostData
 * @property {() => Promise<PostData>} getMyPostData
 * @property {({accountname}: {accountname: string}) => Promise<PostData>} getUserPostData
 */

/**
 * @type {React.Context<PostDataContextObject>}
 */
export const PostDataContext = createContext();

export default function PostDataProvider({ children }) {
  const [isPostDataLoading, postData, postDataError, getPostData] = useAPI(req.post.feed);
  const [isUserPostDataLoading, userPostData, userPostDataError, getUserPostData] = useAPI(req.post.userposts);

  const { accountname } = useAuthInfo();

  const getMyPostData = useCallback(
    () => getUserPostData({ accountname })
    , [accountname, getUserPostData]);

  return (
    <PostDataContext.Provider value={{
      postData: postData ? postData.posts : null,
      myPostData: userPostData ? userPostData.post : null,
      userPostData: userPostData ? userPostData.post : null,
      postDataError,
      myPostDataError: userPostDataError,
      userPostDataError,
      isPostDataLoading,
      isMyPostDataLoading: isUserPostDataLoading,
      isUserPostDataLoading,
      getPostData,
      getMyPostData,
      getUserPostData
    }}>
      {children}
    </PostDataContext.Provider>
  );
}

PostDataProvider.propTypes = {
  children: PropTypes.node.isRequired
}