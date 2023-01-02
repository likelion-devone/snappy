import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import SmallProfile from "component/common/SmallProfile";
import { CommentForm } from "component/common/Form";
import { DropdownModal } from "component/common/Modal/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import useDropdownModal from "hook/useDropdownModal";
import useTopNavSetter from "hook/useTopNavSetter";

import { PROFILE_SIZE } from "constant/size";
import { FONT_SIZE } from "constant/style";
import ROUTE from "constant/route";

import SnappyMarkGrey from "asset/snappy_grey.svg";
import SnappyMarkBlue from "asset/snappy_blue.svg";
import ChatSampleImg from "asset/ChatSampleImg.jpg";
import ChatSampleImg2 from "asset/ChatSampleImg2.jpg";
import ProfileImg from "asset/profile-img-42.png";
import Icons from "asset/icon/icons";

const ChatRoomWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 80px;
`;

const UserChat = styled.article`
  display: flex;
  gap: 15px;
  padding-right: 50px;
  margin-bottom: 30px;

  .logo {
    object-fit: contain;
    align-self: flex-start;
    border: 1px solid red;
  }
  .polaroid {
    width: 400px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-style: solid;
    border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
    outline: ${({ theme }) => theme.snGreyIcon} solid 2px;
    border-color: ${({ theme }) => theme.snWhite};
    background: ${({ theme }) => theme.snWhite};
    box-shadow: 0 1rem 1.2rem rgba(0, 0, 0, 0.2);
    font-size: ${FONT_SIZE.BASE};
  }
  .chat {
    display: block;
    padding: 1.5rem;
    line-height: 1.5;
    border: 1.5px solid ${({ theme }) => theme.snGreyMain};
    background-color: ${({ theme }) => theme.snGreyOff};
  }
  .snappyMark {
    width: 20%;
    align-self: flex-end;
    padding-top: 1rem;
  }
  .time {
    align-self: flex-end;
    margin-left: 30px;
    padding-top: 1rem;
    color: ${({ theme }) => theme.snGreyIcon};
  }
`;

const SnappyImgChatWrapper = styled.article`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  padding-left: 150px;
  font-size: ${FONT_SIZE.BASE};

  .polaroid {
    width: 400px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-right: 20px;
    border-style: solid;
    border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
    border-color: ${({ theme }) => theme.snWhite};
    outline: ${({ theme }) => theme.snBlue} solid 2px;
    background: ${({ theme }) => theme.snWhite};
    box-shadow: 0 1rem 1.2rem rgba(0, 0, 0, 0.2);
  }
  .chatSampleImg {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
  .chat {
    border: 2px solid ${({ theme }) => theme.snBlue};
    background-color: ${({ theme }) => theme.snGreyOff};
  }
  .snappyMark {
    width: 20%;
    align-self: flex-end;
    padding-top: 1rem;
  }
  .time {
    align-self: flex-end;
    margin-left: 30px;
    padding-top: 1rem;
    color: ${({ theme }) => theme.snBlue};
    font-size: ${FONT_SIZE.BASE};
  }
`;

const SnappyChatWrapper = styled.article`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  padding-left: 150px;
  font-size: ${FONT_SIZE.BASE};

  .polaroid {
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    padding: 1rem;
    border-style: solid;
    border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
    border-color: ${({ theme }) => theme.snWhite};
    outline: ${({ theme }) => theme.snBlue} solid 2px;
    background: ${({ theme }) => theme.snWhite};
    box-shadow: 0 1rem 1.2rem rgba(0, 0, 0, 0.2);
    font-size: ${FONT_SIZE.BASE};
  }

  .chat {
    padding: 1.5rem;
    line-height: 1.5;
    border: 2px solid ${({ theme }) => theme.snBlue};
    background-color: ${({ theme }) => theme.snBlue};
  }
  .snappyMark {
    width: 20%;
    align-self: flex-end;
    padding-top: 1rem;
  }
  .time {
    align-self: flex-end;
    padding-top: 1rem;
    margin-left: 30px;
    color: ${({ theme }) => theme.snBlue};
    font-size: ${FONT_SIZE.BASE};
  }
`;

const ImageUploadBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.snGreyOff};
`;

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const lastChatRef = useRef(null);
  const [isExitDroppedUp, dropUpExit, dropDownExit] = useDropdownModal();

  useTopNavSetter({
    left: (
      <>
        <TopNavElement.GoBackButton />
        <TopNavElement.Title>
          최고의 사진작가 <span className="sr-only">채팅 상세 페이지</span>
        </TopNavElement.Title>
      </>
    ),
    right: <TopNavElement.MoreButton onClick={dropUpExit} />,
  });

  const handleExitButton = () => {
    dropDownExit();
    navigate(ROUTE.CHAT);
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => lastChatRef.current.scrollIntoView({ block: "end" }),
      100
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <DropdownModal isDroppedUp={isExitDroppedUp} dropDown={dropDownExit}>
        <DropdownModal.Button onClick={handleExitButton}>
          채팅방 나가기
        </DropdownModal.Button>
      </DropdownModal>
      <ChatRoomWrapper>
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
            <img src={SnappyMarkGrey} alt="" className="snappyMark" />
            <p className="time">1:13</p>
          </div>
        </UserChat>
        <SnappyImgChatWrapper>
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
        </SnappyImgChatWrapper>
        <SnappyImgChatWrapper>
          <div className="polaroid">
            <p className="chat">
              <img
                src={ChatSampleImg2}
                alt="결혼 촬영 이미지입니다"
                className="chatSampleImg"
              />
            </p>
            <img src={SnappyMarkBlue} alt="" className="snappyMark" />
            <p className="time">1:20</p>
          </div>
        </SnappyImgChatWrapper>
        <SnappyChatWrapper id="last-chat">
          <div className="polaroid">
            <p className="chat">
              편하게 보시고 더 궁금하신 점 있으시면, 문의 남겨놓아주세요.
              좋은하루 되세요!
            </p>
            <img src={SnappyMarkBlue} alt="" className="snappyMark" />
            <p ref={lastChatRef} className="time">
              1:25
            </p>
          </div>
        </SnappyChatWrapper>
        <CommentForm
          left={
            <ImageUploadBtn type="button">
              <Icons.Image
                className="ImageUploader"
                title="채팅 이미지 업로드 버튼입니다."
              />
            </ImageUploadBtn>
          }
          right={<button type="button">전송</button>}
          onSubmit={(event) => event.preventDefault()}
        />
      </ChatRoomWrapper>
    </>
  );
}
