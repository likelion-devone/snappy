import SmallProfile from "component/common/SmallProfile/index";
import { PROFILE_SIZE } from "constant/size";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileImg from "asset/profile-img-42.png";

const ChatList = styled.ul`
  width: min(800px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    border: 1px solid red;
    margin-bottom: 16px;
  }
  li:last-child {
    margin-right: 0px;
  }
`;
const Time = styled.p`
  color: ${(props) => props.theme.snGreyOff};
  font-size: x-small;
  line-height: 13px;
  font-weight: 400;
  align-self: flex-end;
`;

export default function ChatPage() {
  return (
    <>
      <ChatList>
        <li>
          <Link to="/chat/chatroom">
            <SmallProfile
              src={ProfileImg}
              size={PROFILE_SIZE.SMALL}
              isNotifying={true}
            >
              <SmallProfile.Side
                left={
                  <SmallProfile.Side.Title
                    title="최고의 사진작가 "
                    subtitle="세상에서 가장 자연스러운 일상을 담아드립니다."
                    gap={6}
                  />
                }
                right={<Time>2020.10.25</Time>}
              />
            </SmallProfile>
          </Link>
        </li>
        <li>
          <SmallProfile
            src="please fill here"
            size={PROFILE_SIZE.SMALL}
            isNotifying={true}
            imageTo="/image"
          >
            <SmallProfile.Side
              left={
                <SmallProfile.Side.Title
                  title="어나더 스냅 스튜디오"
                  subtitle="70-200mm 망원렌즈를 활용하여 포커싱 아웃된 생동감 있고 드라마틱한 여러분들의 모습을 감도있게 촬영해드립니다."
                  gap={6}
                  titleTo="/title"
                  attachment={<time>5분전</time>}
                />
              }
              right={
                <time
                  style={{
                    color: "#DBDBDB",
                    fontSize: "10px",
                    lineHeight: "13px",
                    fontWeight: "400",
                    alignSelf: "flex-end",
                  }}
                >
                  {/* TODO style component fontsize use theme, fontsize  */}
                  2020.10.25
                </time>
              }
            />
          </SmallProfile>
        </li>
      </ChatList>
    </>
  );
}
