import React, { ReactNode } from 'react';
import { IMentorRegisterData } from "interfaces/mentor";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as accountAPI from 'apis/account';
import { TextBody2, TextHeading6, TextSubtitle1, VerticalFlex, colorCareerDivePink } from "util/styledComponent";
import loader from 'assets/icon/modal/loader.svg';
import loaderDone from 'assets/icon/modal/loader-done.svg';
import loaderFail from 'assets/icon/modal/loader-fail.svg';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/system';
import BasicButton from 'component/button/BasicButton';

const LoadingModal = withReactContent(Swal);

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const RotatingImage = styled('img')({
  width: '100px',
  animation: `${rotateAnimation} 2s infinite linear`,
});

function getLoadingModalOptions({ title }: { title: ReactNode; }) {
  return {
    html: <VerticalFlex sx={{ justifyContent: 'center', alignItems: 'center', padding: '60px 0', gap: '32px' }}>
      <RotatingImage src={loader} alt="loader" style={{ width: '136px', height: '136px' }} />
      <TextHeading6>{title}</TextHeading6>
    </VerticalFlex>,
    allowOutsideClick: true,
    showCloseButton: false,
    showConfirmButton: false,
    width: '300px',
  };
};

function getFailModalOptions({ title, subtitle }: { title: ReactNode, subtitle: ReactNode; }) {
  return {
    html: <VerticalFlex sx={{ justifyContent: 'center', alignItems: 'center', padding: '60px 16px 16px 16px', gap: '32px' }}>
      <img src={loaderFail} alt="loaderFail" style={{ width: '136px', height: '136px' }} />
      <TextHeading6 sx={{ color: colorCareerDivePink }}>{title}</TextHeading6>
      <TextBody2>{subtitle}</TextBody2>
      <BasicButton type="pink" sx={{ width: '100%' }} onClick={() => { Swal.close(); }}>
        <TextSubtitle1>
          확인
        </TextSubtitle1>
      </BasicButton>
    </VerticalFlex>,
    allowOutsideClick: true,
    showCloseButton: false,
    showConfirmButton: false,
    width: '300px',
  };
};

function getDoneModalOptions({ title }: { title: ReactNode; }) {
  return {
    html: <VerticalFlex sx={{ justifyContent: 'center', alignItems: 'center', padding: '60px 0', gap: '32px' }}>
      <img src={loaderDone} alt="loader" style={{ width: '136px', height: '136px' }} />
      <TextHeading6>{title}</TextHeading6>
    </VerticalFlex>,
    allowOutsideClick: true,
    showCloseButton: false,
    showConfirmButton: false,
    width: '300px',
  };
};

export default async function createMentor({ registerData, onSuccessClose }:
  { registerData: IMentorRegisterData, onSuccessClose: () => void; })
  : Promise<'missing info' | 'fail mentor' | 'fail file' | 'fail type' | 'success'> {
  if (Object.values(registerData).includes(null)) {
    alert('필수 정보가 누락되었습니다. 다시 진행해 주세요');
    return 'missing info';
  }
  LoadingModal.fire(getLoadingModalOptions({ title: '멘토 정보 등록 중' }));
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mentorRes = await accountAPI.postAccountMentor(registerData);
  if (mentorRes.status === 200) {
    LoadingModal.update(getLoadingModalOptions({ title: '자격득실확인서 등록 중' }));
  } else {
    LoadingModal.update(getFailModalOptions({ title: '신청 실패', subtitle: <>기입 정보 확인 후 다시 시도해주세요.<br />오류 지속 시 카카오톡 채널로 문의해주세요.</> }));
    return 'fail mentor';
  }

  const formData = new FormData();
  formData.append('file', registerData.careerFile!);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const fileRes = await accountAPI.postAccountMentorFile({ id: +localStorage.getItem('UserID')!, file: formData });
  if (fileRes.status === 200) {
    LoadingModal.update(getLoadingModalOptions({ title: '상담 유형 설정 중' }));
  } else {
    LoadingModal.update(getFailModalOptions({ title: '자격득실확인서 등록에 실패했습니다', subtitle: <>기입 정보 확인 후 다시 시도해주세요.<br />오류 지속 시 카카오톡 채널로 문의해주세요.</> }));
    return 'fail file';
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (registerData.consultList !== null && registerData.typeList !== null) {
    const consultRes = await accountAPI.postAccountConsultContent({ id: +localStorage.getItem('UserID')!, consultList: registerData.consultList, typeList: registerData.typeList });
    if (consultRes.status === 200) {
      LoadingModal.update(
        {
          ...getDoneModalOptions({ title: '신청 완료' }),
          didClose() {
            onSuccessClose();
          },
        }
      );
      return 'success';
    } else {
      LoadingModal.update(getFailModalOptions({ title: '상당 유형 설정에 실패하였습니다', subtitle: <>가입은 완료되었으나 상담 유형 설정에 실패하였습니다.<br />마이페이지로 이동 후 다시 설정해주세요</> }));
      return 'fail type';
    }
  } else {
    LoadingModal.update(getFailModalOptions({ title: '상당 유형 설정에 실패하였습니다', subtitle: <>가입은 완료되었으나 상담 유형 설정에 실패하였습니다.<br />마이페이지로 이동 후 다시 설정해주세요</> }));
    return 'fail type';
  }
}