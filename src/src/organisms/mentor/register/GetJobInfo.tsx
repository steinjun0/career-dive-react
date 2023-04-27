import BasicTextField from "component/input/BasicTextField";
import React, { Dispatch, SetStateAction, useState } from "react";
import { VerticalFlex, TextSubtitle2, Flex, colorBackgroundGrayLight, colorTextLight, TextBody2, colorBackgroundGrayMedium, colorCareerDivePink, colorBackgroundCareerDivePink, colorBackgroundGrayDark } from "util/styledComponent";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const jobInformation = {
  'SW개발': ['프론트엔드', '백엔드', '안드로이드 개발', 'iOS 개발', '응용 프로그래머', '시스템 프로그래머', '데이터베이스·인프라', '네트워크·서버', '보안', '게임', '데이터 분석·인공지능', 'QA·테스터·검증', 'ERP·시스템분석·설계'],
  '기획': ['PM·PO', '서비스 기획', '콘텐츠 기획', '데이터 기획', 'UX 리서치'],
  '마케팅·광고·홍보': ['마케팅', '광고 기획(AE)', '홍보·PR', '조사·분석·통계', '전시·컨벤션'],
  '경영·사무·행정': ['컨설팅', '전략 기획', '사업 기획', '경영 기획', '사무', '총무', '법무', '경리', '회계', '세무', '인사·노무·교육'],
  '유통·물류·무역': ['MD', 'VMD', '상품 기획', '구매', '매장 운영·관리', '수출입·무역·사무', 'SCM', 'BM'],
  'CS·영업': ['아웃바운드TM', '고객상담·인바운드', 'CS 관리', '제품·서비스 영업', '금융·보험 영업', 'IT·솔루션·기술 영업', '영업 관리·지원·영업 기획', '해외·무역 영업'],
  '디자인': ['UI/UX', 'UX 디자이너', '영상·애니메이션', '그래픽·3D', '패션', '인테리어', '출판·편집', '제품·산업', '전시·공간'],
  '제조·생산·품질': ['생산·공정 관리', '품질 관리', '품질 보증', '제조', '설비', '조립'],
  '방송·미디어': ['PD·연출', '기자', '아나운서', '작가·시나리오'],
  '은행·금융·보험': ['개인 금융', '기업 금융', '국제 금융', '카드 사업', '투자 은행', '자산 관리·운용', '리서치', '리스크 관리', '트레이딩', '보험 심사'],
  '건설·엔지니어링': ['환경', '플랜트', '토목', '건축'],
  '항공': ['조종사', '승무원', '관제사', '운항관리사', '지상사무직', '공항 운영', '지상조업', '제작·정비'],
  '교육': ['교수', '교직원', '강사'],
  '연구개발': ['연구개발', '리서치'],
  '기타': ['CEO']
};

export default function GetJobInfo({ sector, job, jobInComp, setSector, setJob, setJobInComp }: { sector: keyof typeof jobInformation | null, job: string, jobInComp: string, setSector: Dispatch<SetStateAction<keyof typeof jobInformation | null>>, setJob: Dispatch<SetStateAction<string>>, setJobInComp: Dispatch<SetStateAction<string>>; }) {
  const [isShowCategoryDropDown, setIsShowCategoryDropDown] = useState(false);

  return <VerticalFlex sx={{ width: '100%', gap: '16px' }}>
    <VerticalFlex sx={{ gap: '4px' }}>
      <TextSubtitle2>직무 정보*</TextSubtitle2>
    </VerticalFlex>
    <Flex
      style={{ backgroundColor: colorBackgroundGrayLight, color: colorTextLight, padding: '10px 20px', justifyContent: 'space-between', cursor: 'pointer' }}
      onClick={() => {
        setIsShowCategoryDropDown(!isShowCategoryDropDown);
      }}
    >
      <TextBody2 color={colorTextLight} style={{ lineHeight: '28px' }}>{job !== '' ? `${sector} | ${job}` : '직무'}</TextBody2>
      <KeyboardArrowDownIcon sx={{ color: colorTextLight }} />
    </Flex>

    {isShowCategoryDropDown &&
      <VerticalFlex >
        <Flex style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '8px', marginTop: '16px', overflow: 'hidden' }}>
          <VerticalFlex
            style={{ borderRight: `1px solid ${colorBackgroundGrayMedium}` }}>
            {Object.keys(jobInformation).map((e, i) => {
              return <Flex
                key={i}
                style={{
                  padding: '4px 20px',
                  cursor: 'pointer',
                  color: sector === e ? colorCareerDivePink : 'black',
                  backgroundColor: sector === e ? colorBackgroundCareerDivePink : colorBackgroundGrayLight,
                }}
                onClick={() => {
                  setSector(e as keyof typeof jobInformation);
                }}>
                <TextBody2 style={{ lineHeight: '28px' }}>{e}</TextBody2>
              </Flex>;
            })}
          </VerticalFlex>
          <VerticalFlex style={{ flex: 1 }}>
            {sector !== null && jobInformation[sector].map((e, i) => {
              return <Flex
                key={i}
                style={{
                  padding: '4px 20px',
                  color: job === e ? colorCareerDivePink : colorBackgroundGrayDark,
                  backgroundColor: job === e ? colorBackgroundCareerDivePink : colorBackgroundGrayLight,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setJob(e);
                  setIsShowCategoryDropDown(false);
                }}>
                <TextBody2 style={{ lineHeight: '28px' }}>{e}</TextBody2>
              </Flex>;
            })}
          </VerticalFlex>
        </Flex>
      </VerticalFlex>
    }
    <BasicTextField
      placeholder='사내 직무명(선택)'
      value={jobInComp}
      onChange={(e) => {
        setJobInComp(e.target.value);
      }}
    />
  </VerticalFlex>;
}