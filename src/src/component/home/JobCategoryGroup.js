import { styled } from "@mui/material";
import { RowAlignCenterFlex } from 'util/styledComponent'
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

const JobCategoryGroupWrapper = styled(RowAlignCenterFlex)`
    flex-direction: column;
    padding-top: 74px;
    width: 100%;
`;

const JobCategoryCardLine = styled(RowAlignCenterFlex)`
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
                <JobCategoryCard icon={marketing} name={'마케팅·광고·홍보'} ></JobCategoryCard>
                <JobCategoryCard icon={plan} name={'서비스·콘텐츠 기획'} ></JobCategoryCard>
                <JobCategoryCard icon={media} name={'방송·미디어'} ></JobCategoryCard>
                <JobCategoryCard icon={finance} name={'은행·금융'} ></JobCategoryCard>
            </JobCategoryCardLine>

            <JobCategoryCardLine>
                <JobCategoryCard icon={dev} name={'IT·SW'} ></JobCategoryCard>
                <JobCategoryCard icon={manufacturing} name={'제조·생산·품질'} ></JobCategoryCard>
                <JobCategoryCard icon={sales} name={'유통·물류·무역'} ></JobCategoryCard>
                <JobCategoryCard icon={design} name={'디자인'} ></JobCategoryCard>
            </JobCategoryCardLine>

        </JobCategoryGroupWrapper>
    );
}

export default JobCategoryGroup;
