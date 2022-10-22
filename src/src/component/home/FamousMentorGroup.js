import { styled } from "@mui/material";
import API from "API";
import MentorCard from "component/mentor/MentorCard";
import { useEffect, useState } from "react";
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

  const [mentorList, setMentorList] = useState()
  useEffect(() => {
    API.getAccountMentorList().then((res) => {
      if (res.status === 200) {
        setMentorList(res.data.Results)
      }
    })
  }, [])
  return (
    <FamousMentorGroupWrapper>
      <TopWrapper>
        <Title>추천 인기 멘토</Title>
        <SellAll>전체보기</SellAll>
      </TopWrapper>

      <FamousMentorCardsWrapper>
        {mentorList && mentorList.slice(0, 4).map((mentorData, index) => {
          return <MentorCard
            key={index}
            company={mentorData.CompName}
            department={mentorData.DivisInComp}
            job={mentorData.JobInComp}
            name={mentorData.Nickname}
            inJob={mentorData.InService ? "현직자" : "경력자"}
            duration={"기간"}
            rating={4.5}
            tags={mentorData.TagList.slice(0, 3)}
            userId={mentorData.UserID}
            isShowRating={false}
            isShowTag={true} />
        })}
      </FamousMentorCardsWrapper>
    </FamousMentorGroupWrapper>
  );
}

export default JobCategoryGroup;
