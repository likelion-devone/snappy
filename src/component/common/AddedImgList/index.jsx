import styled from "styled-components";
import PropTypes from "prop-types";

import Icons from "asset/icon/icons";
import ErrorImg from "asset/logo-404-343264.png";
import React from "react";

// 이미지 프리뷰
const UploadedImgList = styled.ul`
  margin: 16px 16px 0 70px;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

// 업로드하는 이미지 리스트
const UploadImgWrapper = styled.li`
  display: inline-block;
  position: relative;
  margin-right: 8px;
`;

// 업로드하는 이미지
const UploadImg = styled.img`
  width: auto;
  height: ${({ $isMultiple }) => ($isMultiple ? "126px" : "228px")};
  object-fit: contain;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  transition: all 0.2s;

  vertical-align: top;
`;

const ButtonDelete = styled.button`
  position: absolute;
  top: 7px;
  right: 7px;
  width: 22px;
  height: 22px;
`;

export default function AddedImgList({ imgData, setImgData, className }) {
  const handleImgError = (event) => {
    event.target.src = ErrorImg;
  };

  //  X 버튼 클릭 시 이미지 프리뷰 리스트에서 제거
  const handleDeleteImg = (blobToRemove) => () => {
    setImgData((prev) => prev.filter((image) => image !== blobToRemove));
  };

  return (
    <>
      {!!imgData.length && (
        <UploadedImgList className={className}>
          {React.Children.toArray(
            imgData.map((image) => (
              <UploadImgWrapper>
                <UploadImg
                  src={image}
                  onError={handleImgError}
                  $isMultiple={imgData.length > 1}
                />
                <ButtonDelete type="button" onClick={handleDeleteImg(image)}>
                  <Icons.Close title="이미지 삭제 버튼입니다." />
                </ButtonDelete>
              </UploadImgWrapper>
            ))
          )}
        </UploadedImgList>
      )}
    </>
  );
}

AddedImgList.propTypes = {
  imgData: PropTypes.array,
  setImgData: PropTypes.func,
  className: PropTypes.string,
};
