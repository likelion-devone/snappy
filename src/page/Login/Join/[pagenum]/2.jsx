import { useRef, useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import BigProfile from "component/common/BigProfile";
import Button from "component/common/Button";
import { LabeledInput, ValidationInputWrapper } from "component/common/Input";
import LoginLayout from "component/Login/Layout";
import { BUTTON_STATE } from "constant/button_state";
import { BUTTON_SIZE } from "constant/size";
import useAPI from "hook/useAPI";
import useValidationInput from "hook/useValidationInput";
import { req } from "lib/api";
import { JoinDataContext } from "..";
import routeResolver from "util/routeResolver";
import { useNavigate } from "react-router-dom";
import ROUTE, { ROUTE_LOGIN } from "constant/route";
import { AuthContext } from "lib/auth/AuthProvider";

const validateUsernameOnLocal = (str) => {
  if (!str) {
    return "사용자 이름을 입력해주세요."
  }

  if (str.length < 2 || str.length > 10) {
    return "2~10자 이내여야 합니다."
  }

  return "";
}
const validateAccountnameOnLocal = (str) => {
  if (!str) {
    return "계정 ID를 입력해주세요."
  }

  if (/[^a-zA-Z0-9._]/.test(str)) {
    return "영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다."
  }

  return "";
}

const JoinForm = styled.form`
  margin-top: 30px;
  text-align: center;

  button {
    margin-top: 30px;
  }
`

export default function JoinPageTwo() {
  const labelImageForUploadRef = useRef(null);
  const inpIntro = useRef(null);
  const navigate = useNavigate();

  const [profileSrc, setProfileSrc] = useState(process.env.REACT_APP_DEFAULT_PROFILE);
  const { joinData, dispatchJoinData } = useContext(JoinDataContext);
  const { handleLogin } = useContext(AuthContext);

  const [isAccountnameValidationLoading, accountnameValidationResult, _accountnameValidationError, validateAccountnameOnServer] = useAPI(req.noAuth.user.checkAccountname);
  const [isImageUploading, _uploadImageResult, _uploadImageError, uploadImage] = useAPI(req.noAuth.image.uploadfile);
  const [isUserCreating, createUserResult, createUserError, createUser] = useAPI(req.noAuth.user.create);

  const validateAccountname = async (value) => {
    const accountnameCheckedOnLocal = validateAccountnameOnLocal(value);
    if (accountnameCheckedOnLocal) {
      return { message: accountnameCheckedOnLocal };
    }

    return await validateAccountnameOnServer({ accountname: value });
  }

  const [usernameRef, handleUsernameValidation, usernameValidationErrorMessage, isUsernameValidationPassed] = useValidationInput(validateUsernameOnLocal);
  const [accountnameRef, handleAccountnameValidation, accountnameValidationErrorMessage, _] = useValidationInput(validateAccountname);

  const fileReader = new FileReader();
  fileReader.onload = (event) => setProfileSrc(event.target.result);

  const handleLoadImageToUpload = () => {
    if (labelImageForUploadRef.current.files[0].size > 10_000_000) {
      alert("10MB가 넘는 이미지는 업로드할 수 없습니다.");
      labelImageForUploadRef.current.value = "";
      return;
    }

    fileReader.readAsDataURL(labelImageForUploadRef.current.files[0]);
  };

  useEffect(() => {
    console.log(joinData);
    if (joinData.email && joinData.password && joinData.accountname && joinData.image && joinData.username) {
      console.log('패스');
      createUser(joinData);
    } else if (!joinData.email || !joinData.password) {
      navigate(routeResolver(ROUTE.LOGIN, ROUTE_LOGIN.JOIN, "1"));
    }
  }, [joinData, navigate, createUser]);

  useEffect(() => {
    if (createUserResult) {
      const { email, password } = joinData;

      handleLogin({ email, password });
      return;
    }

    if (createUserError) {
      console.log(createUserError);
      dispatchJoinData({ type: "reset" });
      navigate(routeResolver(ROUTE.LOGIN, ROUTE_LOGIN.JOIN, "1"));
    }
  }, [createUserResult, createUserError, handleLogin, joinData, dispatchJoinData, navigate])

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUsernameValidation();
    handleAccountnameValidation();
  };

  const handleUploadImage = useCallback(async () => {
    const formData = new FormData();
    formData.append("image", labelImageForUploadRef.current.files[0]);
    const result = await uploadImage({ formData });

    dispatchJoinData({ type: "image", payload: process.env.REACT_APP_BASE_API + result.filename })
  }, [dispatchJoinData, uploadImage]);


  useEffect(() => {
    if (isUsernameValidationPassed && (accountnameValidationResult && accountnameValidationErrorMessage === "사용 가능한 계정ID 입니다.")) {
      dispatchJoinData({ type: "username", payload: usernameRef.current.value });
      dispatchJoinData({ type: "accountname", payload: accountnameRef.current.value });
      dispatchJoinData({ type: "intro", payload: inpIntro.current.value });

      if (!labelImageForUploadRef.current.files.length) {
        dispatchJoinData({ type: "image", payload: process.env.REACT_APP_DEFAULT_PROFILE });
      } else {
        handleUploadImage();
      }
    }
  }, [isUsernameValidationPassed, accountnameValidationResult,
    accountnameValidationErrorMessage, dispatchJoinData, usernameRef, accountnameRef, inpIntro, handleUploadImage]);

  return (
    <LoginLayout title="프로필 설정" subtitle="나중에 언제든지 변경할 수 있습니다.">
      <BigProfile
        src={profileSrc}
        bottomRight={
          <BigProfile.UploadLabel ref={labelImageForUploadRef} onChange={handleLoadImageToUpload} />
        }
      />
      <JoinForm onSubmit={handleSubmit}>
        <ValidationInputWrapper errorMessage={usernameValidationErrorMessage}>
          <ValidationInputWrapper.Input ref={usernameRef} id="username" type="text" labelText="사용자 이름" placeholder="2~10자 이내여야 합니다." />
          <ValidationInputWrapper.ErrorMessage />
        </ValidationInputWrapper>
        <ValidationInputWrapper errorMessage={accountnameValidationErrorMessage}>
          <ValidationInputWrapper.Input ref={accountnameRef} id="accountname" type="text" labelText="계정 ID" placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다." />
          <ValidationInputWrapper.ErrorMessage $isValid={accountnameValidationErrorMessage === "사용 가능한 계정ID 입니다."} />
        </ValidationInputWrapper>
        <LabeledInput ref={inpIntro} id="intro" type="text" labelText="소개" placeholder="자신을 소개해주세요." />
        <Button size={BUTTON_SIZE.X_LARGE} state={isAccountnameValidationLoading || isImageUploading || isUserCreating ? BUTTON_STATE.X_LARGE.DISABLED : BUTTON_STATE.X_LARGE.ABLED} type="submit">Snappy 시작하기 📷</Button>
      </JoinForm>
    </LoginLayout>
  )
}