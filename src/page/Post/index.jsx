import styled from "styled-components";
import SmallProfile from "component/common/SmallProfile/index";
import Icons from "asset/icon/icons";

import { FONT_SIZE } from "constant/style";
import { PROFILE_SIZE } from "constant/size";

const PostUploadWrapper = styled.div`
  position: relative;
`;

const FormSection = styled.section`
  margin: 20px 16px 0;
  display: flex;
`;

const TextArea = styled.textarea`
  line-height: 18px;
  font-weight: 400;
  font-family: inherit;
  font-size: ${FONT_SIZE.BASE};
  color: ${({ theme }) => theme.snBlack};
  border-style: none;
  resize: none;
  padding: 5px;
  margin: 12px 0 0 12px;
  width: 100%;
  overflow-y: hidden;

  ::placeholder {
    color: ${({ theme }) => theme.snGreyIcon};
  }
  :focus {
    outline-color: ${({ theme }) => theme.snBlue};
  }
`;

// 업로드 파일 Svg
const SvgUploadFile = styled(Icons.Image)`
  position: fixed;
  // 하단 Nav로 인해 이미지가 잘려서 임의로 위치 지정, 추후 수정하겠습니다. (기존 16px)
  bottom: 66px;
  right: 16px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 12px; // 14.5px로 하면 아이콘이 작아져서 임의로 줄였습니다.
  background-color: ${({ theme }) => theme.snBlue};
`;

// 업로드 파일 인풋 숨기기
const HiddenUploadFileInput = styled.input`
  display: none;
`;

// 이미지 업로드 시 뜨는 프리뷰 창
const UploadedImgList = styled.ul`
  margin: 16px 16px 0 70px;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

// 업로드하는 이미지 list
const UploadImgWrapper = styled.li`
  display: inline-block;
  position: relative;
  margin-right: 8px;
`;

// 업로드하는 이미지
const UploadImg = styled.img`
  width: auto;
  height: 228px;
  object-fit: contain;
  object-position: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  transition: all 0.2s;
  border-radius: 10px;
  border: 0.5px solid ${({ theme }) => theme.snGrayOff};
  background-color: ${({ theme }) => theme.snWhite};
`;

const ButtonDelete = styled.button`
  position: absolute;
  top: 11.5px;
  right: 11.5px;
  width: 22px;
  height: 22px;
`;

export default function PostPage() {
  return (
    <PostUploadWrapper>
      <FormSection>
        <SmallProfile size={PROFILE_SIZE.SMALL} />

        <TextArea
          autoFocus
          spellCheck={false}
          placeholder="게시글 입력하기..."
        ></TextArea>

        <label htmlFor="imgUpload">
          <SvgUploadFile title="이미지 파일 업로드" />
        </label>
        <HiddenUploadFileInput
          type="file"
          id="imgUpload"
          accept=".jpg, .gif, .png, .jpeg, .bmp, .tif, .heic"
          multiple
          onChange
        />
      </FormSection>

      <UploadedImgList>
        <UploadImgWrapper>
          <UploadImg src="" />
          <ButtonDelete type="button">
            <img src={Icons.Close} alt="이미지 삭제 버튼" />
          </ButtonDelete>
        </UploadImgWrapper>
      </UploadedImgList>
    </PostUploadWrapper>
  );
}
