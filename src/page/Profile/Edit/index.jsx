import { createContext, useReducer, useEffect } from "react";
import ProfileForm from "component/common/Form/ProfileForm/index";
import useAuthInfo from "hook/useAuthInfo";
import useFetch from "hook/useFetch";
import { req } from "lib/api/index";
import useAPI from "hook/useAPI";
import { useNavigate } from "react-router-dom";
import ROUTE from "constant/route";

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

  useEffect(() => {
    if (initialProfileDataError) {
      navigate(ROUTE.PROFILE);
    }
  }, [initialProfileDataError, navigate])

  useEffect(() => {
    if (isProfileEditing) {
      alert("프로필 수정중입니다. 잠시 기다려주세요.");
      return;
    }
    if (profileData) {
      if (Object.keys(initialProfileData).every((key) => initialProfileData[key] === profileData[key])) {
        alert("수정된 내역이 없습니다.");
        return;
      }
      editProfile(profileData);
    }
  }, [isProfileEditing, initialProfileData, profileData, editProfile]);

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
    return <>로딩중</>;
  }

  return (
    <>
      <button type="submit" form="profileForm">제출하기</button>
      <ProfileForm formId="profileForm" initialProfileData={initialProfileData.profile} dispatchProfileData={dispatchProfileData} />
    </>
  )
}