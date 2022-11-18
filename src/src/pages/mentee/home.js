import HomeBanner from "component/home/HomeBanner";
import JobCategoryGroup from "component/home/JobCategoryGroup";
import FamousMentorGroup from "component/home/FamousMentorGroup";
import BottomEventGroup from "component/home/BottomEventGroup";

import { GrayBackground, MaxWidthDiv } from "util/styledComponent";

function App() {
  return (
    <div className="App">
      <HomeBanner></HomeBanner>
      <GrayBackground>
        <MaxWidthDiv>
          {/* <JobCategoryGroup></JobCategoryGroup> */}
          <FamousMentorGroup></FamousMentorGroup>
          <BottomEventGroup></BottomEventGroup>
        </MaxWidthDiv>
      </GrayBackground>
    </div>
  );
}

export default App;
