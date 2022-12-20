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
      outline: ${({ theme }) => theme.snBlue} solid 6px;
      outline-offset: -6px;
    `}

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
