import { styled } from "@mui/material";
import { VerticalCenterAlignFlex, TextSubtitle1 } from '../../util/styledComponent'

const JobCategoryCardWrapper = styled(VerticalCenterAlignFlex)`
  width: 276px;
`;

const CategoryIcon = styled('img')`
  align-items: center;
  margin-right: 16px;
`;

const CategoryName = styled(TextSubtitle1)`
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
