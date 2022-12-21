import styled from "styled-components";
import PropTypes from "prop-types";
import { FONT_SIZE } from "constant/style";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .title-wrapper {
    display: flex;
    align-items: center;
  }

  .subtitle {
    margin-top: ${({ gap }) => gap + "px"};
    width: 100%;

    font-weight: 400;
    font-size: ${FONT_SIZE.MEDIUM};
    line-height: 14px;

    color: ${({ theme }) => theme.snGreyIcon};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StyledTitle = styled.strong`
  font-weight: 500;
  font-size: ${FONT_SIZE.BASE};
  line-height: 18px;

  & + * {
    align-self: center;

    font-weight: 400;
    font-size: ${FONT_SIZE.SMALL};
    line-height: 13px;

    color: ${({ theme }) => theme.snGreyIcon};

    ::before {
      content: "\\00B7";
      margin: 0 5px;
    }
  }
`;

/**
 * SmallProfile.Side의 왼쪽 부분을 담당하는 컴포넌트
 *
 * @prop {string} title
 * @prop {string} subtitle
 * @prop {element} attachment
 * @prop {number} gap title과 subtitle간의 간격을 의미
 */
export default function Title({ title, subtitle, attachment, gap = 2 }) {
  return (
    <Wrapper gap={gap}>
      <div className="title-wrapper">
        <StyledTitle>{title}</StyledTitle>
        {!!attachment && attachment}
      </div>
      {!!subtitle && <span className="subtitle">{subtitle}</span>}
    </Wrapper>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  attachment: PropTypes.element,
  gap: PropTypes.number,
};
