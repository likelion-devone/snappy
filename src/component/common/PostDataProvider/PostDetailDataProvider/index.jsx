import PropTypes from "prop-types";

import { PostDataContext } from "../index";

export default function PostDetailDataProvider({ children }) {
  return (
    <PostDataContext.Provider
      value={{
        getPostData: () => {},
        getMyPostData: () => {},
      }}
    >
      {children}
    </PostDataContext.Provider>
  );
}

PostDetailDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
