import { styled } from "@mui/material";
import { VerticalCenterAlignFlex } from '../../util/styledComponent'

const JobCategoryCardWrapper = styled(VerticalCenterAlignFlex)`
  width: 276px;
`;

const CategoryIcon = styled('img')`
  align-items: center;
  margin-right: 30px;
  width: 54px;
  height: 54px;
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
