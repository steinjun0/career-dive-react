import { styled } from "@mui/material";
import testMentorImage from "../../assets/img/testMentorImage.png";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditCalandarIcon from "../../assets/icon/editCalandar.svg";

import {
  VerticalCenterAlignFlex,
  CircleImg,
  VerticalFlex,
  colorCareerDiveBlue,
} from "../../util/styledComponent";

const MentorProfileWrapper = styled(VerticalCenterAlignFlex)`
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

const Tag = styled(VerticalCenterAlignFlex)`
  background-color: rgba(105, 140, 255, 0.1);
  color: #698cff;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  height: 20px;
  margin-bottom: 8px;
`;

const Name = styled(VerticalCenterAlignFlex)`
  font-weight: 700;
  margin-bottom: 8px;
`;

const Discription = styled(VerticalCenterAlignFlex)``;

const Buttons = styled(VerticalCenterAlignFlex)`
  margin-left: auto;
  height: 32px;
  width: 244px;
  justify-content: space-between;
`;

const FavoriteMentorButton = styled(Button)`
  width: 92px;
  height: 32px;
  background-color: #bdbdbd;
  color: white;
  &:hover {
    background-color: #bdbdbd;
    color: white;
  }
`;

const ApplyMentoringButton = styled(Button)`
  width: 122px;
  height: 32px;
  background-color: ${colorCareerDiveBlue};
  color: white;
  &:hover {
    background-color: ${colorCareerDiveBlue};
    color: white;
  }
`;

function MentorProfile({ name = '', discription = '' }) {
  return (
    <MentorProfileWrapper>
      <MentorProfileImg src={testMentorImage} alt="profile-image" />
      <ProfileTexts>
        <Tag>현직자</Tag>
        <Name>{name} 멘토</Name>
        <Discription>{discription}</Discription>
      </ProfileTexts>
      <Buttons>
        <FavoriteMentorButton startIcon={<FavoriteIcon />} disableElevation>
          멘토 찜
        </FavoriteMentorButton>
        <ApplyMentoringButton
          startIcon={<img src={EditCalandarIcon} alt={'calendar'} />}
          disableElevation
        >
          멘토링 신청
        </ApplyMentoringButton>
      </Buttons>
    </MentorProfileWrapper>
  );
}

export default MentorProfile;
