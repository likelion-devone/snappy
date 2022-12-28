import SnappyError from "asset/logo-404-343264.png";
import { BUTTON_STATE } from "constant/button_state";
import { BUTTON_SIZE } from "constant/size";
import styled from "styled-components";
import Button from "component/common/Button";
import { useNavigate } from "react-router-dom";
import { FONT_SIZE } from "constant/style";

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
  .PrevPage {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    z-index: 1;
    transform: scale(1.5);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  Button {
    position: relative;
    left: 35px;
  }
  .PageNotFound {
    position: relative;
    left: 35px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: ${FONT_SIZE.LARGE};
    color: ${(props) => props.theme.snGreyMain};
    font-weight: 700;
  }

  /* .mainlogo {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    z-index: 1;
    transform: scale(1.5);
  } */
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

// const PrevPage = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
export default function NotFoundErrorPage() {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <Wrapper>
      <img src={SnappyError} alt="404 로고 이미지입니다" className="logo1" />
      <img src={SnappyError} alt="404 로고 이미지입니다" className="logo2" />
      <div className="PrevPage">
        <img
          src={SnappyError}
          alt="404 로고 이미지입니다"
          className="mainlogo"
        />
        <p className="PageNotFound">Page Not Found</p>
        <Button
          className="PrevPageBtn"
          type="button"
          size={BUTTON_SIZE.LARGE_44}
          state={BUTTON_STATE.LARGE_44.ABLED}
          onClick={goback}
        >
          이전 페이지
        </Button>
      </div>

      <img src={SnappyError} alt="404 로고 이미지입니다" className="logo3" />
      <img src={SnappyError} alt="404 로고 이미지입니다" className="logo4" />
    </Wrapper>
  );
}
