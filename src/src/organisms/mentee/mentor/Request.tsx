import { styled, } from "@mui/material";

import { Card } from "util/Card";
import { TagLarge } from "util/Custom/CustomTag";
import { CustomTextArea } from "util/Custom/CustomTextArea";
import { CustomButton } from "util/Custom/CustomButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMinute, getDateString, getKoreanTimeString, removeReservation, updateReservation } from "util/ts/util";
import UploadIcon from 'assets/icon/UploadIcon';
import Dropzone, { FileWithPath } from "react-dropzone";
import API from "API";
import { colorBackgroundCareerDiveBlue, colorBackgroundCareerDivePink, colorBackgroundGrayLight, colorCareerDiveBlue, colorCareerDivePink, colorTextLight, EmptyHeight, EmptyWidth, Flex, TextBody2, TextCaption, TextSubtitle1, VerticalFlex } from "util/styledComponent";
import React from "react";
import { getParsedLocalStorage } from "util/ts/util";

const getCategoryColor = (category: '커리어 상담' | '전형 준비') => {
  if (category === '커리어 상담') {
    return colorCareerDiveBlue;
  } else if (category === '전형 준비') {
    return colorCareerDivePink;
  } else {
    return colorTextLight;
  }
};

const getCategoryBackgroundColor = (category: '커리어 상담' | '전형 준비') => {
  if (category === '커리어 상담') {
    return colorBackgroundCareerDiveBlue;
  } else if (category === '전형 준비') {
    return colorBackgroundCareerDivePink;
  } else {
    return colorBackgroundGrayLight;
  }
};

const CategoryTag = styled(TagLarge) <{ category: '커리어 상담' | '전형 준비'; }>`
  color:${props => getCategoryColor(props.category)};
  background-color:${props => getCategoryBackgroundColor(props.category)};
`;

