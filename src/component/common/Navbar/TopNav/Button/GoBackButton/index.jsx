import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import Icons from "asset/icon/icons";

const Button = styled.button`
  height: 22px;
  margin-right: 10px;
`

export default function GoBackButton({ onClick, title = "뒤로 가기" }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <Button type="button" onClick={onClick ? onClick : handleGoBack}>
      <Icons.ArrowLeft title={title} />
    </Button>
  )
}

GoBackButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string
}