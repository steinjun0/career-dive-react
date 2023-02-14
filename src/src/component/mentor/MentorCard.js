import { styled } from "@mui/material";
import {
  CircleImg,
  colorBackgroundCareerDiveBlue,
  colorBackgroundCareerDivePink,
  colorCareerDiveBlue,
  colorCareerDivePink,
  colorTextLight,
  EmptyHeight,
  Flex,
  LinkNoDeco,
  TextBody2,
  TextHeading6,
  TextSubtitle1,
  VerticalFlex
} from "util/styledComponent";
// import testMentorImage from "../../assets/img/testMentorImage.png";
import testMentorImage from '../../assets/img/logo/testProfileImage.png';
import Rating from "util/Rating";
import { Card } from "util/Card";
import { TagLarge, TagMedium, TagSmall } from "util/Custom/CustomTag";
import CustomRating from "util/Rating";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

function getJobDurationFormat(year) {
  if (year < 1)
    return '1년 미만'
  else if (1 <= year && year < 3)
    return '1~3년'
  else if (year >= 3)
    return '3년 이상'

}

function MentorCard({
  company = "기업명",
  department = "부서명",
  job = "직무",
  inJob = "현직자",
  duration = "",
  name = "이름",
  rating = 4.5,
  userId = 0,
  tags = ['태그1', '태그2', '태그3'],
  isShowRating = true,
  isShowTag = false
}) {
  return (
    <LinkNoDeco to={"/mentor/" + userId}>
      <Card
        title={
          <Flex>
            <TextHeading6>{company}</TextHeading6>
          </Flex>
        }
        no_divider="true"
        min_width="228px"
        max_width="228px"
        style={{
          minHeight: '346px'
        }}
      >
        <EmptyHeight height={'6px'} />
        {department !== '' && <TextBody2>{department}</TextBody2>}
        {department !== '' && <EmptyHeight height={'6px'} />}
        <TextBody2 style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{job}</TextBody2>
        <EmptyHeight height={'28px'} />
        {department === '' && <EmptyHeight height={'30px'} />}

        <VerticalFlex style={{ alignItems: 'center' }}>
          <CircleImg width={'88px'} src={testMentorImage} />
          <EmptyHeight height={'24px'} />
          <TextSubtitle1>{name}</TextSubtitle1>
          <EmptyHeight height={'8px'} />
          <TagMedium
            color={inJob === '경력자' ? colorCareerDivePink : colorCareerDiveBlue}
            background_color={inJob === '경력자' ? colorBackgroundCareerDivePink : colorBackgroundCareerDiveBlue}
            style={{ fontWeight: '500', padding: '4px 8px', boxSizing: 'border-box' }}>

            {inJob} {duration !== '' ? `· ${getJobDurationFormat(+duration)}` : ''}
          </TagMedium>
          <EmptyHeight height={'24px'} />
          {isShowRating && <CustomRating value={rating}></CustomRating>}
          {isShowTag && tags.length !== 0 ?
            <Flex style={{ justifyContent: 'center', maxWidth: '100%' }}>
              {tags.slice(0, 3).map((e, i) =>
                <TextBody2
                  key={i}
                  style={{ marginRight: i !== (tags.length - 1) && '8px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                  line_height={'18px'}
                  color={colorTextLight}>
                  #{e}
                </TextBody2>)}
            </Flex>
            :
            <EmptyHeight height="18px" />
          }
          <EmptyHeight height={'12px'} />
        </VerticalFlex>


      </Card>
    </LinkNoDeco>
  );
}

export default MentorCard;
