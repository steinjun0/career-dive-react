import { Flex, GrayBackground, MaxWidthDiv, VerticalFlex } from "util/styledComponent";
import MentorCard from "organisms/common/MentorCard";
import { useEffect, useState } from "react";
import * as accountAPI from "apis/account";
import React from 'react';
import { IMentor } from "interfaces/mentor";
import SearchBar from "organisms/search/SearchBar";
import SearchTags from "organisms/search/SearchTags";
function Search() {

  const [mentorList, setMentorList] = useState<IMentor[]>([]);
  useEffect(() => {
    accountAPI.getAccountMentorList({}).then((res) => {
      if (res.status === 200) {
        setMentorList(res.data.Results);
      }
    });
  }, []);

  return (
    <VerticalFlex>
      <VerticalFlex sx={{ alignItems: 'center', justifyContent: 'center', padding: '52px' }}>
        <SearchBar />
        <SearchTags />
      </VerticalFlex>
      <GrayBackground>
        <Flex sx={{ flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '1194px', gap: '30px', margin: '76px 16px' }}>
          {
            mentorList.map(
              (mentorData, index) => {
                return <MentorCard
                  key={index}
                  mentorData={mentorData}
                  isShowRating={false}
                  isShowTag={true}
                />;
              }
            )
          }
        </Flex>
      </GrayBackground>
    </VerticalFlex>
  );
}

export default Search;
