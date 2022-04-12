import { styled } from "@mui/material";
import { VerticalCenterAlignFlex } from "util/styledComponent";
import FamousMentorCard from "./FamousMentorCard";

const FamousMentorGroupWrapper = styled(VerticalCenterAlignFlex)`
  flex-direction: column;
  align-items: start;
`;

const FamousMentorCardsWrapper = styled(VerticalCenterAlignFlex)`
  justify-content: space-between;
  width: 100%;
`;

const TopWrapper = styled(VerticalCenterAlignFlex)`
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
        <FamousMentorCard
          company={"삼성전자"}
          department={"빅스비"}
          job={"비서"}
          tag={"현직자"}
          name="박서비"
          rating={3.5}
          index={1}
        />
        <FamousMentorCard />
        <FamousMentorCard />
        <FamousMentorCard />

      </FamousMentorCardsWrapper>
    </FamousMentorGroupWrapper>
  );
}

export default JobCategoryGroup;
