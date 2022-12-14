import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTitle = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;

  & + * {
    align-self: center;

    font-weight: 400;
    font-size: 10px;
    line-height: 13px;

    color: #767676;

    ::before {
      content: "\\00B7";
      margin: 0 5px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .title-wrapper {
    display: flex;
    align-items: center;
  }

  .subtitle {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: #767676;
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
