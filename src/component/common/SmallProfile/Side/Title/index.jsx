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
    margin-top: 2px;
    width: 100%;

    font-weight: 400;
    font-size: ${FONT_SIZE.MEDIUM};
    line-height: 14px;

    color: ${({ theme }) => theme.snGrayIcon};

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

    color: ${({ theme }) => theme.snGrayIcon};

    ::before {
      content: "\\00B7";
      margin: 0 5px;
    }
  }
`;

export default function Title({ title, subtitle, attachment }) {
  return (
    <Wrapper>
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
};
