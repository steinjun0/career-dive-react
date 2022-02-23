import { styled } from "@mui/material";
import { VerticalCenterAlignDiv } from '../../util/styledComponent'
import design from '../../assets/icon/jobCategory/design.svg'

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

const JobCategoryCardWrapper = styled(VerticalCenterAlignDiv)`
  width: 276px;
`;

const CategoryIcon = styled('img')`
  align-items: center;
  margin-right: 30px;
`;

const CategoryName = styled('span')`
  align-items: center;
  margin-right: 30px;
  font-weight: 700;
`;

function JobCategoryCard({ icon, name }) {
  return (
    <JobCategoryCardWrapper>
      <CategoryIcon src={icon} alt="" />
      <CategoryName>{name}</CategoryName>
    </JobCategoryCardWrapper>
  );
}

export default JobCategoryCard;
