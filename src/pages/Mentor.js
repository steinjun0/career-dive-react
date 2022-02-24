import { styled } from "@mui/material";

import {
  FullWidthWrapper,
  CenterWidthWrapper,
} from "../util/styledComponent";

import MentorProfile from '../component/mentor/Profile'

const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: row;
  align-items: center;
`;


function Mentor() {
  return (
    <div>
      <FullWidthWrapper>
        <MetorProfileBanner>
          <MentorProfile name={'다슬기'} discription={'(주)다파다 | 무선사업부 | 디자이너'} />
        </MetorProfileBanner>
      </FullWidthWrapper>
    </div>
  );
}

export default Mentor;
