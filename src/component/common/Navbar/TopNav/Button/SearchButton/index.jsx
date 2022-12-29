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

export default function SearchButton({ ...props }) {
  return (
    <Button type="button" {...props}>
      <Icons.Search title="사용자 검색하기" />
    </Button>
  )
}