import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;

  width: 100%;

  ${({ bottomRight }) =>
    bottomRight &&
    css`
      .image-wrapper {
        position: relative;

        .bottom-right-wrapper {
          width: 36px;
          height: 36px;

          display: flex;
          justify-content: center;
          align-items: center;

          position: absolute;
          bottom: 0;
          right: 0;

          overflow: hidden;
        }
      }
    `}
`;

const Img = styled.img`
  overflow: hidden;
  border-radius: 50%;
  vertical-align: top;

  flex-shrink: 0;

  ${({ isPhotographer }) =>
    isPhotographer &&
    css`
      outline: ${({ theme }) => theme.snBlue} solid 4px;
      outline-offset: -4px;
    `}
`;

export default function BigProfile({ bottomRight, left, right, ...props }) {
  const { isPhotographer } = props;

  if (process.env.NODE_ENV === "development") {
    return (
      <Wrapper bottomRight={bottomRight}>
        {left}
        <div className="image-wrapper">
          <Img
            src={"https://fakeimg.pl/110x110/"}
            alt="프로필 이미지입니다"
            isPhotographer={isPhotographer}
          />
          <div className="bottom-right-wrapper">{bottomRight}</div>
        </div>
        {right}
      </Wrapper>
    );
  }

  return (
    <Wrapper bottomRight={bottomRight}>
      {left}
      <div className="image-wrapper">
        <Img
          src={"https://fakeimg.pl/110x110/"}
          alt="프로필 이미지입니다"
          isPhotographer={isPhotographer}
        />
        <div className="bottom-right-wrapper">{bottomRight}</div>
      </div>
      {right}
    </Wrapper>
  );
}

BigProfile.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
  bottomRight: PropTypes.element,
  isPhotographer: PropTypes.bool,
};
