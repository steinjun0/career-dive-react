import { styled } from "@mui/material";
import MentorCard from "component/mentor/MentorCard";
import { RowAlignCenterFlex } from "util/styledComponent";
import FamousMentorCard from "./FamousMentorCard";

const FamousMentorGroupWrapper = styled(RowAlignCenterFlex)`
  flex-direction: column;
  align-items: start;
`;

const FamousMentorCardsWrapper = styled(RowAlignCenterFlex)`
  justify-content: space-between;
  width: 100%;
`;

const TopWrapper = styled(RowAlignCenterFlex)`
  justify-content: space-between;
  width: 100%;
`;

const Title = styled("span")`
  font-weight: 700;
  font-size: 24px;
  margin-top: 55px;
  margin-bottom: 30px;
`;

const SellAll = styled("span")`
  margin-top: 55px;
  margin-bottom: 30px;
`;

function JobCategoryGroup() {
  return (
    <FamousMentorGroupWrapper>
      <TopWrapper>
        <Title>추천 인기 멘토</Title>
        <SellAll>전체보기</SellAll>
      </TopWrapper>

      <FamousMentorCardsWrapper>
        <MentorCard
          company={"LF"}
          department={"서비스 기획자"}
          job={"UX 리서처"}
          name={"Sarah"}
          inJob={"현직자"}
          duration={"기간"}
          rating={4.5}
          userId={1}
          isShowRating={false}
          isShowTag={true} />
        <MentorCard
          company={"넥스트 유니콘"}
          department={"앱 개발팀"}
          job={"데이터 사이언티스트"}
          name={"Soo"}
          inJob={"현직자"}
          duration={"기간"}
          rating={4.5}
          userId={1} />
        <MentorCard
          company={"커리어다이브"}
          department={"디자이너"}
          job={"매드로봇"}
          name={"Sarah"}
          inJob={"현직자"}
          duration={"기간"}
          rating={4.5}
          userId={1} />
        <MentorCard />
      </FamousMentorCardsWrapper>
    </FamousMentorGroupWrapper>
  );
}

export default JobCategoryGroup;
