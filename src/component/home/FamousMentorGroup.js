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

function JobCategoryGroup() {
    return (
        <FamousMentorGroupWrapper>
            <div>추천 인기 멘토</div>
            <FamousMentorCardsWrapper>
                <FamousMentorCard></FamousMentorCard>
                <FamousMentorCard></FamousMentorCard>
                <FamousMentorCard></FamousMentorCard>
                <FamousMentorCard></FamousMentorCard>
            </FamousMentorCardsWrapper>

        </FamousMentorGroupWrapper>
    );
}

export default JobCategoryGroup;
