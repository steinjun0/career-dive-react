import { styled } from "@mui/material";
import testMentorImage from "../../assets/img/testMentorImage.png";
import Button from "@mui/material/Button";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import EditCalendarIcon from "../../assets/icon/editCalendar.svg";

import {
  RowAlignCenterFlex,
  CircleImg,
  VerticalFlex,
  colorCareerDiveBlue,
  colorBackgroundGrayLight,
  colorCareerDivePink,
  colorTextLight,
  EmptyWidth,
  colorBackgroundCareerDiveBlue,
  EmptyHeight,
  TextHeading6,
  TextBody1,
  TextSubtitle2,
  TextButton
} from "util/styledComponent";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TagLarge, TagMedium, TagSmall } from "util/Custom/CustomTag";

const MentorProfileWrapper = styled(RowAlignCenterFlex)`
  height: 200px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const MentorProfileImg = styled(CircleImg)`
  width: 120px;
  height: 120px;
`;

const ProfileTexts = styled(VerticalFlex)`
  margin-left: 30px;
  align-items: start;
  justify-content: space-between;
`;

const Name = styled(RowAlignCenterFlex)`
  font-weight: 700;
  margin-bottom: 8px;
`;

const Discription = styled(RowAlignCenterFlex)``;

const Buttons = styled(RowAlignCenterFlex)`
  margin-left: auto;
  height: 40px;
  justify-content: space-between;
`;

const FavoriteMentorButton = styled(Button)`
  min-width: 40px;
  min-height: 40px;
  background-color: ${colorBackgroundGrayLight};
  color: white;
  &:hover {
    background-color: ${colorBackgroundGrayLight};
    color: white;
  }
`;

const FavoriteMentorButtonClicked = styled(Button)`
  min-width: 40px;
  min-height: 40px;
  background-color: rgba(226, 93, 125, 0.2);;
  color: white;
  &:hover {
    background-color: rgba(226, 93, 125, 0.2);;
    color: white;
  }
`;

const ApplyMentoringButton = styled(Button)`
  width: 100px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;
  background-color: ${colorCareerDiveBlue};
  color: white;
  &:hover {
    background-color: ${colorCareerDiveBlue};
    color: white;
  }
  border-radius: 8px;
`;

function FavoriteButton({ isFavorite, setIsFavorite }) {
  if (isFavorite) {
    return (<FavoriteMentorButtonClicked disableElevation onClick={() => { setIsFavorite(false) }}>
      <BookmarkBorderIcon style={{ color: colorCareerDivePink }} />
    </FavoriteMentorButtonClicked>)
  }
  else {
    return (<FavoriteMentorButton disableElevation onClick={() => { setIsFavorite(true) }}>
      <BookmarkBorderIcon style={{ color: colorTextLight }} />
    </FavoriteMentorButton>)
  }
}


function MentorProfile({ name = '', discription = '', id = -1 }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const navigater = useNavigate();
  const params = useParams();
  return (
    <MentorProfileWrapper>
      <MentorProfileImg src={testMentorImage} alt="profile-image" />
      <ProfileTexts>
        <TextHeading6>{name} 멘토</TextHeading6>
        <EmptyHeight height='4px'></EmptyHeight>
        <TextBody1>{discription}</TextBody1>
        <EmptyHeight height='8px'></EmptyHeight>
        <TagMedium style={{ padding: '0 8px' }} color={colorCareerDiveBlue} background_color={colorBackgroundCareerDiveBlue}><TextButton>현직자</TextButton></TagMedium>
      </ProfileTexts>
      <Buttons>
        <FavoriteButton isFavorite={isFavorite} setIsFavorite={setIsFavorite}></FavoriteButton>
        <EmptyWidth width='12px'></EmptyWidth>
        <ApplyMentoringButton
          disableElevation
          onClick={() => { navigater(`/mentee/request/${id}`) }}
        >
          상담 신청
        </ApplyMentoringButton>
      </Buttons>
    </MentorProfileWrapper>
  );
}

export default MentorProfile;
