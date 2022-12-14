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

    return result.message === "?????? ????????? ??????ID ?????????." &&
      value !== initialProfileData.accountname
      ? result
      : { message: "?????? ????????? ??????ID ?????????." };
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
      alert("10MB??? ?????? ???????????? ???????????? ??? ????????????.");
      labelImageForUploadRef.current.value = "";
      return;
    }

    fileReader.readAsDataURL(labelImageForUploadRef.current.files[0]);
  };

  /**
   * onSubmit ????????? ????????? validation??? ???????????? ??????
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
      accountnameValidationErrorMessage === "?????? ????????? ??????ID ?????????."
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
   * initialProfileData??? ?????? ?????? setting?????? effect
   * edit?????? form??? ????????? ????????? ?????? ???????????????.
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
          labelText="????????? ??????"
          placeholder="2~10??? ???????????? ?????????."
        />
        <ValidationInputWrapper.ErrorMessage />
      </ValidationInputWrapper>
      <ValidationInputWrapper errorMessage={accountnameValidationErrorMessage}>
        <ValidationInputWrapper.Input
          ref={accountnameRef}
          id="accountname"
          name="accountname"
          type="text"
          labelText="?????? ID"
          placeholder="??????, ??????, ????????????(.),(_)??? ?????? ???????????????."
        />
        <ValidationInputWrapper.ErrorMessage
          $isValid={
            accountnameValidationErrorMessage === "?????? ????????? ??????ID ?????????."
          }
        />
      </ValidationInputWrapper>
      <LabeledInput
        ref={introRef}
        id="intro"
        name="intro"
        type="text"
        labelText="??????"
        placeholder="????????? ??????????????????."
      />
    </Form>
  );
}

ProfileForm.propTypes = {
  formId: PropTypes.string.isRequired,
  initialProfileData: PropTypes.object,
  dispatchProfileData: PropTypes.func.isRequired,
};