const maxLength = 600;
function Request({ type }: { type: 'careerConsult' | 'prepare'; }) {
  const navigate = useNavigate();
  const params = useParams();

  const consultCategory = type === 'careerConsult' ? '커리어 상담' : '전형 준비';

  const reservation = getParsedLocalStorage('reservations')[+params.id!];
  const consultContents: string[] = reservation['consultContent'];
  const startTime: Date = new Date(reservation['startTime']);
  const consultingTime: number = reservation['consultingTime'];
  const isFilePreOpen: '희망' | '비희망' = reservation['isFilePreOpen'];

  const [requestText, setRequestText] = useState<string>('');
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);

  useEffect(() => {
    try {
      if (params.id === undefined)
        throw Error;
      reservation['requestText'] && setRequestText(reservation['requestText']);

    } catch (error) {
      console.log(error);
      alert('누락된 상담 내용 정보가 있습니다.');
    }
  }, []);

  async function onClickApplyButton() {
    if (isFilePreOpen === '희망' && uploadingFiles.length <= 0) {
      const isContinue = window.confirm('첨부파일 없이 계속 하시겠습니까?');
      if (!isContinue) {
        return;
      }
    }

    const reservations = getParsedLocalStorage('reservations');
    if (reservations !== null && params.id && startTime) {
      const reservation = reservations[params.id];
      const consultingEndTimeDate = addMinute(startTime, consultingTime);
      const consultingStartTime = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
      const consultingEndTime = `${consultingEndTimeDate.getHours().toString().padStart(2, '0')}:${consultingEndTimeDate.getMinutes().toString().padStart(2, '0')}`;

      const postConsultObject = {
        consultContentList: [...reservation['consultContent'].map((e: string) => {
          return {
            Name: e,
            Type: reservation['consultCategory']
          };
        })],
        menteeId: +localStorage.getItem("UserID")!,
        mentorId: +params.id,
        preReview: reservation['isFilePreOpen'] === '희망' ? true : false,
        requestContent: requestText,
        scheduleId: reservation['scheduleId'],
        startTime: consultingStartTime,
        endTime: consultingEndTime,
        type: reservation['consultCategory']
      };

      const consultRes = await API.postConsult(postConsultObject);

      if (consultRes.status === 200) {
        if (isFilePreOpen === '희망' && uploadingFiles.length > 0) {
          const consultId = consultRes.data.ID;

          uploadingFiles.forEach(async (e) => {
            let formData = new FormData();
            formData.append('file', e);
            const consultFileRes = await API.postConsultFile(consultId, formData);

            if (consultFileRes.status !== 200) {
              alert('네트워크 오류로 파일 업로드에 실패했습니다. 다시 시도해주세요');
              return;
            }
          });
        }

        removeReservation(+params.id);
        navigate('/mentee/request/finish');
      } else {
        alert('네트워크 오류로 상담신청에 실패했습니다. 다시 시도해주세요');
      }
    } else {
      alert('누락된 정보가 있습니다. 다시 시도해주세요');
      navigate(`/mentee/mentor/${params.id}/request`);
    }
  }

  return (
    <Card
      title={
        <Flex sx={{ flexWrap: 'wrap', columnGap: '8px' }}>
          <span>{getDateString(startTime, 'long')}</span>
          <span style={{ color: consultCategory === '커리어 상담' ? colorCareerDiveBlue : colorCareerDivePink }}>
            {getKoreanTimeString(startTime)} ~ {getKoreanTimeString(addMinute(startTime, 20))}
          </span>
        </Flex>
      }
      titleBottom={
        <VerticalFlex>
          <EmptyHeight height='16px' />
          <Flex sx={{ flexWrap: 'wrap', gap: '8px' }}>
            <CategoryTag category={consultCategory}><TextBody2>{consultCategory}</TextBody2></CategoryTag>
            {isFilePreOpen === '희망' && <CategoryTag category={consultCategory}><TextBody2>이력서 검토</TextBody2></CategoryTag>}
            {consultContents && consultContents.map((value, index) => (
              <TagLarge key={index} color={colorTextLight} background_color={colorBackgroundGrayLight}>
                <TextBody2>{value}</TextBody2>
              </TagLarge>
            ))}
          </Flex>
        </VerticalFlex>
      }
      style={{ gap: '16px' }}
    >
      <TextSubtitle1>요청서</TextSubtitle1>
      <TextBody2 color={colorTextLight}>
        • &nbsp;&nbsp;사내 규정상 공개가 어려운 정보를 요청할 수 없습니다.
        <br></br>
        • &nbsp;&nbsp;선택하신 희망 상담 내용 이외의 정보(섭외, 광고 등)를 요청할 수 없습니다.
      </TextBody2>

      <CustomTextArea
        defaultValue={requestText}
        onFocus={(event) => {
          event.target.placeholder = '';
        }}
        onBlur={(event) => {
          event.target.placeholder = '희망 상담 내용을 작성해 주세요. 프로필 소개 또한 함께 전달됩니다.';
        }}
        onChange={(event) => {
          const updatingData: { name: 'requestText', data: string; }[] = [
            { name: 'requestText', data: event.target.value },
          ];
          setRequestText(event.target.value);
          updateReservation(+params.id!, updatingData);
        }}
        maxLength={maxLength}
        placeholder="희망 상담 내용을 작성해 주세요. 프로필 소개 또한 함께 전달됩니다."
        minRows={5}
      />

      <TextCaption sx={{ marginLeft: 'auto', marginTop: '-12px' }}>{requestText ? requestText.length : 0}/{maxLength}</TextCaption>

      {isFilePreOpen === '희망' && <VerticalFlex>
        <TextSubtitle1>첨부 파일 업로드 (최대 2개)</TextSubtitle1>
        <TextBody2 color={consultCategory === '커리어 상담' ? colorCareerDiveBlue : colorCareerDivePink}>
          이력서 및 포트폴리오를 업로드해 주세요.
        </TextBody2>
        <EmptyHeight height='8px' />
        <Dropzone
          onDrop={(acceptedFiles: File[]) => {
            if (uploadingFiles.length + acceptedFiles.length > 2) {
              alert('업로드 파일은 최대 2개입니다.');
              return;
            }
            const temp: File[] = [];
            acceptedFiles.forEach(file => {
              temp.push(file);
            });
            setUploadingFiles([...uploadingFiles, ...temp]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <Flex
              sx={{
                backgroundColor: colorBackgroundGrayLight,
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                height: '100px'
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <UploadIcon color={colorTextLight} />
            </Flex>
          )}
        </Dropzone>
        {uploadingFiles.map((items: FileWithPath, index) => {
          return <Flex key={index}>
            <TextBody2 color={colorTextLight} style={{ textDecoration: 'underline', marginRight: 10 }}>{items.path}</TextBody2>
            <TextBody2
              style={{ cursor: 'pointer' }}
              color={colorCareerDivePink}
              onClick={() => {
                const temp = JSON.parse(JSON.stringify(uploadingFiles));
                temp.splice(temp.indexOf(items), 1);
                setUploadingFiles(temp);
              }}>삭제</TextBody2>
          </Flex>;
        })}
      </VerticalFlex>}

      <CustomButton
        sx={{ width: '170px', height: '52px', marginLeft: 'auto' }}
        onClick={
          () => {
            onClickApplyButton();
          }
        }>
        <TextSubtitle1>
          완료
        </TextSubtitle1>
      </CustomButton>

    </Card>
  );
}

export default Request;