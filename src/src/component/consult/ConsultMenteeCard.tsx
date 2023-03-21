import { styled } from "@mui/material";
import {
    VerticalFlex,
    Flex,
    TextBody2,
    TextSubtitle2,
    colorBlueGray,
    colorCareerDiveBlue,
    colorBackgroundGrayLight,
    TextHeading6,
} from "util/styledComponent";
import { ExpandingIconButton } from 'component/ExpandingIconButton';

import RequestFormIcon from "assets/icon/RequestFormIcon";
import EditCalendarIcon from "assets/icon/EditCalendarIcon";
import PhoneIcon from "assets/icon/PhoneIcon";

import calendarSuccess from 'assets/icon/schedule/calendarSuccess.svg';
import calendarWait from 'assets/icon/schedule/calendarWait.svg';
import calendarCancel from 'assets/icon/schedule/calendarCancel.svg';
import React from "react";
import { IConsult } from "interfaces/consult";
import { IMentor } from "interfaces/mentor";
import { getDateString, getKoreanTimeString } from "util/ts/util";


const ConsultCardWrapper = styled(Flex)`
  border: 1px solid ${colorBlueGray};
  border-radius: 8px;
  overflow: hidden;
`;

const CategoryImg = styled('img')`
  width: 28px;
  height: 28px;
`;

const ConsultCardLeft = styled(Flex)`
  background-color: ${colorBackgroundGrayLight};
  padding: 10px;
  align-items: center;
  min-width: 48px;
`;

function ConsultMenteeCard(
    { consult, requestFormOnClick, changeOnClick, enterOnClick }
        :
        {
            consult: IConsult,
            requestFormOnClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
            changeOnClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
            enterOnClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
        }
) {
    let categoryIcon;
    if (consult.status === 'approved') {
        categoryIcon = calendarSuccess;
    } else if (consult.status === 'created') {
        categoryIcon = calendarWait;
    } else if (consult.status === 'rejected') {
        categoryIcon = calendarCancel;
    } else if (['done', 'mentor_noshow', 'mentee_noshow', 'noshow'].includes(consult.status)) {
        categoryIcon = calendarSuccess;
    } else {
        categoryIcon = calendarSuccess;
    }

    return (
        <ConsultCardWrapper>
            <ConsultCardLeft>
                <CategoryImg src={categoryIcon}></CategoryImg>
            </ConsultCardLeft>

            <VerticalFlex sx={{ padding: '24px', gap: '10px' }}>
                <TextHeading6 >
                    {consult.company}
                </TextHeading6>
                <VerticalFlex >
                    <Flex sx={{ marginBottom: '4px' }}>
                        <TextSubtitle2>
                            {consult.job}
                        </TextSubtitle2>
                        <TextBody2 style={{ margin: '0 4px' }}>
                            ·
                        </TextBody2>
                        <TextBody2>
                            {consult.nickname}
                        </TextBody2>
                    </Flex>

                    <Flex style={{ gap: '4px' }}>
                        <TextBody2>
                            {getDateString(consult.date, 'short')}
                        </TextBody2>
                        <TextSubtitle2>
                            {/* {getAMOrPM(consult.startTime)} {+consult.startTime.slice(0, 2) > 12 ? (+consult.startTime.slice(0, 2) - 12).toString().padStart(2, '0') : consult.startTime.slice(0, 2)}:{consult.startTime.slice(3)} */}
                            {getKoreanTimeString(consult.startTime)}
                        </TextSubtitle2>
                    </Flex>
                </VerticalFlex>
                <Flex sx={{ gap: '12px' }}>
                    <ExpandingIconButton
                        Icon={RequestFormIcon}
                        text={"요청서"}
                        hoverColor={colorCareerDiveBlue}
                        hoverTextColor={'white'}
                        onClick={requestFormOnClick}
                    />
                    <ExpandingIconButton
                        Icon={EditCalendarIcon}
                        text={"예약 변경"}
                        hoverColor={colorCareerDiveBlue}
                        hoverTextColor={'white'}
                        onClick={changeOnClick}
                    />
                    <ExpandingIconButton
                        Icon={PhoneIcon}
                        text={"상담 입장"}
                        hoverColor={colorCareerDiveBlue}
                        hoverTextColor={'white'}
                        onClick={enterOnClick}
                    />
                </Flex>

            </VerticalFlex>
        </ConsultCardWrapper >
    );
}

export default ConsultMenteeCard;