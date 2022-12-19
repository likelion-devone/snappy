import { FONT_SIZE } from "constant/style";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  text-align: center;
`;

const Count = styled.span`
  font-weight: 700;
  font-size: ${FONT_SIZE.X_LARGE};
  line-height: 23px;
`;

const StyledP = styled.p`
  font-weight: 400;
  font-size: ${FONT_SIZE.SMALL};
  line-height: 12px;
  color: ${({ theme }) => theme.snGreyIcon};
`;

export default function FollowCounter() {
  return (
    <Wrapper>
      <Count>295</Count>
      <StyledP>followers</StyledP>
    </Wrapper>
  );
}
