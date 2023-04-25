import { useMediaQuery, useTheme } from "@mui/material";
import MentorCard from "component/mentor/MentorCard";
import { IMentor } from "interfaces/mentor";
import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { colorCareerDiveBlue, Flex, LinkNoDeco, TextBody2, TextHeading6, TextSubtitle1, VerticalFlex } from "util/styledComponent";
import useWindowSize from "util/hooks/useWindowSize";


function useMaximumCardCount() {
  const { width, height } = useWindowSize();
  const [maxCardCount, setMaxCardCount] = useState<number>(0);
  useLayoutEffect(() => {
    if (width >= 1227) setMaxCardCount(4);
    else if (width >= 920) setMaxCardCount(3);
    else if (width >= 900) setMaxCardCount(2);
    else setMaxCardCount(4);
  }, [width]);
  return maxCardCount;
}

function FamousMentorGroup(props: { mentors: IMentor[]; }) {
  const theme = useTheme();
  const isDownHomeBreakPoint = useMediaQuery(theme.breakpoints.down(614));
  const maxCardCount = useMaximumCardCount();

  return (
    <VerticalFlex>

      {
        isDownHomeBreakPoint
          ?
          <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', marginBottom: '16px' }}>
            <TextSubtitle1>상담 가능한 멘토</TextSubtitle1>
            <LinkNoDeco to={'/search'} sx={{ color: colorCareerDiveBlue, zIndex: 2 }}><TextBody2>전체보기</TextBody2> </LinkNoDeco>
          </Flex>
          :
          <Flex sx={{ justifyContent: 'space-between', alignItems: 'end', marginTop: '55px', marginBottom: '30px' }}>
            <TextHeading6>상담 가능한 멘토</TextHeading6>
            <LinkNoDeco to={'/search'} sx={{ zIndex: 2 }}>전체보기</LinkNoDeco>
          </Flex>
      }

      {isDownHomeBreakPoint ?
        <Flex sx={{ gap: '16px', justifyContent: 'space-around', minHeight: '394px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {props.mentors.slice(0, maxCardCount).map((mentorData: IMentor, index: number) => {
            return <Flex key={index} sx={{ gridColumn: (index + 1) % 2, gridRow: ~~(index / 2) + 1 }}>
              <MentorCard
                company={mentorData.company}
                department={mentorData.divisIsPub ? mentorData.department : ''}
                job={mentorData.job}
                nickname={mentorData.nickname}
                inJob={mentorData.inJob}
                duration={mentorData.duration}
                rating={4.5}
                tags={mentorData.tags.slice(0, 3)}
                userId={mentorData.userId}
                isShowRating={false}
                isShowTag={true} divisIsPub={false} />
            </Flex>;
          })}
        </Flex>
        :
        <Flex sx={{ flexWrap: 'wrap', gap: '30px', justifyContent: 'space-around', minHeight: '394px', width: '100%' }}>
          {props.mentors.slice(0, maxCardCount).map((mentorData: IMentor, index: number) => {
            return (<MentorCard
              key={index}
              company={mentorData.company}
              department={mentorData.divisIsPub ? mentorData.department : ''}
              job={mentorData.job}
              nickname={mentorData.nickname}
              inJob={mentorData.inJob}
              duration={mentorData.duration}
              rating={4.5}
              tags={mentorData.tags.slice(0, 3)}
              userId={mentorData.userId}
              isShowRating={false}
              isShowTag={true} divisIsPub={false} />);
          })}
        </Flex>}
    </VerticalFlex>
  );
}

export default FamousMentorGroup;
