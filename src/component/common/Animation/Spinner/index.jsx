import styled, { keyframes } from "styled-components";

const keyframeRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  width: 45px;
  height: 45px;
  border: 5px solid;
  border-color: ${({ theme }) => theme.snGreyIcon} transparent;
  border-radius: 50%;
  display: inline-block;
  animation: ${keyframeRotation} 1s linear infinite;

  background-color: ${({ theme }) => theme.snWhite};
`;


export default Spinner;