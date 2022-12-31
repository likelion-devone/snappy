import styled from "styled-components";
import { useState, useContext, useEffect } from "react";

import { TopNavElement } from "component/common/Navbar/TopNav/index";
import PostCard from "component/common/PostCard/index";
import SearchBar from "component/Home/SearchBar/index";
import Button from "component/common/Button/index";
import { PostDataContext } from "component/common/PostDataProvider/index";

import useTopNavSetter from "hook/useTopNavSetter";

import { FONT_SIZE, GLOBAL_NAVBAR_HEIGHT, TOP_NAVBAR_HEIGHT } from "constant/style";
import { BUTTON_SIZE } from "constant/size";
import { BUTTON_STATE } from "constant/button_state";

import LogoBw from "asset/logo-bw-212262.png";

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
    transform: translate(-10px);
  }
  .guide {
    margin: 23px 0;

    font-weight: 400;
    font-size: ${FONT_SIZE.BASE};
    line-height: 14px;

    color: ${({ theme }) => theme.snGreyIcon};
  }
`

export default function HomePage() {
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpened((prev) => !prev);
  }

  useTopNavSetter({
    left: (
      <TopNavElement.Title>
        Snappy Feed
      </TopNavElement.Title>
    ),
    right: (
      <TopNavElement.SearchButton onClick={toggleSearch} />
    )
  });

  const {
    getMyPostData,
    getPostData,
    isMyPostDataLoading,
    isPostDataLoading,
    postData,
    myPostData
  } = useContext(PostDataContext);

  useEffect(() => {
    getMyPostData();
    getPostData();
  }, [getMyPostData, getPostData]);

  // 로딩중이면 데이터가 들어오지 않습니다.
  if (isPostDataLoading || !postData || isMyPostDataLoading || !myPostData) {
    return <>로딩중</>;
  }

  const postDataSorted = [...postData, ...myPostData]
    .sort(
      (post1, post2) =>
        Date.parse(post2.createdAt) -
        Date.parse(post1.createdAt)
    );

  return (
    <>
      <SearchBar handleClose={toggleSearch} $isSearchOpened={isSearchOpened} />
      {
        postDataSorted.length !== 0 ?
          postDataSorted.map((postCard) => (
            <PostCard
              key={postCard.id}
              authorId={postCard.author._id}
              username={postCard.author.username}
              accountname={postCard.author.accountname}
              profileImage={postCard.author.image}
              postId={postCard.id}
              content={postCard.content}
              image={postCard.image}
              createdAt={postCard.createdAt}
              hearted={postCard.hearted}
              heartCount={postCard.heartCount}
              commentCount={postCard.commentCount}
            />
          ))
          :
          <NoFollowingsWrapper>
            <h2 className="sr-only">유저 팔로우 없음 안내</h2>
            <img className="logo" src={LogoBw} alt="스내피 로고" />
            <p className="guide">유저를 검색해 팔로우 해보세요!</p>
            <Button
              size={BUTTON_SIZE.LARGE_44}
              state={BUTTON_STATE.LARGE_44.ABLED}
              onClick={toggleSearch}
            >
              검색하기
            </Button>
          </NoFollowingsWrapper>
      }
    </>
  )
}
