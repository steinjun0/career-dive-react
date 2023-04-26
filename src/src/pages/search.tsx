import { Flex, GrayBackground, MaxWidthDiv, VerticalFlex } from "util/styledComponent";
import MentorCard from "component/mentor/MentorCard";
import { useEffect, useState } from "react";
import * as accountAPI from "apis/account";
import React from 'react';
import { IMentor } from "interfaces/mentor";
function Search() {

  const [mentorList, setMentorList] = useState<IMentor[]>();
  useEffect(() => {
    accountAPI.getAccountMentorList({}).then((res) => {
      if (res.status === 200) {
        setMentorList(res.data.Results);
      }
    });
  }, []);

  return (
    <VerticalFlex>
      <GrayBackground style={{}}>
        <Flex style={{ flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: 60, padding: 30 }}>
          {
            mentorList && [...mentorList].map(
              (mentorData, index) => {
                return <Flex key={index} style={{ marginTop: 30, marginRight: 30 }}>
                  <MentorCard
                    mentorData={mentorData}
                    isShowRating={false}
                    isShowTag={true}
                  />
                </Flex>;
              }
            )
          }

        </Flex>



      </GrayBackground>
    </VerticalFlex>
  );
}

export default Search;
