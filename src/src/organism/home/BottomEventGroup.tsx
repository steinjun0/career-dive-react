import { colorCareerDiveBlue, colorTextLight, Flex, TextHeading5, VerticalFlex } from 'util/styledComponent'
import GuidelineMenteeBook from "assets/img/home/GuidelineMenteeBook.svg";
import KakaotalkChannel from "assets/img/home/KakaotalkChannel.svg";
import React, { DOMAttributes, ReactElement } from "react";


function EventCard({ children, ...props }: { children: ReactElement } & DOMAttributes<HTMLDivElement>) {
    return <Flex
        {...props}
        style={{
            justifyContent: 'space-between',
            backgroundColor: 'white', borderRadius: 8,
            padding: 24,
            width: '100%', height: '160px',
            cursor: 'pointer',
            boxShadow: '10px 20px 40px rgba(130, 130, 130, 0.1)'
        }}
    >
        {children}
    </Flex>
}

function BottomEventGroup() {
    return (
        <Flex sx={{ margin: '80px 0 160px 0', gap: '30px' }}>
            <EventCard onClick={() => window.open("https://www.notion.so/CBT-c57283dae1fe4602ad25f2b6ba0419aa")}>
                <>
                    <VerticalFlex>
                        <TextHeading5 color={colorTextLight}>서비스 정책 및 가이드라인</TextHeading5>
                        <TextHeading5 color={colorCareerDiveBlue}>멘티편</TextHeading5>
                    </VerticalFlex>
                    <VerticalFlex
                        style={{ justifyContent: 'end' }}>
                        <img src={GuidelineMenteeBook} alt="" />
                    </VerticalFlex>
                </>
            </EventCard>

            <EventCard onClick={() => window.open("https://pf.kakao.com/_xhHtxlxj")}>
                <>
                    <VerticalFlex>
                        <TextHeading5 color={'#F3C72B'}>카카오톡 채널 문의</TextHeading5>
                    </VerticalFlex>
                    <VerticalFlex
                        style={{ justifyContent: 'end' }}>
                        <img src={KakaotalkChannel} alt="" />
                    </VerticalFlex>
                </>
            </EventCard>
        </Flex>
    );
}

export default BottomEventGroup;
