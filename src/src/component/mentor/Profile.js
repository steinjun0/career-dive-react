import { styled, useMediaQuery, useTheme } from "@mui/material";
import testMentorImage from "../../assets/img/logo/testProfileImage.png";
import Button from "@mui/material/Button";

import {
  RowAlignCenterFlex,
  CircleImg,
  VerticalFlex,
  colorCareerDiveBlue,
  colorBackgroundGrayLight,
  colorCareerDivePink,
  colorBackgroundCareerDiveBlue,
  EmptyHeight,
  TextHeading6,
  TextBody1,
  TextButton,
  colorBackgroundCareerDivePink,
  Flex
} from "util/styledComponent";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TagLarge, TagMedium, TagSmall } from "util/Custom/CustomTag";
import FavoriteButton from "./FavoriteButton";


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

// function FavoriteButton({ isFavorite, setIsFavorite }) {
//   if (isFavorite) {
//     return (<FavoriteMentorButtonClicked disableElevation onClick={() => { setIsFavorite(false) }}>
//       <BookmarkBorderIcon style={{ color: colorCareerDivePink }} />
//     </FavoriteMentorButtonClicked>)
//   }
//   else {
//     return (<FavoriteMentorButton disableElevation onClick={() => { setIsFavorite(true) }}>
//       <BookmarkBorderIcon style={{ color: colorTextLight }} />
//     </FavoriteMentorButton>)
//   }
// }


function MentorProfile({ name = '', description = '', inService = true, id = -1 }) {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const [isFavorite, setIsFavorite] = useState(false)
  const navigater = useNavigate();
  const params = useParams();
  const location = useLocation();
  return (
    <MentorProfileWrapper>
      <MentorProfileImg src={testMentorImage} alt="profile-image" />
      <ProfileTexts>
        <TextHeading6>{name} 멘토</TextHeading6>
        <EmptyHeight height='4px'></EmptyHeight>
        <TextBody1>{description}</TextBody1>
        <EmptyHeight height='8px'></EmptyHeight>
        {inService ?
          <TagMedium style={{ padding: '0 8px' }} color={colorCareerDiveBlue} background_color={colorBackgroundCareerDiveBlue}><TextButton>현직자</TextButton></TagMedium> :
          <TagMedium style={{ padding: '0 8px' }} color={colorCareerDivePink} background_color={colorBackgroundCareerDivePink}><TextButton>경력자</TextButton></TagMedium>}
      </ProfileTexts>


      {!isDownMd && <Flex style={{
        marginLeft: 'auto',
        height: '40px',
        justifyContent: 'space-between'
      }}
      >
        <FavoriteButton
          menteeId={+localStorage.getItem('UserID')}
          mentorId={+params.id}
        />
        {!location.pathname.includes('mentee/request/') && <ApplyMentoringButton
          disableElevation
          style={{ marginLeft: 12 }}
          onClick={() => { navigater(`/mentee/request/${id}`) }}
        >
          상담 신청
        </ApplyMentoringButton>}
      </Flex>}

      {/* {!isDownMd && <Buttons>
        <FavoriteButton isFavorite={isFavorite} setIsFavorite={setIsFavorite}></FavoriteButton>

        {!location.pathname.includes('mentee/request/') && <ApplyMentoringButton
          disableElevation
          style={{ marginLeft: 12 }}
          onClick={() => { navigater(`/mentee/request/${id}`) }}
        >
          상담 신청
        </ApplyMentoringButton>}
      </Buttons>} */}

    </MentorProfileWrapper>
  );
}

export default MentorProfile;
