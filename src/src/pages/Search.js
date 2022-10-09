import HomeBanner from "component/home/HomeBanner";
import JobCategoryGroup from "component/home/JobCategoryGroup";
import FamousMentorGroup from "component/home/FamousMentorGroup";
import BottomEventGroup from "component/home/BottomEventGroup";

import { GrayBackground, MaxWidthDiv, VerticalFlex } from "util/styledComponent";
import MentorCard from "component/mentor/MentorCard";

function Search() {
  return (
    <VerticalFlex>
      <GrayBackground>
        <MentorCard
          company={"LF"}
          department={"서비스 기획자"}
          job={"UX 리서처"}
          name={"Sarah"}
          inJob={"현직자"}
          duration={"기간"}
          rating={4.5}
          userId={1}
          isShowRating={false}
          isShowTag={true} />
      </GrayBackground>
    </VerticalFlex>
  );
}

export default Search;
