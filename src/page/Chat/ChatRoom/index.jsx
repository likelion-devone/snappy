import styled from "styled-components";
import ChatProfile from "asset/profile-img-50.png";
import SnappyMarkGrey from "asset/snappy_grey.svg";
import SnappyMarkBlue from "asset/snappy_blue.svg";
import ChatSampleImg from "asset/ChatSampleImg.jpg";
import ChatSampleImg2 from "asset/ChatSampleImg2.jpg";
import SmallProfile from "component/common/SmallProfile";
import { PROFILE_SIZE } from "constant/size";
import CommentInput from "./CommentInput";
import ProfileImg from "asset/profile-img-42.png";
import { FONT_SIZE } from "constant/style";
import Icons from "asset/icon/icons";
import { useNavigate } from "react-router-dom";

const UserChat = styled.article`
  padding-top: 50px;
  margin-bottom: 30px;
  display: flex;
  gap: 15px;

  .logo {
    object-fit: contain;
    align-self: flex-start;
    border: 1px solid red;
  }
  .polaroid {
    width: 400px;
    background: #fff;
    padding: 1rem;
    border-color: white;
    border-style: solid;
    border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
    outline: ${(props) => props.theme.snGreyIcon} solid 2px;
    box-shadow: 0 1rem 1.2rem rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    font-size: ${FONT_SIZE.BASE};
  }
  .chat {
    display: block;
    border: 1.5px solid ${(props) => props.theme.snGreyMain};
    padding: 3rem;
    line-height: 1.5;
    background-color: ${(props) => props.theme.snGreyOff};
  }
  .snappyMark {
    width: 20%;
    align-self: flex-end;
    padding-top: 3rem;
  }
  .time {
    align-self: flex-end;
    margin-left: 30px;
    color: ${(props) => props.theme.snGreyIcon};
    padding-top: 1rem;
    align-self: flex-end;
  }
`;

const SnappyChatImg = styled.article`
  font-size: x-large;
  padding-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;

  .polaroid {
    width: 400px;
    background: #fff;
    padding: 1rem;
    border-color: white;
    border-style: solid;
    border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
    outline: ${(props) => props.theme.snBlue} solid 2px;
    box-shadow: 0 1rem 1.2rem rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }
  .chatSampleImg {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
  .chat {
    border: 2px solid ${(props) => props.theme.snBlue};
    background-color: ${(props) => props.theme.snGreyOff};
  }
  .snappyMark {
    width: 20%;
    align-self: flex-end;
    padding-top: 3rem;
  }
  .time {
    align-self: flex-end;
    margin-left: 30px;
    color: ${(props) => props.theme.snBlue};
    padding-top: 1rem;
    align-self: flex-end;
    font-size: ${FONT_SIZE.BASE};
  }
`;

const SnappyChat = styled.article`
  font-size: x-large;
  padding-top: 50px;
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;

  .polaroid {
    width: 400px;
    background: #fff;
    padding: 1rem;
    border-color: white;
    border-style: solid;
    border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
    outline: ${(props) => props.theme.snBlue} solid 2px;
    box-shadow: 0 1rem 1.2rem rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    font-size: ${FONT_SIZE.BASE};
  }
  .chatSampleImg {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
  .chat {
    border: 2px solid ${(props) => props.theme.snBlue};
    padding: 3rem;
    line-height: 1.5;
    background-color: ${(props) => props.theme.snBlue};
  }
  .snappyMark {
    width: 20%;
    align-self: flex-end;
    padding-top: 3rem;
  }
  .time {
    align-self: flex-end;
    margin-left: 30px;
    color: ${(props) => props.theme.snBlue};
    padding-top: 1rem;
    align-self: flex-end;
    font-size: ${FONT_SIZE.BASE};
  }
`;

const ImageUpload = styled.button`
  background-color: ${(props) => props.theme.snGreyOff};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
`;

const Send = styled.button`
  margin-right: 16px;
  color: ${(props) => props.theme.snGreyOff};
`;
const NavButton = styled.button`
  border: 3px solid blue;
`;
const ButtonModal = styled.button`
  border: 1px solid red;
`;

export default function ChatPage() {
  const navigate = useNavigate();
  return (
    <>
      <NavButton onClick={() => navigate(-1)}>back</NavButton>
      <ButtonModal type="submit">dropdown</ButtonModal>
      <UserChat>
        <SmallProfile src={ProfileImg} size={PROFILE_SIZE.SMALL} />

        <div className="polaroid">
          <p className="chat">
            안녕하세요! 올해 결혼 준비로 바쁜
            <br /> 예비 신부신랑 입니다. <br />
            작가님의 포트폴리오를 보니, <br />
            저희가 원하는 스타일로 <br />
            촬영을 해주시는 것 같아 연락드립니다!
          </p>
          <img
            src={SnappyMarkGrey}
            alt="스내피 로고 이미지입니다"
            className="snappyMark"
          ></img>

          <p className="time">12:39</p>
        </div>
      </UserChat>
      <UserChat>
        <SmallProfile src={ProfileImg} size={PROFILE_SIZE.SMALL} />
        <div className="polaroid">
          <p className="chat">
            혹시 어나더스튜디오에서 촬영하신 것 같으신데, 예시로 사진 몇 컷 볼
            수 있을까요?
          </p>
          <img
            src={SnappyMarkGrey}
            alt="프로필 이미지입니다"
            className="snappyMark"
          />
          <p className="time">1:13</p>
        </div>
      </UserChat>
      <SnappyChatImg>
        <div className="polaroid">
          <p className="chat">
            <img
              src={ChatSampleImg}
              alt="결혼 촬영 이미지입니다"
              className="chatSampleImg"
            />
          </p>
          <img
            src={SnappyMarkBlue}
            alt="스내피 로고 이미지입니다"
            className="snappyMark"
          />
          <p className="time">1:22</p>
        </div>
      </SnappyChatImg>
      <SnappyChatImg>
        <div className="polaroid">
          <p className="chat">
            <img
              src={ChatSampleImg2}
              alt="결혼 촬영 이미지입니다"
              className="chatSampleImg"
            />
          </p>
          <img
            src={SnappyMarkBlue}
            alt="프로필 이미지입니다"
            className="snappyMark"
          />
          <p className="time">1:20</p>
        </div>
      </SnappyChatImg>
      <SnappyChat>
        <div className="polaroid">
          <p className="chat">
            편하게 보시고 더 궁금하신 점 있으시면, 문의 남겨놓아주세요. 좋은하루
            되세요!
          </p>
          <img
            src={SnappyMarkBlue}
            alt="프로필 이미지입니다"
            className="snappyMark"
          />
          <p className="time">1:25</p>
        </div>
      </SnappyChat>
      <CommentInput
        left={
          <ImageUpload type="submit">
            <Icons.Image className="ImageUploader" />
          </ImageUpload>
        }
        right={<Send>전송</Send>}
      />
    </>
  );
}
