import { createContext, useReducer, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ProfileForm } from "component/common/Form";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import useAuthInfo from "hook/useAuthInfo";
import useFetch from "hook/useFetch";
import useAPI from "hook/useAPI";
import useTopNavSetter from "hook/useTopNavSetter";

import { req } from "lib/api/index";

import ROUTE from "constant/route";
import { LoaderNappy } from "component/common/Animation/index";

const StyledProfileForm = styled(ProfileForm)`
  margin-top: 15px;
`

/**
 * @typedef {Object} ProfileData
 * @property {string} username;
 * @property {string} accountname;
 * @property {string} intro;
 * @property {string} image;
 */

/**
 * @type {React.Context<{profileData: ProfileData, dispatchProfileData: React.DispatchWithoutAction}>}
 */
export const ProfileFormContext = createContext();

const profileDataReducer = (state, action) => {
  switch (action.type) {
    case "username":
      return {
        ...state,
        username: action.payload,
      }
    case "accountname":
      return {
        ...state,
        accountname: action.payload,
      }
    case "intro":
      return {
        ...state,
        intro: action.payload,
      }
    case "image":
      return {
        ...state,
        image: action.payload
      }
    default:
      throw Error("profileData reducer 오류");
  }
}

export default function ProfileEditPage() {
  const navigate = useNavigate();

  const { accountname } = useAuthInfo();
  const [isInitialProfileDataLoading, initialProfileData, initialProfileDataError] = useFetch(req.profile.personalProfile, { accountname });
  const [isProfileEditing, editProfileResult, editProfileError, editProfile] = useAPI(req.profile.editProfile)

  const [profileData, dispatchProfileData] = useReducer(profileDataReducer, null);

  const UploadButton = useMemo(
    () => (
      <TopNavElement.Button form="profileForm" $isAbled={!isProfileEditing}>
        저장
      </TopNavElement.Button>
    ),
    [isProfileEditing]
  );

  const { setTopNavRight } = useTopNavSetter({
    title: "프로필 수정 페이지",
    left: <TopNavElement.GoBackButton />,
    right: UploadButton
  })

  useEffect(() => {
    setTopNavRight(UploadButton);
  }, [setTopNavRight, UploadButton]);

  useEffect(() => {
    if (initialProfileDataError) {
      navigate(ROUTE.PROFILE);
    }
  }, [initialProfileDataError, navigate])

  useEffect(() => {
    if (profileData) {
      if (Object.keys(profileData).every((key) => initialProfileData.profile[key] === profileData[key])) {
        alert("수정된 내역이 없습니다.");
        return;
      }
      editProfile(profileData);
    }
  }, [initialProfileData, profileData, editProfile]);

  useEffect(() => {
    if (editProfileResult) {
      alert("프로필을 수정했습니다.");
      navigate(ROUTE.PROFILE);
    }
    if (editProfileError) {
      alert("프로필 수정중 에러가 발생했습니다.");
    }
  }, [editProfileResult, editProfileError, navigate]);

  if (isInitialProfileDataLoading) {
    return <LoaderNappy />;
  }

  return <StyledProfileForm formId="profileForm" initialProfileData={initialProfileData.profile} dispatchProfileData={dispatchProfileData} />
}