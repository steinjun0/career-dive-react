import { styled } from "@mui/material";
import { VerticalCenterAlignDiv } from '../../util/styledComponent'
import FamousMentorCard from './FamousMentorCard'


const GnbFullWidthWrapper = styled("div")`
      position: relative;
      display:flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 80px;
      width: 100%;
      background-color: white;
      border-bottom: 1px solid #E0E0E0;
      z-index: 3;
    `;

const FamousMentorGroupWrapper = styled(VerticalCenterAlignDiv)`
    flex-direction: column;
    align-items: start;
`;

const FamousMentorCardsWrapper = styled(VerticalCenterAlignDiv)`
    justify-content: space-between;
    width: 100%;
`;

const Title = styled('span')`
    font-weight: 700;
    font-size: 24px;
    margin-top: 55px;
    margin-bottom: 30px;
`;

function JobCategoryGroup() {
    return (
        <FamousMentorGroupWrapper>
            <Title>추천 인기 멘토</Title>
            <FamousMentorCardsWrapper>
                <FamousMentorCard company={'삼성전자'} department={'빅스비'} job={'비서'} tag={'현직자'} name='박서비' rating={3.5} ></FamousMentorCard>
                <FamousMentorCard></FamousMentorCard>
                <FamousMentorCard></FamousMentorCard>
                <FamousMentorCard></FamousMentorCard>
            </FamousMentorCardsWrapper>

        </FamousMentorGroupWrapper>
    );
}

export default JobCategoryGroup;
