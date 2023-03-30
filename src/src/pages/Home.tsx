import HomeBanner from "organisms/home/HomeBanner";
import FamousMentorGroup from "organisms/home/FamousMentorGroup";
import BottomEventGroup from "organisms/home/EventGroup";
import * as accountAPI from "apis/account";
import { IMentorAPI } from "apis/account";

import { GrayBackground, VerticalFlex } from "util/styledComponent";
import React, { useEffect, useState } from "react";
import { IMentor } from "interfaces/mentor";

function Home() {
  const [mentors, setMentors] = useState<IMentor[]>([]);

  useEffect(() => {
    let isCancel = false;
    accountAPI.getAccountMentorList({ pageSize: 4, pageNum: Math.ceil(3 * (Math.random() + 1e-9)) }).then((res) => {
      if (!isCancel) {
        const mentors = res.data.Results.map((e: IMentorAPI): IMentor => {
          return {
            company: e.CompName,
            department: e.DivisInComp,
            divisIsPub: e.DivisIsPub,
            duration: e.TotEmpMonths,
            inJob: e.InService,
            job: e.JobInComp,
            nickname: e.Nickname,
            rating: 4.5,
            tags: e.TagList,
            userId: e.UserID
          };
        });
        setMentors(mentors);
      }
    });
    return () => {
      isCancel = true;
    };
  }, []);

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
