import styled from "styled-components";
import { useState, useRef, useEffect, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SmallProfile from "component/common/SmallProfile/index";
import AddedImgList from "component/common/AddedImgList/index";
import { IsUploadPossibleContext } from "component/Post/IsUploadPossibleProvider/index";
import ImgDataProvider from "component/Post/ImgDataProvider/index";
import TextArea from "component/Post/TextArea/index";
import LabelImgUpload from "component/Post/LabelImgUpload/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import { PROFILE_SIZE } from "constant/size";
import ROUTE from "constant/route";

import { req } from "lib/api/index";
import routeResolver from "util/routeResolver";
import useAuthInfo from "hook/useAuthInfo";
import useTopNavSetter from "hook/useTopNavSetter";
import useAPI from "hook/useAPI";
import useFetch from "hook/useFetch";
import isBlobUrl from "util/isBlobUrl";

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

export default function PostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [imgData, setImgData] = useState([]);
  const { _id: userId } = useAuthInfo();

  const inpImagesRef = useRef(null);
  const textareaRef = useRef(null);

  const { isPossibleToUpload, setIsPossibleToUpload } = useContext(
    IsUploadPossibleContext
  );

  // 이미 등록된 포스트 정보를 가져와서 초기 수정 화면에 뿌려주기 위함
  const [isPostDataFetching, initialPostData, initialPostDataError] = useFetch(
    req.post.detail,
    { postId }
  );

  useEffect(() => {
    if (initialPostData) {
      console.log(initialPostData);
      if (initialPostData.post.author._id !== userId) {
        navigate(ROUTE.HOME);
        return;
      }

      if (!initialPostData.post.image) {
        return;
      }
      setImgData(initialPostData.post.image.split(","));
    }
  }, [initialPostData, navigate, userId]);

  useEffect(() => {
    if (initialPostDataError) {
      alert("게시물을 불러오는 데 실패했습니다.");
      navigate(routeResolver(ROUTE.POST, postId));
      return;
    }
  }, [initialPostDataError, navigate, postId]);

  // 상단 넵바
  const UploadButton = useMemo(
    () => (
      <TopNavElement.Button form="post-upload" $isAbled={isPossibleToUpload}>
        업로드
      </TopNavElement.Button>
    ),
    [isPossibleToUpload]
  );

  const { setTopNavRight } = useTopNavSetter({
    left: <TopNavElement.GoBackButton />,
    right: UploadButton,
  });

  useEffect(() => {
    setTopNavRight(UploadButton);
  }, [setTopNavRight, UploadButton]);

  // 이미지 업로드 API
  const [
    _isImageUploading,
    _imageUploadResponse,
    _imageUploadError,
    uploadImages,
  ] = useAPI(req.noAuth.image.uploadfiles);

  // 게시물 수정 API
  const [isPostEditing, editPostResponse, editPostError, editPost] = useAPI(
    req.post.edit
  );

  // 게시물 업로드 후 HOME 으로 경로 이동

  const { image: profileImage, accountname } = useAuthInfo();

  // 업로드 파일 인풋 onChange 이벤트
  const handleUploadFile = (event) => {
    const imgFileList = event.target.files;
    const imgCount = imgData.filter((url) => !isBlobUrl(url)).length;

    if (imgCount + imgFileList.length > 3) {
      alert("3개 이하의 파일을 업로드 하세요.");
      return;
    }

    if (imgFileList.length === 0) {
      return;
    }

    if (imgCount)
      setImgData((prevImgData) => {
        prevImgData.forEach((data) => {
          if (data.startsWith("blob:")) {
            URL.revokeObjectURL(data);
          }
        });

        const imgList = [
          ...prevImgData.filter((url) => !isBlobUrl(url))
        ];

        for (const file of imgFileList) {
          if (file.size > SIZE_LIMIT) {
            alert("10MB 이상의 이미지는 업로드 할 수 없습니다.");
            return imgList;
          }

          imgList.push(URL.createObjectURL(file));
        }

        setIsPossibleToUpload(imgList.length !== 0);
        return imgList;
      });
  };

  // 상단 Nav 업로드 버튼 onClick 이벤트
  const handleSubmitPost = async (event) => {
    event.preventDefault();
    if (isPostEditing) {
      return;
    }

    const previouslyExistedImgUrls = imgData.filter(
      (url) => !isBlobUrl(url)
    );

    if (inpImagesRef.current.files.length !== 0) {
      const formData = new FormData();
      [...inpImagesRef.current.files].forEach((file) => {
        formData.append("image", file);
      });

      const results = await uploadImages({ formData: formData });

      const newImages = results.length
        ? results.map(
          (result) => process.env.REACT_APP_BASE_API + result.filename
        )
        : [];

      return editPost({
        postId,
        content: textareaRef.current.value,
        image: [...previouslyExistedImgUrls, ...newImages].join(","),
      });
    }

    editPost({
      postId,
      content: textareaRef.current.value,
      image: [...previouslyExistedImgUrls].join(","),
    });
  };

  useEffect(() => {
    // 게시물 업로드 전
    if (editPostError) {
      console.error(editPostError);
      alert("게시물 업로드를 실패했습니다.");
      return;
    }
    // 게시물 업로드 완료 후
    if (editPostResponse) {
      alert("게시물을 업로드 했습니다.");
      navigate(routeResolver(ROUTE.POST, postId));
      return;
    }
  }, [navigate, editPostResponse, editPostError, postId]);

  return isPostDataFetching ? (
    "로딩중"
  ) : (
    <PostUploadWrapper>
      <ImgDataProvider>
        <FormSection id="post-upload" onSubmit={handleSubmitPost}>
          <SmallProfile
            size={PROFILE_SIZE.SMALL}
            src={profileImage}
            imageTo={routeResolver(ROUTE.PROFILE, accountname)}
          />

          <TextArea
            ref={textareaRef}
            defaultValue={initialPostData.post.content}
          />
          <LabelImgUpload />

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
