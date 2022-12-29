import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Side from "./Side";

import { PROFILE_SIZE } from "constant/size";
import ProfileErrorImage from "asset/logo-404-203220.png";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 12px;

  width: 100%;

  ${({ isNotifying }) =>
    isNotifying &&
    css`
      &::before {
        content: "";
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.snBlue};
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        outline: ${({ theme }) => theme.snWhite} 1px solid;
      }
    `}
`;

const Img = styled.img`
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  vertical-align: top;

  ${({ size }) => sizeStyleMap[size] ?? ""}

  ${({ isPhotographer }) =>
    isPhotographer &&
    css`
      outline: ${({ theme }) => theme.snBlue} solid 3px;
      outline-offset: -3px;
    `}
`;

const sizeStyleMap = {
  xs: css`
    width: 36px;
    height: 36px;
  `,
  sm: css`
    width: 42px;
    height: 42px;
  `,
  md: css`
    width: 50px;
    height: 50px;
  `,
};

/**
 * `isNotifying` : 채팅 페이지에서 사용시 노티 표시 여부
 */
export default function SmallProfile({
  size,
  src,
  imageTo,
  children,
  isPhotographer,
  isNotifying,
}) {
  const handleImgError = (event) => {
    event.target.src = ProfileErrorImage;
  };

  return !children ? (
    !imageTo ? (
      <Img
        src={src ?? ProfileErrorImage}
        alt="프로필 이미지입니다"
        size={size}
        isPhotographer={isPhotographer}
        onError={(e) => handleImgError(e)}
      />
    ) : (
      <Link to={imageTo}>
        <Img
          src={src ?? ProfileErrorImage}
          alt="프로필 이미지입니다"
          size={size}
          isPhotographer={isPhotographer}
          onError={(e) => handleImgError(e)}
        />
      </Link>
    )
  ) : !imageTo ? (
    <Wrapper isNotifying={isNotifying}>
      <Img
        src={src ?? ProfileErrorImage}
        alt="프로필 이미지입니다"
        size={size}
        isPhotographer={isPhotographer}
        onError={(e) => handleImgError(e)}
      />
      {children}
    </Wrapper>
  ) : (
    <Wrapper isNotifying={isNotifying}>
      <Link to={imageTo}>
        <Img
          src={src ?? ProfileErrorImage}
          alt="프로필 이미지입니다"
          size={size}
          isPhotographer={isPhotographer}
          onError={(e) => handleImgError(e)}
        />
      </Link>
      {children}
    </Wrapper>
  );
}

SmallProfile.propTypes = {
  size: PropTypes.oneOf(Object.values(PROFILE_SIZE)).isRequired,
  src: PropTypes.string.isRequired,
  imageTo: PropTypes.string,
  children: PropTypes.node,
  isNotifying: PropTypes.bool,
  isPhotographer: PropTypes.bool,
};

SmallProfile.Side = Side;
