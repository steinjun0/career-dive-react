import { styled, useMediaQuery, useTheme } from "@mui/material";
import * as accountAPI from "apis/account";
import MentorCard from "component/mentor/MentorCard";
import { IMentor } from "interfaces/mentor";
import React, { useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import { EmptyWidth, Flex, LinkNoDeco, RowAlignCenterFlex, VerticalFlex } from "util/styledComponent";
import useWindowSize from "util/useWindowSize";

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

  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { width, height } = useWindowSize()
  const [mentorList, setMentorList] = useState<IMentor[]>([])
  const [maxCardCount, setMaxCardCount] = useState<number>(0)
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

  useLayoutEffect(() => {
    if (width >= 1227) setMaxCardCount(4);
    else if (width >= 920) setMaxCardCount(3);
    else setMaxCardCount(2)
  }, [width])


  return (
    <VerticalFlex>
      <TopWrapper>
        <Title>상담 가능한 멘토</Title>
        <LinkNoDeco to={'/search'} style={{ zIndex: 2 }}><SellAll>전체보기</SellAll></LinkNoDeco>
      </TopWrapper>

      <Flex sx={{ flexWrap: 'wrap', gap: '30px', justifyContent: 'space-around', minHeight: '394px', width: '100%' }}>
        {mentorList && mentorList.slice(0, maxCardCount).map((mentorData: IMentor, index: number) => {
          return <MentorCard
            key={index}
            company={mentorData.company}
            department={mentorData.divisIsPub ? mentorData.department : ''}
            job={mentorData.job}
            nickname={mentorData.nickname}
            inJob={mentorData.inJob ? "현직자" : "경력자"}
            duration={mentorData.duration}
            rating={4.5}
            tags={mentorData.tags.slice(0, 3)}
            userId={mentorData.userId}
            isShowRating={false}
            isShowTag={true} divisIsPub={false} />
        })}
      </Flex>
    </VerticalFlex>
  );
}

export default JobCategoryGroup;
