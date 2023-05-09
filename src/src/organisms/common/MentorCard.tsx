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
  TextCaption,
  TextHeading6,
  TextSubtitle1,
  TextSubtitle2,
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
    return '1년 미만';
  else if (1 <= year && year < 3)
    return '1~3년';
  else if (year >= 3)
    return '3년 이상';

}

function MentorCard({
  mentorData,
  isShowRating = true,
  isShowTag = false
}: { mentorData: IMentor, isShowRating: boolean, isShowTag: boolean; }) {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down(614));

  return (
    <>
      {
        isDownSm ?
          <LinkNoDeco to={"/mentee/mentor/" + mentorData.userId} sx={{ width: '100%', cursor: 'pointer' }}>
            <VerticalFlex
              sx={{
                minHeight: '224px',
                minWidth: '156px',
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <TextSubtitle2 sx={{ marginBottom: '2px' }}>{mentorData.company}</TextSubtitle2>
              {mentorData.department && <TextCaption sx={{ marginBottom: '4px', color: colorTextLight }}>{mentorData.department}</TextCaption>}
              <TextCaption sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginBottom: '16px', color: colorTextLight }}>{mentorData.job}</TextCaption>
              {!mentorData.department && <EmptyHeight height={'15px'} />}

              <VerticalFlex style={{ alignItems: 'center' }}>
                <CircleImg sx={{ width: '48px', marginBottom: '8px' }} src={testMentorImage} />
                <TextSubtitle2 sx={{ marginBottom: '8px' }}>{mentorData.nickname}</TextSubtitle2>
                <TagSmall
                  color={mentorData.inJob ? colorCareerDiveBlue : colorCareerDivePink}
                  background_color={mentorData.inJob ? colorBackgroundCareerDiveBlue : colorBackgroundCareerDivePink}
                  sx={{ fontWeight: '500', padding: '4px 6px', marginBottom: '8px' }}>
                  {mentorData.inJob ? '현직자' : '경력자'} {mentorData.duration ? `· ${getJobDurationFormat(mentorData.duration)}` : ''}
                </TagSmall>
              </VerticalFlex>
            </VerticalFlex>
          </LinkNoDeco>
          :
          <LinkNoDeco to={"/mentee/mentor/" + mentorData.userId}>
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
              <TextHeading6 sx={{ marginBottom: '6px' }}>{mentorData.company}</TextHeading6>
              {mentorData.department && <TextBody2 sx={{ marginBottom: '6px' }}>{mentorData.department}</TextBody2>}
              <TextBody2 sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginBottom: '28px' }}>{mentorData.job}</TextBody2>
              {!mentorData.department && <EmptyHeight height={'30px'} />}

              <VerticalFlex style={{ alignItems: 'center', paddingBottom: '12px' }}>
                <CircleImg sx={{ width: '88px', marginBottom: '24px' }} src={testMentorImage} />
                <TextSubtitle1 sx={{ marginBottom: '8px' }}>{mentorData.nickname}</TextSubtitle1>
                <TagMedium
                  color={mentorData.inJob ? colorCareerDiveBlue : colorCareerDivePink}
                  background_color={mentorData.inJob ? colorBackgroundCareerDiveBlue : colorBackgroundCareerDivePink}
                  sx={{ fontWeight: '500', padding: '4px 8px', boxSizing: 'border-box', marginBottom: '24px' }}>
                  {mentorData.inJob ? '현직자' : '경력자'} {mentorData.duration ? `· ${getJobDurationFormat(mentorData.duration)}` : ''}
                </TagMedium>
                {isShowRating && <CustomRating value={mentorData.rating}></CustomRating>}
                {isShowTag && mentorData.tags.length !== 0 ?
                  <Flex style={{ justifyContent: 'center', maxWidth: '100%' }}>
                    {mentorData.tags.slice(0, 3).map((e, i) =>
                      <TextBody2
                        key={i}
                        style={{ marginRight: i !== (mentorData.tags.length - 1) ? '8px' : '', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
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
          </LinkNoDeco>
      }

    </>
  );
}

export default MentorCard;
