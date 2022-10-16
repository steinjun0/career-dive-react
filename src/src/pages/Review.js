import { Flex, GrayBackground, TextHeading2, TextHeading5, VerticalFlex, colorCareerDiveBlue, TextHeading3, TextHeading6, EmptyHeight, colorBackgroundGrayMedium } from "util/styledComponent";
import MentorCard from "component/mentor/MentorCard";
import { useEffect, useState } from "react";
import API from "API";
import { Card } from "util/Card";
import CustomRating from "util/Rating";
import { Divider } from "@mui/material";

function Review() {
  const [mentorList, setMentorList] = useState()
  const [ratingValue, setRatingValue] = useState()
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
          <Card
            title={
              <Flex>
                <TextHeading5 color={colorCareerDiveBlue}>카카오농사꾼</TextHeading5>
                <TextHeading5>님과의 상담 어떠셨나요?</TextHeading5>
              </Flex>
            }
          >
            <EmptyHeight height={'28px'} />
            <TextHeading6>만족도</TextHeading6>
            <EmptyHeight height={'28px'} />
            <CustomRating
              value={ratingValue}
              setValue={setRatingValue}
              size="51px"
              readOnly={false} />
            <EmptyHeight height={'28px'} />
            <Divider style={{ color: colorBackgroundGrayMedium }} />

          </Card>
        </Flex>
      </GrayBackground>
    </VerticalFlex>
  );
}

export default Review;
