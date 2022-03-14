import { styled } from "@mui/material";
import { VerticalCenterAlignFlex } from '../../util/styledComponent'
import JobCategoryCard from './JobCategoryCard'

import design from '../../assets/icon/jobCategory/design.png'
import dev from '../../assets/icon/jobCategory/dev.png'
import finance from '../../assets/icon/jobCategory/finance.png'
import manufacturing from '../../assets/icon/jobCategory/manufacturing.png'
import marketing from '../../assets/icon/jobCategory/marketing.png'
import media from '../../assets/icon/jobCategory/media.png'
import plan from '../../assets/icon/jobCategory/plan.png'
import sales from '../../assets/icon/jobCategory/sales.png'

// change job category icon svg to png
// before svg file is from figma, which is converted from image not vector
// because of that, it created blurry image.
// So I decide change image png to svg, although it increases file size

const JobCategoryGroupWrapper = styled(VerticalCenterAlignFlex)`
    flex-direction: column;
    padding-top: 74px;
    width: 100%;
`;

const JobCategoryCardLine = styled(VerticalCenterAlignFlex)`
  align-items: center;
  margin-bottom: 25px;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
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