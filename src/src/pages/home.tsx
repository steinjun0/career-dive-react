import HomeBanner from "organism/home/HomeBanner";
import FamousMentorGroup from "organism/home/FamousMentorGroup";
import BottomEventGroup from "organism/home/BottomEventGroup";
import * as accountAPI from "apis/account";

import { Flex, GrayBackground, MaxWidthDiv, VerticalFlex } from "util/styledComponent";
import React, { useEffect, useState } from "react";
import { IMentor } from "interfaces/mentor";

function Home() {
  const [mentors, setMentors] = useState<IMentor[]>([])

  useEffect(() => {
    let isCancel = false
    accountAPI.getAccountMentorList().then((res) => {
      if (!isCancel)
        setMentors(res.data.Results)
    })
    return () => {
      isCancel = true
    }
  }, [])

  return (
    <VerticalFlex>
      <HomeBanner></HomeBanner>
      <GrayBackground>
        <VerticalFlex sx={{ maxWidth: 'calc(1198px + 32px)', padding: '0 16px', width: '100%', gap: '80px', marginBottom: '160px' }}>
          <FamousMentorGroup mentors={mentors}></FamousMentorGroup>
          <BottomEventGroup></BottomEventGroup>
        </VerticalFlex>
      </GrayBackground>
    </VerticalFlex>
  );
}

export default Home;
