import styled from "styled-components";
import PropTypes from "prop-types";
import React, { useMemo, useState, useCallback } from "react";

import ErrorImg from "asset/logo-404-343264.png";
import Icons from "asset/icon/icons";

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  margin: 0 auto;
  overflow: hidden;
`;

const ImagesWrapper = styled.ul`
  margin-left: ;

  height: 230px;
  width: ${({ imageCount }) => imageCount * 300 + "px"};
  transition: all 0.2s ease;
  transform: translate(${({ activatedImageIndex }) => activatedImageIndex * -300 + "px"});
`

const ImageItem = styled.li`
  display: inline-block;
`

const Image = styled.img`
  width: 300px;
  height: 228px;

  object-fit: contain;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const DotWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

const Dot = styled.button`
  height: 11px;
  width: 11px;
  margin: 0 6px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isActivated ? props.theme.snBlue : props.theme.snGreyOff};

  :hover {
    background-color: ${({ theme }) => theme.snBlue}AA;
  }
`;

const SlideBtn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 10px;
  width: 50%;
  :hover {
    background-color: ${({ theme }) => theme.snBlue}22;
    transition: all 0.5s ease;
  }
  border-radius: 10px;

  ${({ visible }) => !visible && "display: none;"}
`;

const RightSlideBtn = styled(SlideBtn)`
  right: 0;
  text-align: right;
`;

const LeftSlideBtn = styled(SlideBtn)`
  left: 0;
  text-align: left;
`;

const SvgSlide = styled(Icons.Slide)`
  transform: rotate(180deg);
`;

export default function Carousel({ imageLinks }) {
  const [activatedImageIndex, setActivatedImageIndex] = useState(0);
  const isMultiple = useMemo(() => imageLinks.length !== 1, [imageLinks]);

  const handleImgError = (event) => {
    event.target.src = ErrorImg;
  };

  const showPrevImage = useCallback(() => setActivatedImageIndex((prev) => prev !== 0 ? prev - 1 : prev), []);
  const showNextImage = useCallback(() => setActivatedImageIndex((prev) => prev !== imageLinks.length - 1 ? prev + 1 : prev), [imageLinks]);

  console.log(imageLinks);

  if (!isMultiple) {
    return (
      <Wrapper>
        <Image
          src={imageLinks[0]}
          onError={handleImgError}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <ImagesWrapper imageCount={imageLinks.length} activatedImageIndex={activatedImageIndex}>
        {React.Children.toArray(
          imageLinks.map((postImg) => (
            <ImageItem>
              <Image
                src={postImg}
                onError={handleImgError}
              />
            </ImageItem>
          ))
        )}
      </ImagesWrapper>

      <DotWrapper>
        {React.Children.toArray(
          imageLinks.map((postImg, index) => (
            <Dot
              type="button"
              $isActivated={activatedImageIndex === index}
              onClick={() => setActivatedImageIndex(index)}
            />
          ))
        )}
      </DotWrapper>

      <LeftSlideBtn
        type="button"
        visible={activatedImageIndex !== 0}
        onClick={showPrevImage}
      >
        <SvgSlide />
      </LeftSlideBtn>
      <RightSlideBtn
        type="button"
        visible={activatedImageIndex !== imageLinks.length - 1}
        onClick={showNextImage}
      >
        <Icons.Slide />
      </RightSlideBtn>

    </Wrapper>
  )
}

Carousel.propTypes = {
  imageLinks: PropTypes.arrayOf(PropTypes.string).isRequired
}