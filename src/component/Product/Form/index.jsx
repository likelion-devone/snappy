import styled from "styled-components";
import { useEffect, useContext, useState, useRef } from "react";
import useValidationInput from "hook/useValidationInput";
import PropTypes from "prop-types";

import ValidationInputWrapper from "component/common/Input/ValidationInput";

import { FONT_SIZE } from "constant/style";
import { ProductContext } from "component/Product/ProductProvider";
import Icons from "asset/icon/icons";
import AddedImgList from "component/common/AddedImgList/index";
import useAPI from "hook/useAPI";
import { req } from "lib/api/index";

const ProductFormWrapper = styled.fieldset`
  min-width: 322px;
  max-width: 400px;
  margin: 20px auto;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  margin-bottom: 30px;
`;

const ImgUploadTitle = styled.p`
  font-weight: 500;
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 15px;
  color: ${({ theme }) => theme.snGreyIcon};
`;

const SvgUploadFile = styled(Icons.Image)`
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  padding: 8px;
  background-color: ${({ theme }) => theme.snGreyLight};

  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 10;
`;

const HiddenUploadFileInput = styled.input`
  display: none;
`;

const AddedImgContainer = styled.div`
  width: 100%;
  height: 204px;
  background-color: #f2f2f2;
  border-radius: 10px;
  border: 0.5px solid ${({ theme }) => theme.snGreyOff};
`;

const StyledAddedImgList = styled(AddedImgList)`
  margin: 0;
  background-color: #f2f2f2;
  border-radius: 10px;
  max-width: 100%;
  height: 203px;

  display: flex;
  gap: 10px;

  li {
    background-color: white;
    width: 203px;
    height: 100%;
    margin: 0;
    flex-shrink: 0;
    border-radius: 10px;
    overflow: hidden;
  }

  img {
    max-width: 360px;
    height: 100%;
    object-fit: contain;
  }
`;

function checkIsFilled(value) {
  return value ? "" : "빈칸을 채워주세요.";
}
function checkPriceValidation(value) {
  return value && value >= 1
    ? ""
    : "비어있거나 1 이상의 숫자인지 확인해주세요.";
}

const SIZE_LIMIT = 10 * 1024 * 1024;

function ProductForm({ formId }) {
  //TODO: 링크임을 확인하는 정규식 테스트 추가, 버튼은 1차 처리이므로 데이터를 아예 받지 못하게 2차 처리 필요할듯

  const { isFormFilled, setIsFormFilled, productData, dispatchProductData } =
    useContext(ProductContext);

  const [imageRef, handleImageValidation, _imageError, isImageFilled] =
    useValidationInput(checkIsFilled);
  const [nameRef, handleNameValidation, nameError, isNameFilled] =
    useValidationInput(checkIsFilled);
  const [priceRef, handlePriceValidation, priceError, isPriceFilled] =
    useValidationInput(checkPriceValidation);
  const [linkRef, handleLinkValidation, linkError, isLinkFilled] =
    useValidationInput(checkIsFilled);

  const [imgData, setImgData] = useState([]);

  // 이미지 업로드 API
  const [
    _isImageUploading,
    _imageUploadResponse,
    _imageUploadError,
    uploadImages,
  ] = useAPI(req.noAuth.image.uploadfiles);

  const inpImagesRef = useRef(null);
  const imgContainerRef = useRef(null);

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

  // useEffect(() => {
  //   imgContainerRef.current.style.backgroundImage = `url(${
  //     productData ? productData.itemImage : ""
  //   })`;
  // }, [productData]);

  useEffect(() => {
    if (productData) {
      handleNameValidation();
      handlePriceValidation();
      handleLinkValidation();
    }
  }, [
    handleNameValidation,
    handlePriceValidation,
    handleLinkValidation,
    productData,
  ]);

  useEffect(() => {
    if (isNameFilled && isPriceFilled && isLinkFilled && !isFormFilled) {
      setIsFormFilled(true);
    } else if (
      !(isNameFilled && isPriceFilled && isLinkFilled) &&
      isFormFilled
    ) {
      setIsFormFilled(false);
    }
  }, [
    isNameFilled,
    isPriceFilled,
    isLinkFilled,
    isFormFilled,
    setIsFormFilled,
  ]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    [...inpImagesRef.current.files].forEach((file) => {
      formData.append("image", file);
    });
    const results = await uploadImages({ formData: formData });

    dispatchProductData({
      type: "set",
      payload: {
        itemName: nameRef.current.value,
        price: parseInt(priceRef.current.value),
        link: linkRef.current.value,
        itemImage: results.length
          ? results
              .map((result) => process.env.REACT_APP_BASE_API + result.filename)
              .join(",")
          : "https://mandarin.api.weniv.co.kr/1672086090201.png",
      },
    });
  };

  return (
    <form onSubmit={handleFormSubmit} id={formId}>
      <ProductFormWrapper>
        <legend className="sr-only">상품 정보</legend>

        <InputContainer ref={imgContainerRef}>
          <ImgUploadTitle>이미지 등록</ImgUploadTitle>
          <AddedImgContainer>
            <label htmlFor="imgUpload" className="img-upload-label">
              <SvgUploadFile />
            </label>
            <StyledAddedImgList
              imgData={imgData}
              setImgData={setImgData}
              className="added-img-list"
            />
          </AddedImgContainer>
          <HiddenUploadFileInput
            ref={inpImagesRef}
            type="file"
            id="imgUpload"
            accept=".jpg, .gif, .png, .jpeg, .bmp, .tif, .heic"
            multiple
            onChange={handleUploadFile}
          />
        </InputContainer>

        <ValidationInputWrapper errorMessage={nameError}>
          <ValidationInputWrapper.Input
            labelText="상품명"
            type="text"
            ref={nameRef}
            id="productName"
            maxLength="25"
            placeholder="상품명을 입력해주세요."
            required
            onChange={handleNameValidation}
            defaultValue={productData ? productData.itemName : ""}
          />
          <ValidationInputWrapper.ErrorMessage />
        </ValidationInputWrapper>

        <ValidationInputWrapper errorMessage={priceError}>
          <ValidationInputWrapper.Input
            labelText="가격"
            type="number"
            ref={priceRef}
            id="productPrice"
            placeholder="숫자만 입력 가능합니다."
            required
            onChange={handlePriceValidation}
            defaultValue={productData ? productData.price : ""}
          />
          <ValidationInputWrapper.ErrorMessage />
        </ValidationInputWrapper>

        <ValidationInputWrapper errorMessage={linkError}>
          <ValidationInputWrapper.Input
            labelText="판매 링크"
            type="text"
            ref={linkRef}
            id="productLink"
            placeholder="URL을 입력해주세요."
            required
            onChange={handleLinkValidation}
            defaultValue={productData ? productData.link : ""}
          />
          <ValidationInputWrapper.ErrorMessage />
        </ValidationInputWrapper>
      </ProductFormWrapper>
    </form>
  );
}

ProductForm.propTypes = {
  formId: PropTypes.string.isRequired,
};

export default ProductForm;
