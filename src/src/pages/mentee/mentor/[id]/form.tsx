import { Grid } from "@mui/material";

import {
  CenterWidthWrapper,
  GrayBackground,
  Flex,
  MaxWidthDiv
} from "util/styledComponent";

import MentorProfile from 'organisms/mentor/Profile'
import Request from "organisms/mentee/mentor/Request";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as accountAPI from "apis/account";
import { IMentor } from "interfaces/mentor";

function MentoringForm() {
  const params = useParams()
  const [mentorData, setMentorData] = useState<IMentor>()  
  useEffect(() => {
    accountAPI.getAccountMentor(+params.id!).then((value) => {
      if (value.status === 200) {
        setMentorData(value.data)
      }
    })
  }, [])

  return (
    <GrayBackground sx={{ overflow: 'visible' }}>
      <Flex sx={{ minWidth: '100vw', backgroundColor: 'white', justifyContent: 'center' }}>
        <MaxWidthDiv>
          {mentorData && <MentorProfile
            name={mentorData.nickname}
            description={`${mentorData.company} ${mentorData.divisIsPub ? `| ${mentorData.department}` : ''} | ${mentorData.job}`}
            inService={mentorData.inJob==='현직자'}
            id={mentorData.userId} />}
        </MaxWidthDiv>
      </Flex>
      <CenterWidthWrapper sx={{ marginBottom: '158px' }}>
        <MaxWidthDiv>
          <Grid container spacing={'30px'} marginTop={0}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Request 
                type={params.type as "careerConsult" | "prepare"} 
              />
            </Grid>
          </Grid>
        </MaxWidthDiv>
      </CenterWidthWrapper>
    </GrayBackground>
  );
}

export default MentoringForm;
