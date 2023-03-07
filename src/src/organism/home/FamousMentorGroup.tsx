import { styled } from "@mui/material";
import * as accountAPI from "apis/account";
import MentorCard from "component/mentor/MentorCard";
import { IMentor } from "interfaces/mentor";
import React from "react";
import { useEffect, useState } from "react";
import { EmptyWidth, Flex, LinkNoDeco, RowAlignCenterFlex } from "util/styledComponent";
import FamousMentorCard from "../../component/home/FamousMentorCard";

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

  const [mentorList, setMentorList] = useState<IMentor[]>([])
  useEffect(() => {
    let isCancel = false
    const apiCall = accountAPI.getAccountMentorList()
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
        {mentorList && mentorList.slice(0, 4).map((mentorData: IMentor, index: number) => {
          return <Flex key={index}>
            <MentorCard
              company={mentorData.company}
              department={mentorData.divisIsPub ? mentorData.department : ''}
              job={mentorData.job}
              name={mentorData.nickname}
              inJob={mentorData.inJob ? "현직자" : "경력자"}
              // duration={mentorData.duration}
              rating={4.5}
              tags={mentorData.tags.slice(0, 3)}
              userId={mentorData.userId}
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
