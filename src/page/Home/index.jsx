import { useState } from "react";

import { TopNavElement } from "component/common/Navbar/TopNav/index";
import PostCard from "component/common/PostCard/index";
import SearchBar from "component/Home/SearchBar/index";

import useFetch from "hook/useFetch";
import useTopNavSetter from "hook/useTopNavSetter";

import { req } from "lib/api";
import useAuthInfo from "hook/useAuthInfo";

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
  const [isPostDataLoading, postData, _error] = useFetch(req.post.feed);
  const authInfo = useAuthInfo();

  // 내 게시글도 피드에 보이게 하기
  const [isMyPostDataLoading, myPostData, __error] = useFetch(
    req.post.userposts,
    { accountname: authInfo.accountname }
  );

  // 로딩중이면 데이터가 들어오지 않습니다.
  if (isPostDataLoading || !postData || isMyPostDataLoading || !myPostData) {
    return <>로딩중</>;
  }

  return (
    <>
      <SearchBar handleClose={toggleSearch} $isSearchOpened={isSearchOpened} />
      {[...postData.posts, ...myPostData.post]
        .sort(
          (post1, post2) =>
            new Date(post2.createdAt).getTime() -
            new Date(post1.createdAt).getTime()
        )
        .map((postCard) => (
          <PostCard key={postCard.id} {...{ ...postCard, postId: postCard.id }} />
        ))}
    </>
  )
}
