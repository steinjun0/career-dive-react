import React from 'react';
import { IMentorRegisterData } from "interfaces/mentor";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as accountAPI from 'apis/account';
import { Flex, TextBody1 } from "util/styledComponent";

const LoadingModal = withReactContent(Swal);

export default async function createMentor({ registerData, onSuccessClose }:
  { registerData: IMentorRegisterData, onSuccessClose: () => void; })
  : Promise<'missing info' | 'fail mentor' | 'fail file' | 'success'> {
  if (Object.values(registerData).includes(null)) {
    alert('필수 정보가 누락되었습니다. 다시 진행해 주세요');
    return 'missing info';
  }
  LoadingModal.fire({
    title: '멘토 정보 등록중',
    text: '잠시만 기다려주세요',
    icon: 'info',
    allowOutsideClick: false,
    didOpen: () => {
      LoadingModal.showLoading();
    }
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mentorRes = await accountAPI.postAccountMentor(registerData);
  if (mentorRes.status === 200) {
    LoadingModal.update({
      title: '자격득실확인서 등록중',
      text: '잠시만 기다려주세요',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    LoadingModal.showLoading();
  } else {
    LoadingModal.update({
      title: '멘토 정보 등록에 실패했습니다',
      html: <Flex sx={{ justifyContent: 'center' }}>
        <TextBody1>
          잠시후 다시 시도해주세요.<br />계속해서 되지 않는다면 카카오톡 채널로 문의해주세요
        </TextBody1>
      </Flex>,
      icon: 'error',
      allowOutsideClick: true,
      showConfirmButton: true,
    });
    LoadingModal.hideLoading();
    return 'fail mentor';
  }

  const formData = new FormData();
  formData.append('file', registerData.careerFile!);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const fileRes = await accountAPI.postAccountMentorFile({ id: +localStorage.getItem('UserID')!, file: formData });
  if (fileRes.status === 200) {
    LoadingModal.update({
      title: '멘토 등록이 완료되었습니다!',
      text: '🎉',
      icon: 'success',
      allowOutsideClick: true,
      showConfirmButton: true,
      didClose() {
        onSuccessClose();
      },
    });
    LoadingModal.hideLoading();
    return 'success';
  } else {
    LoadingModal.update({
      title: '자격득실확인서 등록에 실패했습니다',
      html: <Flex sx={{ justifyContent: 'center' }}>
        <TextBody1>
          잠시후 다시 시도해주세요.<br />계속해서 되지 않는다면 카카오톡 채널로 문의해주세요
        </TextBody1>
      </Flex>,
      icon: 'error',
      allowOutsideClick: true,
      showConfirmButton: true,
    });
    LoadingModal.hideLoading();
    return 'fail file';
  }
}