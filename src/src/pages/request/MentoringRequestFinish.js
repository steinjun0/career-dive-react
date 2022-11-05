import {
  TextBody2,
  EmptyHeight,
  TextHeading6,
  VerticalFlex,
  RowAlignCenterFlex,
  TextHeading4,
  TextBody1,
} from "util/styledComponent";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate } from "react-router-dom";

function MentoringRequestFinish() {
  const navigate = useNavigate();
  return <VerticalFlex style={{ justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 80px - 218px)' }}>
    <VerticalFlex style={{ width: '378px' }}>
      <RowAlignCenterFlex style={{ justifyContent: 'space-between' }}>
        <TextHeading4>
          상담 신청 완료 👍
        </TextHeading4>
      </RowAlignCenterFlex>
      <EmptyHeight height='16px' />
      <TextBody1 style={{ fontSize: '20px' }}>
        멘토가 24시간 내에 상담 수락 여부를 결정할 거예요. 카카오 알림톡을 통해 알려드릴게요!
      </TextBody1>
      <EmptyHeight height={'30px'} />
      <CustomButton
        onClick={() => {
          navigate('/mentee/schedule')
        }}
        height="48px"
        style={{ fontSize: '16px', fontWeight: 700 }}>
        완료
      </CustomButton>
      <EmptyHeight height='30px' />
    </VerticalFlex>


  </VerticalFlex>

}

export default MentoringRequestFinish;