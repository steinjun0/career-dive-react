import { styled } from "@mui/material";
import {
  VerticalCenterAlignDiv,
  CircleImg,
  LinkNoDeco,
} from "../../util/styledComponent";
import testMentorImage from "../../assets/img/testMentorImage.png";
import Rating from "../../util/Rating";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const FamousMentorCardWrapper = styled(VerticalCenterAlignDiv)`
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 276px;
  height: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 10px 20px 40px rgba(130, 130, 130, 0.1);
`;

const Company = styled("span")`
  font-weight: 700;
  margin-left: 24px;
  margin-bottom: 8px;
  margin-top: 28px;
`;

const Department = styled("span")`
  font-size: 14px;
  margin-left: 24px;
  margin-bottom: 8px;
`;

const Job = styled("span")`
  font-size: 14px;
  margin-left: 24px;
  margin-bottom: 24px;
`;

const ProfileImg = styled(CircleImg)`
  width: 120px;
  margin: 0 auto;
`;

const Tag = styled(VerticalCenterAlignDiv)`
  background-color: rgba(105, 140, 255, 0.1);
  color: #698cff;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 12px;
  margin: 24px auto 6px auto;
`;

const Name = styled("span")`
  margin: 0 auto;
  margin-bottom: 24px;
`;

const RatingWrapper = styled(VerticalCenterAlignDiv)`
  height: 46px;
  color: #e25d7d;
  border-top: 1px solid #cfd6e0;
  width: 100%;
  justify-content: end;
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
    <LinkNoDeco to={"/mentor/" + index}>
      <FamousMentorCardWrapper>
        <Company>{company}</Company>
        <Department>{department}</Department>
        <Job>{job}</Job>
        <ProfileImg src={testMentorImage}></ProfileImg>
        <Tag>{tag}</Tag>
        <Name>{name}</Name>
        <RatingWrapper>
          <Rating value={rating}></Rating>
        </RatingWrapper>
      </FamousMentorCardWrapper>
    </LinkNoDeco>
  );
}

export default FamousMentorCard;
