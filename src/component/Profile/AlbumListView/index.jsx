import styled from "styled-components";
import PropTypes from "prop-types";
import GreyIcon from "asset/logo-profile-172213.png";
import PostCard from "component/common/PostCard/index";
import { Link } from "react-router-dom";
import routeResolver from "util/routeResolver";
import ROUTE from "constant/route";

const SingleImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const AlbumGrid = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  width: 100%;
  max-width: 420px;
  margin: 0 auto;

  li:nth-child(13n + 1) {
    grid-column: span 2;
    grid-row: span 2;
  }
  li:nth-child(8n) {
    grid-column: span 2;
    grid-row: span 2;
  }

  ${({ visible }) => !visible && `
    position: absolute;
    left: -200vw;
  `};
`;

const ListViewWrapper = styled.ol`
  ${({ visible }) => !visible && `
    position: absolute;
    left: -200vw;
  `};
`

const handleImgError = (event) => {
  event.target.src = GreyIcon;
};

function AlbumView({ postData, visible }) {
  const imgCount = postData.length;

  return (
    <AlbumGrid visible={visible} imgCount={imgCount}>
      {postData
        .filter((slide) => {
          if (!slide.image) {
            return false;
          }
          if (slide.image.endsWith("undefined")) {
            return false;
          }
          return true;
        })
        .map((slide) => {
          return (
            <li key={slide.id}>
              <Link to={routeResolver(ROUTE.POST, slide.id)}>
                <SingleImg
                  src={slide.image.split(',')[0]}
                  alt={`${slide.author.username}님이 올리신 포스트의 썸네일 이미지입니다.`}
                  onError={handleImgError}
                />
              </Link>
            </li>
          );
        })}
    </AlbumGrid>
  );
}

function ListView({ postData, visible }) {
  return (
    <ListViewWrapper visible={visible}>
      {postData.map((slide) => {
        return (
          <li key={slide.id}>
            <PostCard
              authorId={slide.author._id}
              username={slide.author.username}
              accountname={slide.author.accountname}
              profileImage={slide.author.image}
              postId={slide.id}
              content={slide.content}
              image={slide.image}
              createdAt={slide.createdAt}
              updatedAt={slide.updatedAt}
              hearted={slide.hearted}
              heartCount={slide.heartCount}
              commentCount={slide.commentCount}
            />
          </li>
        );
      })}
    </ListViewWrapper>
  );
}

export { AlbumView, ListView };

AlbumView.propTypes = {
  postData: PropTypes.arrayOf(PropTypes.object),
  visible: PropTypes.bool.isRequired
};
ListView.propTypes = {
  postData: PropTypes.arrayOf(PropTypes.object),
  visible: PropTypes.bool.isRequired
};
