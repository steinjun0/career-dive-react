import {
  colorTextBody,
  Flex,
  VerticalFlex,
} from "util/styledComponent";
import { Card } from "util/Card";
import { styled } from "@mui/material";

const IntroductionWrapper = styled(Flex)`
  width: 100%;
`;

const HtmlWrapper = styled('div')`
  font-size: 14px;
  line-height: 24px;
  color: ${colorTextBody};
`;

function Introduction({ introductionText = '' }) {
  // const introductionText = `<p>안녕하세요, 현재 (주)다파다의 디자이너로 재직 중인 다슬기입니다. Dapada Edu와 Stock 등의 서비스의 디자인 총괄을 맡고있습니다.안녕하세요, 현재 (주)다파다의 디자이너로 재직 중인 다슬기입니다. Dapada Edu와 Stock 등의 서비스의 디자인 총괄을 맡고있습니다.안녕하세요, 현재 (주)다파다의 디자이너로 재직 중인 다슬기입니다. Dapada Edu와 Stock 등의 서비스의 디자인 총괄을 맡고있습니다.안녕하세요, 현재 (주)다파다의 디자이너로 재직 중인 다슬기입니다. Dapada Edu와 Stock 등의 서비스의 디자인 총괄을 맡고있습니다.안녕하세요, 현재 (주)다파다의 디자이너로 재직 중인 다슬기입니다. Dapada Edu와 Stock 등의 서비스의 디자인 총괄을 맡고있습니다.</p>
  // <ul>
  //   <li>직무소개</li>
  //   <li>취업상담</li>
  //   <li>진로상담</li>
  //   <li>이직준비</li>
  //   <li>면접 팁</li>
  // </ul>

  // <p>안녕하세요, 현재 (주)다파다의 디자이너로 재직 중인 다슬기입니다. Dapada Edu와 Stock 등의 서비스의 디자인 총괄을 맡고있습니다.</p>`;
  return (
    <IntroductionWrapper >
      <Card no_divider={'true'} title={'멘토 소개'}>
        <VerticalFlex>
          <HtmlWrapper style={{ whiteSpace: 'wrap' }} dangerouslySetInnerHTML={{ __html: introductionText }}></HtmlWrapper>
        </VerticalFlex>
      </Card>
    </IntroductionWrapper>

  );
}

export default Introduction;
