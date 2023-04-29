import { TextFieldProps } from "@mui/material";
import BasicButton from "component/button/BasicButton";
import BasicTextField from "component/input/BasicTextField";
import RegisterTemplate from "organisms/mentor/register/RegisterTemplate";
import React, { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "util/hooks/useBreakpoint";
import { Flex, VerticalFlex, TextHeading6, colorCareerDivePink, TextSubtitle1, colorTextLight, TextCaption, TextBody2, colorBackgroundGrayLight, TextSubtitle2, colorTextTitle } from "util/styledComponent";
import FileInputBox from "component/input/FileInputBox";
import { IMentorRegisterData } from "interfaces/mentor";

function StepTitle() {
  return <Flex sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
    <TextHeading6>
      멘토 등록
    </TextHeading6>
    <TextCaption sx={{ color: colorTextLight }}>
      1/2
    </TextCaption>
  </Flex>;
}

function Info() {
  return <VerticalFlex sx={{ gap: '8px' }}>
    <TextHeading6 sx={{ width: '100%', marginTop: '24px' }}>
      경력 인증
    </TextHeading6>
    <TextBody2>
      <span style={{ color: colorCareerDivePink, fontWeight: 'bold' }}>자격득실확인서</span>(PDF)를 첨부해 주세요. 재직 기간과 회사가 인증되며, 한 개의 회사만 인증이 가능합니다.
    </TextBody2>
  </VerticalFlex>;
}

function BirthInput(props: TextFieldProps) {
  return <VerticalFlex sx={{ width: '100%', gap: '16px' }}>
    <VerticalFlex>
      <TextSubtitle2 sx={{ color: colorTextTitle }}>생년월일</TextSubtitle2>
      <TextCaption>본인 확인용 생년월일 6자리를 입력해주세요</TextCaption>
    </VerticalFlex>
    <BasicTextField
      placeholder="YYMMDD"
      inputMode="numeric"
      {...props}
    />
  </VerticalFlex>;
}

function checkValidDate(dateString: string) {
  if (dateString.length !== 6) return false;
  const YY = dateString.slice(0, 2);
  const MM = dateString.slice(2, 4);
  const DD = dateString.slice(4, 6);
  let date = null;
  if (+YY < 50) {
    date = new Date(`20${YY}-${MM}-${DD}`);
  } else {
    date = new Date(`19${YY}-${MM}-${DD}`);
  }
  if (date.toString() === 'Invalid Date') return false;
  return true;
}

export default function Career({ mentorRegisterData }: { mentorRegisterData: IMentorRegisterData; }) {
  const navigate = useNavigate();
  const [uploadingFiles, setUploadingFiles] = useState<FileWithPath[]>([]);
  const [birth, setBirth] = useState<string>('');
  const isDownSm = useBreakpoint('sm');
  return <RegisterTemplate>
    {!isDownSm && <StepTitle />}
    <Info />
    <FileInputBox
      sx={{ height: '90px', width: '100%' }}
      files={uploadingFiles}
      maxFileNumber={1}
      onDrop={(acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles[0].name.slice(acceptedFiles[0].name.lastIndexOf('.') + 1) !== 'pdf') {
          alert('pdf 파일만 업로드 가능합니다.');
        } else {
          setUploadingFiles(acceptedFiles);
        }
      }}
      onDelete={(deleteFile: FileWithPath) => {
        setUploadingFiles(uploadingFiles.filter(file => file !== deleteFile));
      }}
    />
    <BirthInput
      value={birth}
      type="number"
      onChange={(e) => {
        setBirth(e.target.value);
      }} />

    <BasicButton
      type="pink"
      sx={{ width: '100%', height: '48px', marginTop: isDownSm ? 'auto' : undefined }}
      disabled={uploadingFiles.length !== 1 || !checkValidDate(birth)}
      onClick={() => {
        mentorRegisterData.birth = birth;
        mentorRegisterData.careerFile = uploadingFiles[0];
        navigate('/mentor/register/info');
      }}
    >
      <TextSubtitle1>
        다음
      </TextSubtitle1>
    </BasicButton>
  </RegisterTemplate>;
}