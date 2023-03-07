import HomeBanner from "organism/home/HomeBanner";
import FamousMentorGroup from "organism/home/FamousMentorGroup";
import BottomEventGroup from "organism/home/BottomEventGroup";

import { Flex, GrayBackground, MaxWidthDiv, VerticalFlex } from "util/styledComponent";
import React from "react";

function App() {
  return (
    <VerticalFlex className="App">
      <HomeBanner></HomeBanner>
      <GrayBackground>
        <VerticalFlex sx={{ maxWidth: 'calc(1198px + 32px)', padding: '0 16px', width: '100%' }}>
          {/* <JobCategoryGroup></JobCategoryGroup> */}
          <FamousMentorGroup></FamousMentorGroup>
          <BottomEventGroup sx={{ margin: '80px 0 160px 0' }}></BottomEventGroup>
        </VerticalFlex>
      </GrayBackground>
    </VerticalFlex>
  );
}

export default App;
