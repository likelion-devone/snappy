import styled from "styled-components";
import Icons from "asset/icon/icons";

// 업로드 파일 Svg
const SvgUploadFile = styled(Icons.Image)`
  position: fixed;
  // 하단 Nav로 인해 이미지가 잘려서 임의로 위치 지정, 추후 수정하겠습니다. (기존 16px)
  bottom: 76px;
  right: 16px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 12px;
  background-color: ${({ $possibleUpload, theme }) =>
    $possibleUpload ? theme.snDisabled : theme.snBlue};
`;

export default function LabelImgUpload() {
  return (
    <label htmlFor="imgUpload">
      <SvgUploadFile title="이미지 파일 업로드" />
    </label>
  );
}
