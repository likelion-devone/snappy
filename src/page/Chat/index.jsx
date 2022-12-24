import styled from "styled-components";
import theme from "style/theme";

const Wrapper = styled.div`
  font-size: x-large;
  display: flex;
  padding-top: 100px;

  .logo {
    border: 3px solid red;
    margin-right: 40px;
  }
  .polaroid {
    width: 700px;
    background: #fff;
    padding: 1rem;
    border-color: white;
    border-style: solid;
    border-width: 0.1rem 0.1rem 7rem 0.1rem;
    outline: ${(props) => props.theme.snGreyIcon} solid 2px;
    box-shadow: 0 1rem 1.2rem rgba(0, 0, 0, 0.2);
    transform: rotate(-5deg);
  }
  .chat {
    display: block;

    border: 1.5px solid ${(props) => props.theme.snGreyMain};
    padding: 3rem;
    line-height: 1.5;
  }
`;
export default function ChatPage() {
  return (
    <>
      <Wrapper>
        <div className="logo">hello</div>
        <section className="polaroid">
          <p className="chat">
            안녕하세요! 올해 결혼 준비로 바쁜 예비 신부신랑 입니다. 작가님의
            사진 포트폴리오를 보니, 저희가 원하는 스타일로 촬영을 해주시는 것
            같아 연락드립니다! 조금 더 문의드릴 것들이 있는데, 가능하실때 연락
            주실 수 있을까요?
          </p>
        </section>
      </Wrapper>
    </>
  );
}
