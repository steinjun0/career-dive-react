import { styled } from "@mui/material";
import {
  CircleImg,
  colorBackgroundCareerDiveBlue,
  colorCareerDiveBlue,
  colorTextLight,
  EmptyHeight,
  Flex,
  LinkNoDeco,
  TextBody2,
  TextHeading6,
  TextSubtitle1,
  VerticalFlex
} from "util/styledComponent";
import testMentorImage from "../../assets/img/testMentorImage.png";
import Rating from "util/Rating";
import { Card } from "util/Card";
import { TagLarge, TagMedium, TagSmall } from "util/Custom/CustomTag";
import CustomRating from "util/Rating";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

function MentorCard({
  company = "기업명",
  department = "부서명",
  job = "직무",
  inJob = "현직자",
  duration = "기간",
  name = "이름",
  rating = 4.5,
  userId = 0,
  tags = ['태그1', '태그2', '태그3'],
  isShowRating = true,
  isShowTag = false
}) {
  return (
    <LinkNoDeco to={"/mentorCard/" + userId}>
      <Card
        title={
          <Flex>
            <TextHeading6>{company}</TextHeading6>
          </Flex>
        }
        no_divider="true"
        min_width="228px"
      >
        <EmptyHeight height={'6px'} />
        <TextBody2>{department}</TextBody2>
        <EmptyHeight height={'6px'} />
        <TextBody2>{job}</TextBody2>
        <EmptyHeight height={'28px'} />

        <VerticalFlex style={{ alignItems: 'center' }}>
          <CircleImg width={'88px'} src={testMentorImage} />
          <EmptyHeight height={'24px'} />
          <TextSubtitle1>{name}</TextSubtitle1>
          <EmptyHeight height={'8px'} />
          <TagMedium
            color={colorCareerDiveBlue}
            background_color={colorBackgroundCareerDiveBlue}
            style={{ fontWeight: '500', padding: '4px 8px', boxSizing: 'border-box' }}>

            {inJob} · {duration}
          </TagMedium>
          <EmptyHeight height={'24px'} />
          {isShowRating && <CustomRating value={rating}></CustomRating>}
          {isShowTag &&
            <Flex>
              {tags.map((e, i) =>
                <TextBody2
                  key={i}
                  style={{ marginRight: i !== (tags.length - 1) && '8px' }}
                  line_height={'18px'}
                  color={colorTextLight}>
                  #{e}
                </TextBody2>)}
            </Flex>
          }
          <EmptyHeight height={'12px'} />
        </VerticalFlex>


      </Card>
    </LinkNoDeco>
  );
}

export default MentorCard;
