import { styled } from "@mui/material";
import testMentorImage from "../../assets/img/testMentorImage.png";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import EditCalandarIcon from "../../assets/icon/editCalandar.svg";

import {
  RowAlignCenterFlex,
  CircleImg,
  VerticalFlex,
  colorCareerDiveBlue,
  colorBackgroundGrayLight,
  colorCareerDivePink,
  colorTextLight,
  EmptyWidth
} from "util/styledComponent";
import { useState } from "react";

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
  height: 84px;
  margin-left: 30px;
  align-items: start;
`;

const Tag = styled(RowAlignCenterFlex)`
  background-color: rgba(105, 140, 255, 0.1);
  color: #698cff;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  height: 20px;
  margin-bottom: 8px;
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
  width: 122px;
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
      <FavoriteIcon style={{ color: colorCareerDivePink }} />
    </FavoriteMentorButtonClicked>)
  }
  else {
    return (<FavoriteMentorButton disableElevation onClick={() => { setIsFavorite(true) }}>
      <FavoriteIcon style={{ color: colorTextLight }} />
    </FavoriteMentorButton>)
  }
}

function MentorProfile({ name = '', discription = '' }) {
  const [isFavorite, setIsFavorite] = useState(false)
  return (
    <MentorProfileWrapper>
      <MentorProfileImg src={testMentorImage} alt="profile-image" />
      <ProfileTexts>
        <Tag>현직자</Tag>
        <Name>{name} 멘토</Name>
        <Discription>{discription}</Discription>
      </ProfileTexts>
      <Buttons>
        <FavoriteButton isFavorite={isFavorite} setIsFavorite={setIsFavorite}></FavoriteButton>
        <EmptyWidth width='12px'></EmptyWidth>
        <ApplyMentoringButton
          startIcon={<img src={EditCalandarIcon} alt={'calendar'} />}
          disableElevation
        >
          상담 신청
        </ApplyMentoringButton>
      </Buttons>
    </MentorProfileWrapper>
  );
}

export default MentorProfile;
