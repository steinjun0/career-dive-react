import HomeBanner from "component/home/HomeBanner";
import JobCategoryGroup from "component/home/JobCategoryGroup";
import FamousMentorGroup from "component/home/FamousMentorGroup";
import BottomEventGroup from "component/home/BottomEventGroup";

import { Flex, GrayBackground, MaxWidthDiv, VerticalFlex } from "util/styledComponent";
import MentorCard from "component/mentor/MentorCard";
import { useEffect, useState } from "react";
import API from "API";

function Search() {
  const [mentorList, setMentorList] = useState()
  useEffect(() => {
    API.getAccountMentorList().then((res) => {
      if (res.status === 200) {
        setMentorList(res.data.Results)
      }
    })
  }, [])


  return (
    <VerticalFlex>
      <GrayBackground>
        <Flex>
          {mentorList && [...mentorList].map((mentorData, index) => {
            return <Flex style={{ margin: 15 }}>
              <MentorCard
                key={index}
                company={mentorData.CompName}
                department={mentorData.DivisInComp}
                job={mentorData.JobInComp}
                name={"Sarah"}
                inJob={mentorData.InService ? "현직자" : "경력자"}
                duration={"기간"}
                rating={4.5}
                userId={mentorData.UserID}
                isShowRating={false}
                isShowTag={true} />
            </Flex>

          }
          )}
        </Flex>

        {/* <MentorCard
          company={"LF"}
          department={"서비스 기획자"}
          job={"UX 리서처"}
          name={"Sarah"}
          inJob={"현직자"}
          duration={"기간"}
          rating={4.5}
          userId={1}
          isShowRating={false}
          isShowTag={true} /> */}
      </GrayBackground>
    </VerticalFlex>
  );
}

export default Search;
