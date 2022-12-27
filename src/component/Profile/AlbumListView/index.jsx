import styled from "styled-components";
import PropTypes from "prop-types";
import GreyIcon from "asset/logo-profile-172213.png";
import PostCard from "component/common/PostCard/index";

const SingleImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Single = styled.div`
  cursor: pointer;
`;

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 144px);
  grid-template-rows: repeat(10, 144px);
  gap: 8px;
  align-content: stretch;
  justify-content: center;
  ${Single}:nth-child(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  ${Single}:nth-child(5) {
    grid-column: 2/ 4;
    grid-row: 4/ 6;
  }
`;

const ListFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  margin: 0 auto;
`;

const handleImgError = (event) => {
  event.target.src = GreyIcon;
};

function AlbumView({ postData }) {
  return (
    <AlbumGrid>
      {postData
        .filter((slide) => {
          if (slide.image.endsWith("undefined")) {
            return false;
          }
          return true;
        })
        .map((slide) => {
          return (
            <Single key={slide.id}>
              <SingleImg src={slide.image} alt="" onError={handleImgError} />
            </Single>
          );
        })}
    </AlbumGrid>
  );
}

function ListView({ postData }) {
  return (
    <ListFlex>
      {postData.map((slide) => {
        return (
          <PostCard
            key={slide.id}
            author={slide.author}
            postId={slide.id}
            content={slide.content}
            image={slide.image}
            createdAt={slide.createdAt}
            hearted={slide.hearted}
            heartCount={slide.heartCount}
            commentCount={slide.commentCount}
          />
        );
      })}
    </ListFlex>
  );
}

export { AlbumView, ListView };

AlbumView.propTypes = {
  postData: PropTypes.arrayOf(PropTypes.object),
};
ListView.propTypes = {
  postData: PropTypes.arrayOf(PropTypes.object),
};
