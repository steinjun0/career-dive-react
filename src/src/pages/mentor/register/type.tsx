import BasicButton from "component/button/BasicButton";
import { CheckToggleButton } from "component/button/CheckToggleButton";
import CustomTogglebutton from "component/button/BasicToggleButton";
import RegisterTemplate from "organisms/mentor/register/RegisterTemplate";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "util/hooks/useBreakpoint";
import { Flex, VerticalFlex, TextHeading6, colorCareerDivePink, TextSubtitle1, colorTextLight, TextCaption, TextBody2, colorBackgroundGrayLight, TextSubtitle2, colorTextTitle, colorBackgroundCareerDivePink, TextHeading1, TextBody1 } from "util/styledComponent";
import { IMentorRegisterData } from "interfaces/mentor";
import * as accountAPI from 'apis/account';
import { AccountDataContext } from "index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const LoadingModal = withReactContent(Swal);

function Info() {
  return <VerticalFlex sx={{ gap: '8px', width: '100%', }}>
    <TextHeading6>
      상담 유형 설정
    </TextHeading6>
    <TextBody2>
      멘티에게 제공 가능한 상담 유형을 선택해 주세요!
    </TextBody2>
  </VerticalFlex>;
}

function MultipleToggleButtons({ list, value, onUpdate }: { list: string[], value: string[], onUpdate: (list: string[]) => void; }) {
  return <Flex sx={{ flexWrap: 'wrap', gap: '16px' }}>
    {
      list.map((consult, index) => {
        return <CustomTogglebutton
          key={index}
          selected={value.indexOf(consult) !== -1}
          selectedColor={colorCareerDivePink}
          selectedBackgroundColor={colorBackgroundCareerDivePink}
          sx={{ width: 'calc(50% - 8px)', height: '48px' }}
          onClick={() => {
            const newList = [...value];
            const consultIndex = newList.indexOf(consult);
            if (consultIndex === -1) {
              newList.push(consult);
            } else {
              newList.splice(consultIndex, 1);
            }
            onUpdate(newList);
          }}
        >
          <TextBody2 sx={{ color: colorTextLight }}>
            {consult}
          </TextBody2>
        </CustomTogglebutton>;
      })
    }
  </Flex>;
}

function CareerConsult({ consultList, value, onUpdate }: { consultList: string[], value: string[], onUpdate: (consultList: string[]) => void; }) {

  const [isAllSelected, setisAllSelected] = useState<boolean>(false);
  useEffect(() => {
    if (isAllSelected) {
      onUpdate(consultList);
    } else {
      onUpdate([]);
    }
  }, [isAllSelected]);

  return <VerticalFlex sx={{ width: '100%', gap: '30px' }}>
    <VerticalFlex sx={{ gap: '4px' }}>
      <TextSubtitle1 sx={{ color: colorTextTitle }}>
        커리어 상담*
      </TextSubtitle1>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
        <TextBody2 sx={{ color: colorTextLight }}>
          최소 3개
        </TextBody2>
        <Flex sx={{ gap: '4px', alignItems: 'center', cursor: 'pointer' }} onClick={() => setisAllSelected((prev) => !prev)}>
          <CheckToggleButton color={colorCareerDivePink} checked={isAllSelected} />
          <TextBody2 sx={{ color: colorTextLight }}>
            전체 선택
          </TextBody2>
        </Flex>
      </Flex>
    </VerticalFlex>
    <MultipleToggleButtons list={consultList} value={value} onUpdate={onUpdate} />

  </VerticalFlex>;
}

function PrepareType({ typeList, value, onUpdate }: { typeList: string[], value: string[], onUpdate: (typeList: string[]) => void; }) {
  const [isAllSelected, setisAllSelected] = useState<boolean>(false);
  useEffect(() => {
    if (isAllSelected) {
      onUpdate(typeList);
    } else {
      onUpdate([]);
    }
  }, [isAllSelected]);


  return <VerticalFlex sx={{ width: '100%', gap: '30px' }}>
    <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
      <TextSubtitle1 sx={{ color: colorTextTitle }}>
        전형 준비
      </TextSubtitle1>
      <Flex sx={{ gap: '4px', alignItems: 'center', cursor: 'pointer' }} onClick={() => setisAllSelected((prev) => !prev)}>
        <CheckToggleButton color={colorCareerDivePink} checked={isAllSelected} />
        <TextBody2 sx={{ color: colorTextLight }}>
          전체 선택
        </TextBody2>
      </Flex>
    </Flex>
    <MultipleToggleButtons list={typeList} value={value} onUpdate={onUpdate} />

  </VerticalFlex>;
}

const TOTAL_CONSULT_LIST = ['직무 이야기', '업계 이야기', '진로 상담', '필요 역량', '기술 스택', '내 역량 진단', '이직 준비', '사내 문화', '면접 팁'];
const TOTAL_TYPE_LIST = ['면접 대비', '자소서 구성', '자소서 첨삭', '포트폴리오 첨삭', '이력서 첨삭', 'CV/CL 첨삭', '코드리뷰'];

export default function Type({ mentorRegisterData }: { mentorRegisterData: IMentorRegisterData; }) {
  const { updateAccountData } = useContext(AccountDataContext);
  const navigate = useNavigate();
  const isDownSm = useBreakpoint('sm');

  const [consultList, setConsultList] = useState<string[]>(mentorRegisterData.consultList ?? []);
  const [typeList, setTypeList] = useState<string[]>(mentorRegisterData.typeList ?? []);
  async function createMentor(registerData: IMentorRegisterData) {
    if (Object.values(registerData).includes(null)) {
      alert('필수 정보가 누락되었습니다. 다시 진행해 주세요');
      navigate('/mentor/register');
      return;
    }
    LoadingModal.fire({
      title: '멘토 정보 등록중',
      text: '잠시만 기다려주세요',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: async () => {
        LoadingModal.showLoading();
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
          throw Error;
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
              navigate('/mentor/register/finish');
            },
          });
          LoadingModal.hideLoading();
          updateAccountData('isMentorMode', true);

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
          throw Error;
        }
      },
    });
  }

  return <RegisterTemplate>
    <Info />
    <CareerConsult
      consultList={TOTAL_CONSULT_LIST}
      value={consultList}
      onUpdate={(updateList) => {
        mentorRegisterData.consultList = [...updateList];
        setConsultList([...updateList]);
      }}
    />
    <PrepareType
      typeList={TOTAL_TYPE_LIST}
      value={typeList}
      onUpdate={(updateList) => {
        mentorRegisterData.typeList = [...updateList];
        setTypeList([...updateList]);
      }} />
    <BasicButton
      type="pink"
      sx={{ width: '100%', height: '48px', marginTop: isDownSm ? 'auto' : undefined }}
      onClick={() => {
        mentorRegisterData.consultList = [...consultList];
        mentorRegisterData.typeList = [...typeList];
        createMentor(mentorRegisterData);
      }}
    >
      <TextSubtitle1>
        등록 신청
      </TextSubtitle1>
    </BasicButton>
  </RegisterTemplate>;
}