import { styled } from "@mui/material";
import { VerticalCenterAlignDiv } from '../../util/styledComponent'

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
