import styled from "styled-components";
import Icons from "asset/icon/icons";

// 업로드 파일 Svg
const SvgUploadFile = styled(Icons.Image)`
  position: fixed;
  bottom: 16px;
  right: 16px;
  cursor: pointer;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 12px;
  background-color: ${({ theme }) => theme.snBlue};
`;

export default function LabelImgUpload() {
  return (
    <label htmlFor="imgUpload">
      <SvgUploadFile title="이미지 파일 업로드" />
    </label>
  );
}
