import HomeBanner from "organism/home/HomeBanner";
import FamousMentorGroup from "organism/home/FamousMentorGroup";
import BottomEventGroup from "organism/home/BottomEventGroup";

import { GrayBackground, MaxWidthDiv, VerticalFlex } from "util/styledComponent";
import React from "react";

function App() {
  return (
    <div className="App">
      <HomeBanner></HomeBanner>
      <GrayBackground>
        <VerticalFlex>
          {/* <JobCategoryGroup></JobCategoryGroup> */}
          <FamousMentorGroup></FamousMentorGroup>
          <BottomEventGroup></BottomEventGroup>
        </VerticalFlex>
      </GrayBackground>
    </div>
  );
}

export default App;
