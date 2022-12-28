import styled from "styled-components";
import PropTypes from "prop-types";

import SmallProfile from "component/common/SmallProfile/index";
import Icons from "asset/icon/icons";
import { FONT_SIZE } from "constant/style";
import { PROFILE_SIZE } from "constant/size";

const CommentContentWrapper = styled.section`
  margin: 20px 0 12px;
`;

const CommentHeaderWrapper = styled.div`
  margin-bottom: 4px;
`;

const CreatedTime = styled.span`
  margin-left: 6px;
  font-weight: 400;
  font-size: ${FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.snGreyOff};
`;

const Comment = styled.p`
  margin-left: 52px;
  line-height: 18px;
  font-weight: 400;
  font-size: ${FONT_SIZE.BASE};
  color: ${({ theme }) => theme.snBlack};
  word-break: break-all;
`;

export default function CommentCard({ author, content, createdAt }) {
  function commentTime(time) {
    const ms = Date.parse(time);
    const now = Date.now();
    const gap = (now - ms) / 1000;

    if (gap < 60) {
      return "방금 전";
    } else if (gap < 3600) {
      return `${Math.floor(gap / 60)}분 전`;
    } else if (gap < 86400) {
      return `${Math.floor(gap / 3600)}시간 전`;
    } else if (gap < 2592000) {
      return `${Math.floor(gap / 86400)}일 전`;
    } else {
      return `${Math.floor(gap / 2592000)}달 전`;
    }
  }

  return (
    <>
      <CommentContentWrapper>
        <CommentHeaderWrapper>
          <SmallProfile
            size={PROFILE_SIZE.SMALL}
            src={author.image}
            imageTo={`/profile/${author.accountname}`}
          >
            <SmallProfile.Side
              left={
                <SmallProfile.Side.Title
                  title={author.username}
                  titleTo={`/profile/${author.accountname}`}
                  attachment={
                    <CreatedTime>{commentTime(createdAt)}</CreatedTime>
                  }
                />
              }
              right={
                <button type="button" onClick>
                  <Icons.SMoreVertical />
                </button>
              }
            />
          </SmallProfile>
        </CommentHeaderWrapper>

        <Comment>{content}</Comment>
      </CommentContentWrapper>
    </>
  );
}

CommentCard.propTypes = {
  author: PropTypes.object,
  content: PropTypes.string,
  createdAt: PropTypes.string,
};
