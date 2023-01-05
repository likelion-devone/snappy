import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import BigProfile from "component/common/BigProfile";
import { LabeledInput, ValidationInputWrapper } from "component/common/Input";

import useAPI from "hook/useAPI";
import useValidationInput from "hook/useValidationInput";

import { req } from "lib/api";
import {
  validateUsername as validateUsernameOnLocal,
  validateAccountname as validateAccountnameOnLocal,
} from "util/validation";
import isBlobUrl from "util/isBlobUrl";

const Form = styled.form`
  margin-bottom: 30px;
`;

const StyledBigProfile = styled(BigProfile)`
  margin-bottom: 30px;
`;

/**
 * @typedef {Object} ProfileFormParam
 * @property {string} formId
 * @property {import('./ProfileFormContextProvider/index').ProfileData} initialProfileData
 * @property {React.DispatchWithoutAction} dispatchProfileData
 */

/**
 *
 * @param {ProfileFormParam} param
 * @returns
 */
export default function ProfileForm({
  formId,
  initialProfileData,
  dispatchProfileData,
  ...props
}) {
  const labelImageForUploadRef = useRef(null);
  const introRef = useRef(null);
  /**
   * @type {React.MutableRefObject<import('./ProfileFormContextProvider').ProfileData>}
   */
  const submittedProfileDataRef = useRef(null);

  const [profileSrc, setProfileSrc] = useState(
    initialProfileData?.image || process.env.REACT_APP_DEFAULT_PROFILE
  );

  const [
    _isAccountnameValidationLoading,
    accountnameValidationResult,
    _accountnameValidationError,
    validateAccountnameOnServer,
  ] = useAPI(req.noAuth.user.checkAccountname);

  const [
    _isImageUploading,
    _uploadImageResult,
    _uploadImageError,
    uploadImage,
  ] = useAPI(req.noAuth.image.uploadfile);

  const validateAccountname = async (value) => {
    const accountnameCheckedOnLocal = validateAccountnameOnLocal(value);
    if (accountnameCheckedOnLocal) {
      return { message: accountnameCheckedOnLocal };
    }

    const result = await validateAccountnameOnServer({ accountname: value });

    if (!initialProfileData) {
      return result;
    }

    return result.message === "이미 가입된 계정ID 입니다." &&
      value !== initialProfileData.accountname
      ? result
      : { message: "사용 가능한 계정ID 입니다." };
  };

  const [
    usernameRef,
    handleUsernameValidation,
    usernameValidationErrorMessage,
    isUsernameValidationPassed,
  ] = useValidationInput(validateUsernameOnLocal);

  const [
    accountnameRef,
    handleAccountnameValidation,
    accountnameValidationErrorMessage,
    _,
  ] = useValidationInput(validateAccountname);

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

  /**
   * onSubmit 이벤트 발생시 validation을 호출하는 함수
   * @type {React.FormEventHandler<HTMLFormElement>}
   */
  const validateValues = (event) => {
    event.preventDefault();
    handleUsernameValidation();
    handleAccountnameValidation();
    submittedProfileDataRef.current = {
      username: event.target.username.value,
      accountname: event.target.accountname.value,
      intro: event.target.intro.value,
    };
  };

  const handleUploadImage = useCallback(async () => {
    const formData = new FormData();
    formData.append("image", labelImageForUploadRef.current.files[0]);
    const result = await uploadImage({ formData });

    return process.env.REACT_APP_BASE_API + result.filename;
  }, [uploadImage]);

  const handleFormSubmit = useCallback(async () => {
    if (isBlobUrl(profileSrc)) {
      submittedProfileDataRef.current.image = await handleUploadImage();
    } else {
      submittedProfileDataRef.current.image = profileSrc;
    }

    const { accountname, image, intro, username } =
      submittedProfileDataRef.current;

    dispatchProfileData({ type: "username", payload: username });
    dispatchProfileData({ type: "accountname", payload: accountname });
    dispatchProfileData({ type: "intro", payload: intro });
    dispatchProfileData({ type: "image", payload: image });
  }, [profileSrc, handleUploadImage, dispatchProfileData]);

  useEffect(() => {
    if (
      isUsernameValidationPassed &&
      accountnameValidationResult &&
      accountnameValidationErrorMessage === "사용 가능한 계정ID 입니다."
    ) {
      handleFormSubmit();
    }
  }, [
    isUsernameValidationPassed,
    accountnameValidationResult,
    accountnameValidationErrorMessage,
    profileSrc,
    handleUploadImage,
    handleFormSubmit,
  ]);

  /**
   * initialProfileData가 있을 경우 setting하는 effect
   * edit으로 form을 사용할 경우를 위한 코드입니다.
   */
  useLayoutEffect(() => {
    if (initialProfileData) {
      const { accountname, intro, username } = initialProfileData;
      introRef.current.value = intro;
      usernameRef.current.value = username;
      accountnameRef.current.value = accountname;
    }
  }, [initialProfileData, introRef, usernameRef, accountnameRef]);

  return (
    <Form id={formId} onSubmit={validateValues} autoComplete="off" {...props}>
      <StyledBigProfile
        src={profileSrc}
        bottomRight={
          <BigProfile.UploadLabel
            ref={labelImageForUploadRef}
            onChange={handleLoadImageToUpload}
          />
        }
      />
      <ValidationInputWrapper errorMessage={usernameValidationErrorMessage}>
        <ValidationInputWrapper.Input
          ref={usernameRef}
          id="username"
          name="username"
          type="text"
          labelText="사용자 이름"
          placeholder="2~10자 이내여야 합니다."
        />
        <ValidationInputWrapper.ErrorMessage />
      </ValidationInputWrapper>
      <ValidationInputWrapper errorMessage={accountnameValidationErrorMessage}>
        <ValidationInputWrapper.Input
          ref={accountnameRef}
          id="accountname"
          name="accountname"
          type="text"
          labelText="계정 ID"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
        />
        <ValidationInputWrapper.ErrorMessage
          $isValid={
            accountnameValidationErrorMessage === "사용 가능한 계정ID 입니다."
          }
        />
      </ValidationInputWrapper>
      <LabeledInput
        ref={introRef}
        id="intro"
        name="intro"
        type="text"
        labelText="소개"
        placeholder="자신을 소개해주세요."
      />
    </Form>
  );
}

ProfileForm.propTypes = {
  formId: PropTypes.string.isRequired,
  initialProfileData: PropTypes.object,
  dispatchProfileData: PropTypes.func.isRequired,
};
