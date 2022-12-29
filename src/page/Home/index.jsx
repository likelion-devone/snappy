import { useState } from "react";

import { TopNavElement } from "component/common/Navbar/TopNav/index";
import PostCard from "component/common/PostCard/index";
import SearchBar from "component/Home/SearchBar/index";

import useFetch from "hook/useFetch";
import useTopNavSetter from "hook/useTopNavSetter";

import { req } from "lib/api";

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

  if (isPostDataLoading || !postData) {
    return <>로딩중</>;
  }

  return (
    <>
      <SearchBar handleClose={toggleSearch} $isSearchOpened={isSearchOpened} />
      {postData.posts.map((postCard) => (
        <PostCard key={postCard.id} {...{ ...postCard, postId: postCard.id }} />
      ))}
    </>
  )
}
