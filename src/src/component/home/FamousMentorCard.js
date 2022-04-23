import { styled } from "@mui/material";
import {
  RowAlignCenterFlex,
  CircleImg,
  LinkNoDeco,
  TextHeading6,
  TextBody2,
  colorTextBody
} from "util/styledComponent";
import testMentorImage from "../../assets/img/testMentorImage.png";
import Rating from "util/Rating";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const FamousMentorCardWrapper = styled(RowAlignCenterFlex)`
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 276px;
  height: 365px;
  background-color: white;
  border-radius: 8px;
  // box-shadow: 10px 20px 40px rgba(130, 130, 130, 0.1);
`;

const Company = styled(TextHeading6)`
  margin-left: 24px;
  margin-bottom: 6px;
  margin-top: 28px;
`;

const Department = styled(TextBody2)`
  font-size: 14px;
  color: ${colorTextBody};
  margin-left: 24px;
  margin-bottom: 6px;
`;

const Job = styled("span")`
  font-size: 14px;
  color: ${colorTextBody};
  margin-left: 24px;
  margin-bottom: 16px;
`;

const ProfileImg = styled(CircleImg)`
  width: 88px;
  height: 88px;
  margin: 0 auto;
`;

const Tag = styled(RowAlignCenterFlex)`
  background-color: rgba(105, 140, 255, 0.1);
  color: #698cff;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 12px;
  margin: 16px auto 6px auto;
  height: 20px;
`;

const Name = styled("span")`
  margin: 0 auto;
  margin-bottom: 36px;
`;

const RatingWrapper = styled(RowAlignCenterFlex)`
  height: 46px;
  color: #e25d7d;
  border-top: 1px solid #cfd6e0;
  width: 100%;
  justify-content: center;
`;

function FamousMentorCard({
  company = "기업명",
  department = "부서명",
  job = "직무",
  tag = "현직자",
  name = "이름",
  rating = 4.5,
  index = 0,
}) {
  return (
    <LinkNoDeco to={"/mentee/mentor/profile/" + index}>
      <FamousMentorCardWrapper>

        <Company>{company}</Company>
        <Department>{department}</Department>
        <Job>{job}</Job>

        <ProfileImg src={testMentorImage} />
        <Tag>{tag}</Tag>
        <Name>{name}</Name>

        <RatingWrapper>
          <Rating value={rating} />
        </RatingWrapper>

      </FamousMentorCardWrapper>
    </LinkNoDeco>
  );
}

export default FamousMentorCard;
