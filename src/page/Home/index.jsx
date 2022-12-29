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
  const { accountname } = useAuthInfo();

  const [isPostDataLoading, postData, _error] = useFetch(req.post.feed);

  // 내 게시글도 피드에 보이게 하기
  const [isMyPostDataLoading, myPostData, __error] = useFetch(
    req.post.userposts,
    { accountname }
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
            Date.parse(post2.createdAt) -
            Date.parse(post1.createdAt)
        )
        .map((postCard) => (
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
        ))}
    </>
  )
}
