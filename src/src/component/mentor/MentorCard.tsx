import { styled, useMediaQuery, useTheme } from "@mui/material";
import {
  CircleImg,
  colorBackgroundCareerDiveBlue,
  colorBackgroundCareerDivePink,
  colorCareerDiveBlue,
  colorCareerDivePink,
  colorTextLight,
  defaultBoxShadow,
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
import Card from "util/ts/Card";
import { TagLarge, TagMedium, TagSmall } from "util/Custom/CustomTag";
import CustomRating from "util/Rating";
import React from "react";
import { IMentor } from "interfaces/mentor";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

function getJobDurationFormat(year: number) {
  if (year < 1)
    return '1년 미만'
  else if (1 <= year && year < 3)
    return '1~3년'
  else if (year >= 3)
    return '3년 이상'

}

function MentorCard({
  company = "기업명",
  department,
  job = "직무",
  inJob = "현직자",
  duration = 0,
  nickname = "이름",
  rating = 4.5,
  userId = 0,
  tags = ['태그1', '태그2', '태그3'],
  isShowRating = true,
  isShowTag = false
}: IMentor & { isShowRating: boolean, isShowTag: boolean }) {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <LinkNoDeco to={"/mentor/" + userId}>
      {
        isDownMd ?
          <VerticalFlex>

          </VerticalFlex>
          :
          <VerticalFlex
            sx={{
              minHeight: '346px',
              minWidth: '276px',
              maxWidth: '276px',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: defaultBoxShadow
            }}
          >
            <TextHeading6 sx={{ marginBottom: '6px' }}>{company}</TextHeading6>
            {department && <TextBody2 sx={{ marginBottom: '6px' }}>{department}</TextBody2>}
            <TextBody2 sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginBottom: '28px' }}>{job}</TextBody2>
            {!department && <EmptyHeight height={'30px'} />}

            <VerticalFlex style={{ alignItems: 'center', paddingBottom: '12px' }}>
              <CircleImg sx={{ width: '88px', marginBottom: '24px' }} src={testMentorImage} />
              <TextSubtitle1 sx={{ marginBottom: '8px' }}>{nickname}</TextSubtitle1>
              <TagMedium
                color={inJob === '경력자' ? colorCareerDivePink : colorCareerDiveBlue}
                background_color={inJob === '경력자' ? colorBackgroundCareerDivePink : colorBackgroundCareerDiveBlue}
                sx={{ fontWeight: '500', padding: '4px 8px', boxSizing: 'border-box', marginBottom: '24px' }}>
                {inJob} {duration ? `· ${getJobDurationFormat(duration)}` : ''}
              </TagMedium>
              {isShowRating && <CustomRating value={rating}></CustomRating>}
              {isShowTag && tags.length !== 0 ?
                <Flex style={{ justifyContent: 'center', maxWidth: '100%' }}>
                  {tags.slice(0, 3).map((e, i) =>
                    <TextBody2
                      key={i}
                      style={{ marginRight: i !== (tags.length - 1) ? '8px' : '', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                      line_height={'18px'}
                      color={colorTextLight}>
                      #{e}
                    </TextBody2>)}
                </Flex>
                :
                <EmptyHeight height="18px" />
              }
            </VerticalFlex>
          </VerticalFlex>
      }

    </LinkNoDeco>
  );
}

export default MentorCard;
