import { styled } from "@mui/material";
import { VerticalCenterAlignDiv, CircleImg } from '../../util/styledComponent'
import testMentorImage from '../../assets/img/testMentorImage.png'
import Rating from '../../util/Rating'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const FamousMentorCardWrapper = styled(VerticalCenterAlignDiv)`
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    width: 276px;
    height: 400px;
    background-color: white;
    border-radius: 8px;
`;

const Company = styled('span')`
    font-weight: 700;
    margin-left: 24px;
    margin-bottom: 8px;
    margin-top: 28px;
`;

const Department = styled('span')`
    font-size: 14px;
    margin-left: 24px;
    margin-bottom: 8px;
`;

const Job = styled('span')`
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
    color: #698CFF;
    border-radius: 4px;
    padding: 2px 4px;
    font-size: 12px;
    margin: 24px auto 6px auto;
`;

const Name = styled('span')`
    margin: 0 auto;
    margin-bottom: 24px;
`;

const RatingWrapper = styled(VerticalCenterAlignDiv)`
    height: 46px;
    color: #E25D7D;
    border-top: 1px solid #CFD6E0;
    width: 100%;
    justify-content: end;
`;

function FamousMentorCard({ icon, name }) {
    return (
        <FamousMentorCardWrapper>
            <Company>기업명</Company>
            <Department>부서명</Department>
            <Job>직무</Job>
            <ProfileImg src={testMentorImage}></ProfileImg>
            <Tag>현직자</Tag>
            <Name>다슬기</Name>
            <RatingWrapper>
                <Rating value={4.5} ></Rating>
            </RatingWrapper>
        </FamousMentorCardWrapper>
    );
}

export default FamousMentorCard;
