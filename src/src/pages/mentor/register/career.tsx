import UploadIcon from "assets/icon/UploadIcon";
import BasicButton from "component/button/BasicButton";
import BasicTextField from "component/input/BasicTextField";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Flex, VerticalFlex, TextHeading6, colorCareerDivePink, TextSubtitle1, colorTextLight, TextCaption, TextBody2, colorBackgroundGrayLight, TextSubtitle2, colorTextTitle } from "util/styledComponent";

export default function Career() {
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [birth, setBirth] = useState<string>('');
  return <Flex sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px - 80px)' }}>
    <VerticalFlex sx={{ alignItems: 'center', width: '378px', gap: '30px' }}>
      <Flex sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextHeading6>
          멘토 등록
        </TextHeading6>
        <TextCaption sx={{ color: colorTextLight }}>
          1/2
        </TextCaption>
      </Flex>

      <VerticalFlex sx={{ gap: '8px' }}>
        <TextHeading6 sx={{ width: '100%', marginTop: '24px' }}>
          경력 인증
        </TextHeading6>
        <TextBody2>
          <span style={{ color: colorCareerDivePink, fontWeight: 'bold' }}>자격득실확인서</span>(PDF)를 첨부해 주세요. 재직 기간과 회사가 인증되며, 한 개의 회사만 인증이 가능합니다.
        </TextBody2>
      </VerticalFlex>

      <Dropzone
        onDrop={(acceptedFiles: File[]) => {
          if (acceptedFiles.length > 1) {
            return alert('파일은 한 개만 첨부할 수 있습니다.');
          }
          setUploadingFile(acceptedFiles[0]);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <Flex
            sx={{
              backgroundColor: colorBackgroundGrayLight,
              justifyContent: 'center',
              alignItems: 'center',
              height: '90px',
              borderRadius: '8px',
              width: '100%'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Flex sx={{ '&>svg': { width: '28px', height: '28px' } }}>
              <UploadIcon color={colorTextLight} />
            </Flex>
          </Flex>
        )}
      </Dropzone>

      <VerticalFlex sx={{ width: '100%', gap: '16px' }}>
        <VerticalFlex>
          <TextSubtitle2 sx={{ color: colorTextTitle }}>생년월일</TextSubtitle2>
          <TextCaption>본인 확인용 생년월일 6자리를 입력해주세요</TextCaption>
        </VerticalFlex>
        <BasicTextField
          placeholder="YYMMDD"
          value={birth}
          onChange={(e) => {
            setBirth(e.target.value);
          }}
        />
      </VerticalFlex>

      <BasicButton type="pink" sx={{ width: '100%', height: '48px' }}>
        <TextSubtitle1>
          인증 요청
        </TextSubtitle1>
      </BasicButton>
    </VerticalFlex>
  </Flex>;
}