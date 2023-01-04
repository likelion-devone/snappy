import styled from "styled-components";
import { useState, useContext, useEffect, useRef } from "react";

import PostCard from "component/common/PostCard/index";
import SearchBar from "component/Home/SearchBar/index";
import Button from "component/common/Button/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";
import { PostDataContext } from "component/common/PostDataProvider/index";

import useTopNavSetter from "hook/useTopNavSetter";
import usePagination from "hook/usePagination";

import {
  FONT_SIZE,
  GLOBAL_NAVBAR_HEIGHT,
  TOP_NAVBAR_HEIGHT,
} from "constant/style";
import { BUTTON_SIZE } from "constant/size";
import { BUTTON_STATE } from "constant/button_state";

import LogoBw from "asset/logo-bw-212262.png";
import { ReactComponent as SnappyTitleLogoBlack } from "asset/snappy_black.svg";
import { LoaderNappy } from "component/common/Animation/index";
import useAPI from "hook/useAPI";
import { req } from "lib/api/index";

const NoFollowingsWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: calc(100vh - ${GLOBAL_NAVBAR_HEIGHT} - ${TOP_NAVBAR_HEIGHT});

  .logo {
    width: 150px;
    vertical-align: top;
    transform: translate(-12px);
  }
  .guide {
    margin: 23px 0;

    font-weight: 400;
    line-height: 14px;
    font-size: ${FONT_SIZE.BASE};

    color: ${({ theme }) => theme.snGreyIcon};
  }
`;

export default function HomePage() {
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpened((prev) => !prev);
  };

  useTopNavSetter({
    left: <SnappyTitleLogoBlack width={100} />,
    right: <TopNavElement.SearchButton onClick={toggleSearch} />,
  });

  // 페이지네이션
  const [_isFeedLoading, _feedData, _feedError, loadFeed] = useAPI(
    req.post.feedPagination
  );

  const skipRef = useRef(0);
  const { feeds, hasMore, loading, error, loadMoreFeeds } =
    usePagination(loadFeed);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (loading) {
        return;
      }
      if (window.innerHeight + scrollTop >= offsetHeight - 1 && hasMore) {
        skipRef.current = skipRef.current + 20;
        loadMoreFeeds(skipRef.current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading, loadMoreFeeds]);

  useEffect(() => {
    loadMoreFeeds(skipRef.current);
  }, [loadMoreFeeds]);

  const { isPostDataLoading, postData, getPostData } =
    useContext(PostDataContext);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  if (isPostDataLoading || !postData) {
    return <LoaderNappy />;
  }

  return (
    <>
      <SearchBar handleClose={toggleSearch} $isSearchOpened={isSearchOpened} />
      {postData.length !== 0 ? (
        feeds.map((feed) => {
          return (
            <PostCard
              key={feed.id}
              authorId={feed.author._id}
              username={feed.author.username}
              accountname={feed.author.accountname}
              profileImage={feed.author.image}
              postId={feed.id}
              content={feed.content}
              image={feed.image}
              createdAt={feed.createdAt}
              hearted={feed.hearted}
              heartCount={feed.heartCount}
              commentCount={feed.commentCount}
              updatedAt={feed.updatedAt}
            />
          );
        })
      ) : (
        <NoFollowingsWrapper>
          <h2 className="sr-only">유저 팔로우 없음 안내</h2>
          <img
            className="logo"
            src={LogoBw}
            alt="내피가 팔을 흔들고 있는 모습입니다."
          />
          <p className="guide">유저를 검색해 팔로우 해보세요!</p>
          <Button
            size={BUTTON_SIZE.LARGE_44}
            state={BUTTON_STATE.LARGE_44.ABLED}
            onClick={toggleSearch}
          >
            검색하기
          </Button>
        </NoFollowingsWrapper>
      )}
      {loading && <div>{"loading..."}</div>}
      {error && <div>{"Error"}</div>}
    </>
  );
}
