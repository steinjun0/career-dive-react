import { styled } from "@mui/material";
import API from "API";
import MentorCard from "component/mentor/MentorCard";
import { useEffect, useState } from "react";
import { EmptyWidth, Flex, LinkNoDeco, RowAlignCenterFlex } from "util/styledComponent";
import FamousMentorCard from "./FamousMentorCard";

const FamousMentorGroupWrapper = styled(RowAlignCenterFlex)`
  flex-direction: column;
  align-items: start;
`;

const FamousMentorCardsWrapper = styled(RowAlignCenterFlex)`
  justify-content: start;
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
    let isCancel = false
    const apiCall = API.getAccountMentorList()
    apiCall.then((res) => {
      if (!isCancel)
        setMentorList(res.data.Results)
    })
    return () => {
      isCancel = true
    }
  }, [])

  return (
    <FamousMentorGroupWrapper>
      <TopWrapper>
        <Title>상담 가능한 멘토</Title>
        <LinkNoDeco to={'/search'} style={{ zIndex: 2 }}><SellAll>전체보기</SellAll></LinkNoDeco>

      </TopWrapper>

      <FamousMentorCardsWrapper>
        {mentorList && mentorList.slice(0, 4).map((mentorData, index) => {
          return <Flex key={index}>
            <MentorCard
              company={mentorData.CompName}
              department={mentorData.DivisIsPub ? mentorData.DivisInComp : ''}
              job={mentorData.JobInComp}
              name={mentorData.Nickname}
              inJob={mentorData.InService ? "현직자" : "경력자"}
              duration={mentorData.TotEmpMonths}
              rating={4.5}
              tags={mentorData.TagList.slice(0, 3)}
              userId={mentorData.UserID}
              isShowRating={false}
              isShowTag={true} />
            <EmptyWidth width={'30px'} />
          </Flex>
        })}
      </FamousMentorCardsWrapper>
    </FamousMentorGroupWrapper>
  );
}

export default JobCategoryGroup;
