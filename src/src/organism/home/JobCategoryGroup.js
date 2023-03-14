import { styled } from "@mui/material";
import { RowAlignCenterFlex } from 'util/styledComponent'
import JobCategoryCard from '../../component/home/JobCategoryCard'

import design from '../../assets/icon/jobCategory/design.svg'
import dev from '../../assets/icon/jobCategory/dev.svg'
import finance from '../../assets/icon/jobCategory/finance.svg'
import manufacturing from '../../assets/icon/jobCategory/manufacturing.svg'
import marketing from '../../assets/icon/jobCategory/marketing.svg'
import media from '../../assets/icon/jobCategory/media.svg'
import contents from '../../assets/icon/jobCategory/contents.svg'
import logistics from '../../assets/icon/jobCategory/logistics.svg'

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
                <JobCategoryCard icon={contents} name={'서비스·콘텐츠 기획'} ></JobCategoryCard>
                <JobCategoryCard icon={dev} name={'IT·SW'} ></JobCategoryCard>
                <JobCategoryCard icon={design} name={'디자인'} ></JobCategoryCard>

            </JobCategoryCardLine>

            <JobCategoryCardLine>
                <JobCategoryCard icon={manufacturing} name={'제조·생산·품질'} ></JobCategoryCard>
                <JobCategoryCard icon={logistics} name={'유통·물류·무역'} ></JobCategoryCard>
                <JobCategoryCard icon={finance} name={'은행·금융'} ></JobCategoryCard>
                <JobCategoryCard icon={media} name={'방송·미디어'} ></JobCategoryCard>

            </JobCategoryCardLine>

        </JobCategoryGroupWrapper>
    );
}

export default JobCategoryGroup;
