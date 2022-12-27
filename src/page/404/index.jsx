import SnappyError from "asset/logo-404-343264.png";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1.5fr 1fr;
  grid-template-rows: 1fr 1.5fr 1fr;
  align-items: center;

  .logo2 {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;
    transform: translate(0, 100px);
  }
  .mainlogo {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    z-index: 1;
    transform: scale(1.5);
  }
  .logo3 {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 4;
  }
  .logo4 {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;
    transform: translate(0, 100px);
  }
`;
export default function NotFoundErrorPage() {
  return (
    <Wrapper>
      <img src={SnappyError} alt="404 로고 이미지입니다" className="logo1" />
      <img src={SnappyError} alt="404 로고 이미지입니다" className="logo2" />
      <img src={SnappyError} alt="404 로고 이미지입니다" className="mainlogo" />
      <img src={SnappyError} alt="404 로고 이미지입니다" className="logo3" />
      <img src={SnappyError} alt="404 로고 이미지입니다" className="logo4" />
    </Wrapper>
  );
}
