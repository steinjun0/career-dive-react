import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  VerticalCenterAlignDiv,
  CircleImg,
  VerticalFlex,
  colorCareerDiveBlue,
} from "../util/styledComponent";

const CardWrapper = styled(VerticalFlex)`
  width: ${props => `${props.width}px`};
  border-radius: 8px;
  padding: 24px;
  background-color: white;
`;


const TitleWrapper = styled(VerticalCenterAlignDiv)`
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid #CFD6E0;
  padding-bottom: 16px;
`;

function Card(props) {
  return (
    <CardWrapper width={582}>
      <TitleWrapper>
        <span>{props.title}</span>
      </TitleWrapper>
      {props.children}
    </CardWrapper>
  );
}

export default Card;
