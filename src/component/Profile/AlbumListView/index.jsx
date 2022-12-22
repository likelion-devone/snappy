import styled from "styled-components";
import PropTypes from "prop-types";

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

function AlbumView({ photodata }) {
  return (
    <AlbumGrid>
      {photodata.map((slide, index) => {
        return (
          <Single key={index}>
            <SingleImg src={slide.image} alt="" />
          </Single>
        );
      })}
    </AlbumGrid>
  );
}

function ListView({ photodata }) {
  return (
    <ListFlex>
      {photodata.map((slide, index) => {
        return (
          <div className="ListSingle" key={index}>
            <p>{slide.content}</p>
            <SingleImg src={slide.image} alt="" />
          </div>
        );
      })}
    </ListFlex>
  );
}

export { AlbumView, ListView };

AlbumView.propTypes = {
  photodata: PropTypes.arrayOf(PropTypes.object),
};
ListView.propTypes = {
  photodata: PropTypes.arrayOf(PropTypes.object),
};
