import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { AlbumView, ListView } from "component/Profile/AlbumListView";
import BigProfile from "component/common/BigProfile/index";
import {
  FollowerLink,
  FollowingLink,
} from "component/common/BigProfile/FollowLink";
import Button from "component/common/Button/index";
import ProductList from "component/Profile/ProductList/index";
import { PostDataContext } from "component/common/PostDataProvider/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";
import { AlertModal, DropdownModal } from "component/common/Modal/index";

import useFetch from "hook/useFetch";
import useTopNavSetter from "hook/useTopNavSetter";
import useDropdownModal from "hook/useDropdownModal";
import useModal from "hook/useModal";

import { req } from "lib/api/index";
import { AuthContext } from "lib/auth/AuthProvider/index";
import routeResolver from "util/routeResolver";

import Icons from "asset/icon/icons";
import PortfolioTitleImg from "asset/title-portfolio.png";

import ROUTE, { ROUTE_PRODUCT, ROUTE_PROFILE } from "constant/route";
import { BUTTON_SIZE } from "constant/size";
import { BUTTON_STATE } from "constant/button_state";
import { FONT_SIZE } from "constant/style";
import FollowButton from "../FollowButton/index";

const StyleBigProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  .username {
    display: block;
    margin-top: 16px;
    margin-bottom: 6px;
    font-weight: 700;
    font-size: ${FONT_SIZE.LARGE};
    line-height: 20px;
  }

  .accountname {
    font-weight: 400;
    font-size: ${FONT_SIZE.MEDIUM};
    line-height: 14px;
    color: ${(props) => props.theme.snGreyIcon};
    margin-bottom: 16px;
  }

  .intro {
    color: ${(props) => props.theme.snGreyIcon};
    margin-bottom: 24px;
    font-weight: 400;
    font-size: ${FONT_SIZE.BASE};
    line-height: 18px;
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

  .shareCircle {
    width: 20px;
    height: 20px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 26px;

  gap: 10px;
`;

const CurrentPortfolio = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.snBlue};
  .title {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.snWhite};
    border: 3px solid ${(props) => props.theme.snBlue};
    text-align: center;
  }
`;

const Portfolio = styled.img`
  width: 300px;
`;

const IconBox = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 20px;
  width: fit-content;
  height: 44px;
`;

const NoPostIndicator = styled.p`
  margin-top: 100px;

  text-align: center;
  font-weight: 400;
  font-size: ${FONT_SIZE.BASE};
  line-height: 14px;

  color: ${({ theme }) => theme.snGreyIcon};
`

const IconList = styled(Icons.PostList)`
  margin-top: 12.25px;
  margin-right: 22.5px;
  path {
    fill: ${({ $isListActive, theme }) =>
    $isListActive ? theme.snBlue : theme.snGreyOff};
    stroke: ${({ $isListActive, theme }) =>
    $isListActive ? theme.snBlue : theme.snGreyOff};
  }
`;

const IconAlbum = styled(Icons.PostAlbum)`
  margin-top: 12.25px;
  path {
    fill: ${({ $isAlbumActive, theme }) =>
    $isAlbumActive ? theme.snBlue : theme.snGreyOff};
    stroke: ${({ $isAlbumActive, theme }) =>
    $isAlbumActive ? theme.snBlue : theme.snGreyOff};
  }
`;

const StyledButtonForLink = styled(Button)`
  line-height: 34px;
  text-align: center;
`

function LinkButton({ to, children }) {
  return (
    <StyledButtonForLink
      as={Link}
      size={BUTTON_SIZE.LARGE_34}
      state={BUTTON_STATE.LARGE_34.ACTIVATED}
      to={to}
    >
      {children}
    </StyledButtonForLink>
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

function PageDetails({ accountname, $isMyProfile = false }) {
  const navigate = useNavigate();
  const { userPostData, userPostDataError, isUserPostDataLoading, getUserPostData } = useContext(PostDataContext);
  const { handleLogout } = useContext(AuthContext);


  const [isProfileMoreModalOpened, openProfileMoreModal, closeProfileMoreModal] = useDropdownModal();
  const [isLogoutAlertModalOpened, openLogoutAlertModal, closeLogoutAlertModal, confirmLogoutAlertModal] = useModal(handleLogout);

  useTopNavSetter({
    title: "프로필 페이지",
    left: <TopNavElement.GoBackButton />,
    right: (
      <TopNavElement.MoreButton onClick={openProfileMoreModal} />
    )
  });

  const [viewOption, setViewOption] = useState(true);
  const [isListActive, setIsListActive] = useState(true);

  const [isProfileDataLoading, profileData, profileDataError] = useFetch(
    req.profile.personalProfile,
    { accountname }
  );

  const [isProductLoading, productData, productDataError] = useFetch(
    req.product.load,
    { accountname }
  );

  useEffect(() => {
    getUserPostData({ accountname });
  }, [getUserPostData, accountname])

  useEffect(() => {
    if (profileDataError || productDataError || userPostDataError) {
      navigate("404");
    }
  }, [profileDataError, productDataError, userPostDataError, navigate]);

  if (isProfileDataLoading || isProductLoading || isUserPostDataLoading || !userPostData) {
    return <>로딩중</>;
  }

  const ShowListView = () => {
    setViewOption(true);
    setIsListActive(true);
  };

  const ShowAlbumView = () => {
    setViewOption(false);
    setIsListActive(false);
  };

  const { profile } = profileData;

  return (
    <>
      <StyleBigProfile>
        <BigProfile
          src={profile.image}
          left={
            <FollowerLink
              count={profile.followerCount.toString()}
              to={routeResolver(
                ROUTE.PROFILE,
                accountname,
                ROUTE_PROFILE.FOLLOWER
              )}
            />
          }
          right={
            <FollowingLink
              count={profile.followingCount.toString()}
              to={routeResolver(
                ROUTE.PROFILE,
                accountname,
                ROUTE_PROFILE.FOLLOWING
              )}
            />
          }
        />
        <strong className="username">{profile.username}</strong>
        <p className="accountname">@ {profile.accountname}</p>
        <p className="intro">{profile.intro}</p>
        <Wrapper>
          {$isMyProfile ? (
            <>
              <LinkButton
                to={routeResolver(ROUTE.PROFILE, ROUTE_PROFILE.EDIT)}
              >
                프로필 수정
              </LinkButton>
              <LinkButton
                to={routeResolver(ROUTE.PRODUCT, ROUTE_PRODUCT.ADD)}
              >
                상품 등록
              </LinkButton>
            </>
          ) : (
            <>
              <ChatLink to={ROUTE.CHAT}>
                <Icons.MessageCircle title="채팅" className="messageCircle" />
              </ChatLink>
              <FollowButton initialIsFollowing={profile.isfollowing} accountname={accountname} $isSizeLarge34={true} />
              <ShareLink as="button" onClick={() => alert("공유 기능 개발중")}>
                <Icons.Share title="공유" className="shareCircle" />
              </ShareLink>
            </>
          )}
        </Wrapper>
      </StyleBigProfile>

      <CurrentPortfolio>
        <h2 className="title">
          <Portfolio src={PortfolioTitleImg} />
        </h2>
        <ProductList
          productData={isProductLoading ? [] : productData.product}
        />
      </CurrentPortfolio>

      <section>
        <h2 className="sr-only">포스트 리스트</h2>
        <IconBox>
          <button type="button" onClick={ShowListView}>
            <IconList $isListActive={isListActive} />
          </button>
          <button type="button" onClick={ShowAlbumView}>
            <IconAlbum $isAlbumActive={!isListActive} />
          </button>
        </IconBox>
        <ListView
          postData={isUserPostDataLoading ? [] : userPostData}
          visible={viewOption}
        />
        <AlbumView
          postData={isUserPostDataLoading ? [] : userPostData}
          visible={!viewOption}
        />
        {userPostData.length === 0 &&
          <NoPostIndicator>아직 포스트가 없습니다.</NoPostIndicator>
        }
      </section>

      <DropdownModal dropDown={closeProfileMoreModal} isDroppedUp={isProfileMoreModalOpened}>
        <DropdownModal.Button onClick={openLogoutAlertModal}>
          로그아웃
        </DropdownModal.Button>
      </DropdownModal>
      <AlertModal isModalOpened={isLogoutAlertModalOpened}>
        <AlertModal.Content>로그아웃 하시겠스내피? 📷</AlertModal.Content>
        <AlertModal.Cancle handleModalButton={closeLogoutAlertModal}>취소</AlertModal.Cancle>
        <AlertModal.ConfirmButton handleModalButton={confirmLogoutAlertModal}>로그아웃</AlertModal.ConfirmButton>
      </AlertModal>
    </>
  );
}

PageDetails.propTypes = {
  accountname: PropTypes.string.isRequired,
  $isMyProfile: PropTypes.bool,
};

export default PageDetails;
