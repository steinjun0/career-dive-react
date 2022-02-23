import { styled } from "@mui/material";
import { VerticalCenterAlignDiv } from '../../util/styledComponent'
import JobCategoryCard from './JobCategoryCard'

import design from '../../assets/icon/jobCategory/design.svg'
import dev from '../../assets/icon/jobCategory/dev.svg'
import finance from '../../assets/icon/jobCategory/finance.svg'
import manufacturing from '../../assets/icon/jobCategory/manufacturing.svg'
import marketing from '../../assets/icon/jobCategory/marketing.svg'
import media from '../../assets/icon/jobCategory/media.svg'
import plan from '../../assets/icon/jobCategory/plan.svg'
import sales from '../../assets/icon/jobCategory/sales.svg'


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

const JobCategoryGroupWrapper = styled(VerticalCenterAlignDiv)`
    flex-direction: column;
    padding-top: 74px;
`;

const JobCategoryCardLine = styled(VerticalCenterAlignDiv)`
  align-items: center;
  margin-bottom: 25px;
`;

function JobCategoryGroup() {
    return (
        <JobCategoryGroupWrapper>
            <JobCategoryCardLine>
                <JobCategoryCard icon={marketing} name={'마케팅/광고/홍보'} ></JobCategoryCard>
                <JobCategoryCard icon={plan} name={'기획/전략'} ></JobCategoryCard>
                <JobCategoryCard icon={media} name={'방송/미디어'} ></JobCategoryCard>
                <JobCategoryCard icon={finance} name={'은행/금융'} ></JobCategoryCard>
            </JobCategoryCardLine>
            <JobCategoryCardLine>
                <JobCategoryCard icon={dev} name={'개발/IT'} ></JobCategoryCard>
                <JobCategoryCard icon={manufacturing} name={'제조/생산'} ></JobCategoryCard>
                <JobCategoryCard icon={sales} name={'판매/유통/물류'} ></JobCategoryCard>
                <JobCategoryCard icon={design} name={'문화/예술/디자인'} ></JobCategoryCard>
            </JobCategoryCardLine>
        </JobCategoryGroupWrapper>
    );
}

export default JobCategoryGroup;
