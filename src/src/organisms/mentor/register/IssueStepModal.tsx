import { Avatar } from "@mui/material";
import BasicButton from "component/button/BasicButton";
import React from "react";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { Flex, TextHeading6, TextSubtitle1, VerticalFlex, colorBackgroundCareerDivePink, colorCareerDivePink, colorTextBody, colorTextLight } from "util/styledComponent";
import CloseIcon from '@mui/icons-material/Close';

function ModalHtml() {
  return <VerticalFlex sx={{ gap: '16px', width: '100%', padding: '16px' }}>
    <Flex sx={{ alignItems: 'center', gap: '16px' }}>
      <Avatar sx={{ bgcolor: colorBackgroundCareerDivePink, color: colorCareerDivePink }}>
        <TextHeading6>1</TextHeading6>
      </Avatar>
      <TextSubtitle1 sx={{ color: colorTextBody }}>
        국민건강보험 웹사이트 접속
      </TextSubtitle1>
    </Flex>

    <Flex sx={{ alignItems: 'center', gap: '16px' }}>
      <Avatar sx={{ bgcolor: colorBackgroundCareerDivePink, color: colorCareerDivePink }}>
        <TextHeading6>2</TextHeading6>
      </Avatar>
      <TextSubtitle1 sx={{ color: colorTextBody }}>
        자격득실 확인서 발급
      </TextSubtitle1>
    </Flex>

    <Flex sx={{ alignItems: 'center', gap: '16px' }}>
      <Avatar sx={{ bgcolor: colorBackgroundCareerDivePink, color: colorCareerDivePink }}>
        <TextHeading6>3</TextHeading6>
      </Avatar>
      <TextSubtitle1 sx={{ color: colorTextBody }}>
        프린트 발급 클릭
      </TextSubtitle1>
    </Flex>
    <a style={{ width: '100%' }} href="https://www.nhis.or.kr/" target="blank">
      <BasicButton type="pink" sx={{ width: '100%' }} onClick={() => { Swal.close(); }}>
        <TextSubtitle1>
          국민건강보험으로 이동
        </TextSubtitle1>
      </BasicButton>
    </a>
  </VerticalFlex >;
}

function ModalTitle() {
  return <Flex sx={{ cursor: 'pointer', padding: '16px 16px 0 16px', justifyContent: 'space-between', alignItems: 'center' }}>
    <TextHeading6 sx={{ color: 'black' }}>발급 방법</TextHeading6>
    <CloseIcon onClick={() => Swal.close()}></CloseIcon>
  </Flex>;
}

const issueStepModalObject: SweetAlertOptions = {
  title: ModalTitle(),
  html: ModalHtml(),
  buttonsStyling: false,
  showCloseButton: false,
  showConfirmButton: false,
  width: '300px',
};

export default issueStepModalObject;