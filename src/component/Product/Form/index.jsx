import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useContext, useState, useRef } from "react";

import { ProductContext } from "component/common/ProductProvider/index";
import AddedImgList from "component/common/AddedImgList/index";
import ValidationInputWrapper from "component/common/Input/ValidationInput";

import useAPI from "hook/useAPI";
import useValidationInput from "hook/useValidationInput";

import { req } from "lib/api/index";
import isBlobUrl from "util/isBlobUrl";
import { validateIsFilled, validateOver1, validateUrl } from "util/validation";

import { FONT_SIZE } from "constant/style";
import Icons from "asset/icon/icons";

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
  border-radius: 10px;
  border: 0.5px solid ${({ theme }) => theme.snGreyOff};
  background-color: ${({ theme }) => theme.snGreyExtraLight};
`;

const StyledAddedImgList = styled(AddedImgList)`
  margin: 0;
  background-color: ${({ theme }) => theme.snGreyExtraLight};
  border-radius: 10px;
  max-width: 100%;
  height: 203px;

  display: flex;
  gap: 10px;

  li {
    background-color: ${({ theme }) => theme.snWhite};
    width: fit-content;
    height: 100%;
    margin: 0;
    flex-shrink: 0;
    border-radius: 10px;
    overflow: hidden;
  }

  img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
`;

const SIZE_LIMIT = 10 * 1024 * 1024;

function ProductForm({ formId }) {
  //TODO: ???????????? ???????????? ????????? ????????? ??????, ????????? 1??? ??????????????? ???????????? ?????? ?????? ????????? 2??? ?????? ????????????

  const { isFormFilled, setIsFormFilled, productData, dispatchProductData } =
    useContext(ProductContext);

  const [nameRef, handleNameValidation, nameError, isNameFilled] =
    useValidationInput(validateIsFilled);
  const [priceRef, handlePriceValidation, priceError, isPriceFilled] =
    useValidationInput(validateOver1);
  const [linkRef, handleLinkValidation, linkError, isLinkFilled] =
    useValidationInput(validateUrl);

  const [imgData, setImgData] = useState([]);

  // ????????? ????????? API
  const [
    _isImageUploading,
    _imageUploadResponse,
    _imageUploadError,
    uploadImages,
  ] = useAPI(req.noAuth.image.uploadfiles);

  const inpImagesRef = useRef(null);
  const imgContainerRef = useRef(null);

  // ????????? ?????? ?????? onChange ?????????
  const handleUploadFile = (event) => {
    const imgFileList = event.target.files;

    const imgCount = imgData.filter((url) => !isBlobUrl(url)).length;

    if (imgCount + imgFileList.length > 3) {
      alert("3??? ????????? ????????? ????????? ?????????.");
      return;
    }

    if (imgFileList.length === 0) {
      return;
    }

    setImgData((prevImgData) => {
      prevImgData.forEach((data) => {
        if (data.startsWith("blob:")) {
          URL.revokeObjectURL(data);
        }
      });

      const imgList = [...prevImgData.filter((url) => !isBlobUrl(url))];

      for (const file of imgFileList) {
        if (file.size > SIZE_LIMIT) {
          alert("10MB ????????? ???????????? ????????? ??? ??? ????????????.");
          return imgList;
        }

        imgList.push(URL.createObjectURL(file));
      }

      return imgList;
    });
  };

  useEffect(() => {
    if (productData) {
      handleNameValidation();
      handlePriceValidation();
      handleLinkValidation();

      setImgData(productData.itemImage.split(","));
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
    const previouslyExistedImgUrls = imgData.filter((url) => !isBlobUrl(url));

    if (
      !inpImagesRef.current.files.length &&
      !previouslyExistedImgUrls.length
    ) {
      alert("???????????? ?????? ?????? ???????????????.");
      return;
    }

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

    dispatchProductData({
      type: "set",
      payload: {
        itemName: nameRef.current.value,
        price: parseInt(priceRef.current.value),
        link: linkRef.current.value,
        itemImage: [...previouslyExistedImgUrls, ...newImages].join(","),
      },
    });
  };

  return (
    <form onSubmit={handleFormSubmit} id={formId} autoComplete="off">
      <ProductFormWrapper>
        <legend className="sr-only">?????? ??????</legend>

        <InputContainer ref={imgContainerRef}>
          <ImgUploadTitle>????????? ??????</ImgUploadTitle>
          <AddedImgContainer>
            <label htmlFor="imgUpload" className="img-upload-label">
              <SvgUploadFile />
            </label>
            <StyledAddedImgList imgData={imgData} setImgData={setImgData} />
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
            labelText="?????????"
            type="text"
            ref={nameRef}
            id="productName"
            maxLength="25"
            placeholder="???????????? ??????????????????."
            required
            onKeyUp={handleNameValidation}
            defaultValue={productData ? productData.itemName : ""}
          />
          <ValidationInputWrapper.ErrorMessage />
        </ValidationInputWrapper>

        <ValidationInputWrapper errorMessage={priceError}>
          <ValidationInputWrapper.Input
            labelText="??????"
            type="number"
            ref={priceRef}
            id="productPrice"
            placeholder="????????? ?????? ???????????????."
            required
            onKeyUp={handlePriceValidation}
            defaultValue={productData ? productData.price : ""}
          />
          <ValidationInputWrapper.ErrorMessage />
        </ValidationInputWrapper>

        <ValidationInputWrapper errorMessage={linkError}>
          <ValidationInputWrapper.Input
            labelText="?????? ??????"
            type="text"
            ref={linkRef}
            id="productLink"
            placeholder="URL??? ??????????????????."
            required
            onKeyUp={handleLinkValidation}
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
