import styled from "styled-components";

import Icons from "asset/icon/icons";

const Button = styled.button`
  height: 24px;
  svg {
    path {
      stroke: ${({ theme }) => theme.snGreyIcon};
    }
  }
`

export default function MoreButton({ ...props }) {
  return (
    <Button type="button" {...props}>
      <Icons.MoreVertical title="더보기" />
    </Button>
  )
}