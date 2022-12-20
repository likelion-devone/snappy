import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import Side from "./Side";

import { PROFILE_SIZE } from "constant/size";

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
export default function SmallProfile({ size, children, ...props }) {
  const { isPhotographer, isNotifying } = props;

  if (process.env.NODE_ENV === "development") {
    // TODO: 개발 모드 추후 삭제 필요
    return !children ? (
      <Img
        src={"https://fakeimg.pl/110x110/"}
        alt="프로필 이미지입니다"
        size={size}
        isPhotographer={isPhotographer}
      />
    ) : (
      <Wrapper isNotifying={isNotifying}>
        <Img
          src={"https://fakeimg.pl/110x110/"}
          alt="프로필 이미지입니다"
          size={size}
          isPhotographer={isPhotographer}
        />
        {children}
      </Wrapper>
    );
  }

  return !children ? (
    <Img
      src={"https://fakeimg.pl/110x110/"}
      alt="프로필 이미지입니다"
      size={size}
      isPhotographer={isPhotographer}
    />
  ) : (
    <Wrapper isNotifying={isNotifying}>
      <Img
        src={"https://fakeimg.pl/110x110/"}
        alt="프로필 이미지입니다"
        size={size}
        isPhotographer={isPhotographer}
      />
      {children}
    </Wrapper>
  );
}

SmallProfile.propTypes = {
  size: PropTypes.oneOf(Object.values(PROFILE_SIZE)).isRequired,
  isNotifying: PropTypes.bool,
  children: PropTypes.node,
  isPhotographer: PropTypes.bool,
};

SmallProfile.Side = Side;
