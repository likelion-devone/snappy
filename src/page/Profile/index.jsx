import Icons from "asset/icon/icons";
import styled, { css } from "styled-components";
import { AlbumView, ListView } from "component/Profile/AlbumListView";
import { useState } from "react";
import data from "./data.json";
import BigProfile from "component/common/BigProfile/index";
import {
  FollowerCounter,
  FollowingCounter,
} from "component/common/BigProfile/FollowCounter/index";
import Button from "component/common/Button/index";
import { BUTTON_SIZE } from "constant/size";
import { BUTTON_STATE } from "constant/button_state";
import ProductList from "component/Profile/ProductList/index";
import { Link } from "react-router-dom";
import ROUTE from "constant/route";
import theme from "style/theme";
import portfolio from "asset/portfolio.png";

const Gobacknav = styled.div`
  height: 48px;
  border: 2px solid black;
`;
const StyleBigProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  .username {
    margin-top: 16px;
    margin-bottom: 6px;
    font-weight: 700;
  }

  .accountname {
    font-weight: 400px;
    color: ${(props) => props.theme.snGreyIcon};
    margin-bottom: 16px;
  }

  .intro {
    color: ${(props) => props.theme.snGreyIcon};
    margin-bottom: 24px;
  }
`;

const ChatLink = styled(Link)`
  width: 34px;
  height: 34px;
  border: 1px solid ${(props) => props.theme.snGreyOff};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  .messageCircle {
    width: 20px;
    height: 20px;
  }
`;

const ShareLink = styled(Link)`
  width: 34px;
  height: 34px;
  border: 1px solid ${(props) => props.theme.snGreyOff};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  .shareCircle {
    width: 20px;
    height: 20px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 26px;
`;

const Box1 = styled.div`
  height: 100px;
  border: 4px solid ${(props) => props.theme.snBlue};
`;
const Portfolio = styled.img`
  display: block;
  margin: auto;
  width: 500px;
`;
const Box2 = styled.div`
  height: 450px;
  background-color: ${(props) => props.theme.snBlue};
`;
const Box3 = styled.div`
  border: 1px solid grey;
`;
const IconBox = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 20px;
  width: fit-content;
  height: 44px;
`;

const IconList = styled(Icons.PostList)`
  margin-top: 12.25px;
  margin-right: 22.5px;
  path {
    fill: ${({ $isListActive, theme }) =>
      $isListActive ? theme.snGreyIcon : theme.snGreyOff};
    stroke: ${({ $isListActive, theme }) =>
      $isListActive ? theme.snGreyIcon : theme.snGreyOff};
  }
`;

const IconAlbum = styled(Icons.PostAlbum)`
  margin-top: 12.25px;
  path {
    fill: ${({ $isAlbumActive, theme }) =>
      $isAlbumActive ? theme.snGreyIcon : theme.snGreyOff};
    stroke: ${({ $isAlbumActive, theme }) =>
      $isAlbumActive ? theme.snGreyIcon : theme.snGreyOff};
  }
`;

function ProfilePage() {
  const [ViewOption, setViewOption] = useState(true);
  const [isListActive, setIsListActive] = useState(true);

  const ShowListView = () => {
    setViewOption(true);
    setIsListActive(true);
  };

  const ShowAlbumView = () => {
    setViewOption(false);
    setIsListActive(false);
  };

  return (
    <>
      <Gobacknav></Gobacknav>
      <StyleBigProfile>
        <BigProfile
          left={<FollowerCounter />}
          right={<FollowingCounter />}
          bottomRight={<button type="button">업로드</button>}
        />
        <p className="username">애월읍 YK 포토그래퍼</p>
        <p className="accountname">@yksnap</p>
        <p className="intro">진심을 담은 사진 속 주인공은 언제나 당신</p>
        <Wrapper>
          <ChatLink to={ROUTE.CHAT}>
            <Icons.MessageCircle className="messageCircle" />
          </ChatLink>
          <Button
            size={BUTTON_SIZE.LARGE_34}
            state={BUTTON_STATE.ABLED}
            callbacks={{
              abled: () => {
                console.log("팔로우 되었습니다.");
              },
            }}
          >
            팔로우
          </Button>
          <ShareLink to={ROUTE.POST}>
            <Icons.Share className="shareCircle" />
          </ShareLink>
        </Wrapper>
      </StyleBigProfile>
      <Box1>
        <Portfolio className="" src={portfolio}></Portfolio>
      </Box1>
      <Box2>
        <ProductList photodata={data}></ProductList>
      </Box2>

      <IconBox>
        <button type="button" onClick={ShowListView}>
          <IconList $isListActive={isListActive} />
        </button>
        <button type="button" onClick={ShowAlbumView}>
          <IconAlbum $isAlbumActive={!isListActive} />
        </button>
      </IconBox>
      {ViewOption ? (
        <ListView photodata={data} />
      ) : (
        <AlbumView photodata={data} />
      )}
    </>
  );
}

export default ProfilePage;
