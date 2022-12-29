import styled from "styled-components";

import SmallProfile from "component/common/SmallProfile/index";
import AddedImgList from "component/common/AddedImgList/index";
import IsUploadPossibleProvider from "component/Post/IsUploadPossibleProvider/index";
import ImgDataProvider from "component/Post/ImgDataProvider/index";
import TextArea from "component/Post/TextArea/index";
import LabelImgUpload from "component/Post/LabelImgUpload/index";

import { PROFILE_SIZE } from "constant/size";
import ROUTE from "constant/route";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAPI from "hook/useAPI";
import { req } from "lib/api/index";
import routeResolver from "util/routeResolver";
import useAuthInfo from "hook/useAuthInfo";

const PostUploadWrapper = styled.div`
  position: relative;
`;

const FormSection = styled.form`
  margin: 20px 16px 0;
  display: flex;
`;

// 업로드 파일 인풋 숨기기
const HiddenUploadFileInput = styled.input`
  display: none;
`;

const SIZE_LIMIT = 10 * 1024 * 1024;

export default function PostUploadPage() {
  const [imgData, setImgData] = useState([]);

  // 이미지 업로드 API
  const [
    _isImageUploading,
    _imageUploadResponse,
    _imageUploadError,
    uploadImages,
  ] = useAPI(req.noAuth.image.uploadfiles);

  // 게시물 업로드 API
  const [isPostUploading, uploadPostResponse, uploadPostError, createPost] =
    useAPI(req.post.create);

  // 게시물 업로드 후 HOME 으로 경로 이동
  const navigate = useNavigate();

  const inpImagesRef = useRef(null);
  const textareaRef = useRef(null);
  const { image: profileImage, accountname } = useAuthInfo();

  // 업로드 파일 인풋 onChange 이벤트
  const handleUploadFile = (event) => {
    const imgFileList = event.target.files;
    const imgCount = imgData.length;
    const imgList = [];

    // 이미지 파일 용량, 개수 제한
    for (const file of imgFileList) {
      if (file.size > SIZE_LIMIT) {
        alert("10MB 이상의 이미지는 업로드 할 수 없습니다.");
        return;
      }
      if (imgCount > 2) {
        alert("3개 이하의 파일을 업로드 하세요.");
        return;
      }

      imgList.push(URL.createObjectURL(file));
    }
    setImgData(imgList);
  };

  // 상단 Nav 업로드 버튼 onClick 이벤트
  const handleSubmitPost = async (event) => {
    event.preventDefault();
    if (isPostUploading) {
      return;
    }

    if (inpImagesRef.current.files.length !== 0) {
      const formData = new FormData();

      [...inpImagesRef.current.files].forEach((file) => {
        formData.append("image", file);
      });

      const results = await uploadImages({ formData: formData });

      return createPost({
        content: textareaRef.current.value,
        image: results
          .map((result) => process.env.REACT_APP_BASE_API + result.filename)
          .join(","),
      });
    }

    createPost({
      content: textareaRef.current.value,
      image: "",
    });
  };

  useEffect(() => {
    // 게시물 업로드 전
    if (uploadPostError) {
      console.log(uploadPostError);
      alert("게시물 업로드를 실패했습니다.");
      return;
    }
    // 게시물 업로드 완료 후
    if (uploadPostResponse) {
      alert("게시물을 업로드 했습니다.");
      navigate(routeResolver(ROUTE.HOME));
      return;
    }
  }, [navigate, uploadPostResponse, uploadPostError]);

  return (
    <PostUploadWrapper>
      {/* TODO 상단 Nav 업로드 버튼, isActive */}
      <ImgDataProvider>
        <FormSection onSubmit={handleSubmitPost}>
          {/* TODO 버튼 컴포넌트로 변경 */}
          <button type="submit">업로드</button>

          <SmallProfile
            size={PROFILE_SIZE.SMALL}
            src={profileImage}
            imageTo={routeResolver(ROUTE.PROFILE, accountname)}
          />

          <IsUploadPossibleProvider>
            <TextArea ref={textareaRef} />
            <LabelImgUpload />
          </IsUploadPossibleProvider>

          <HiddenUploadFileInput
            ref={inpImagesRef}
            type="file"
            id="imgUpload"
            accept=".jpg, .gif, .png, .jpeg, .bmp, .tif, .heic"
            multiple
            onChange={handleUploadFile}
          />
        </FormSection>

        <AddedImgList imgData={imgData} setImgData={setImgData} />
      </ImgDataProvider>
    </PostUploadWrapper>
  );
}
