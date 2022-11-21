import { styled } from "@mui/material";
import { colorCareerDiveBlue, Flex, RowAlignCenterFlex, TextHeading5 } from 'util/styledComponent'

const BottomEventCardsWrapper = styled(RowAlignCenterFlex)`
    justify-content: space-between;
    width: 100%;
    margin-top: 80px;
    margin-bottom: 160px;
`;


function BottomEventGroup() {
    return (
        <BottomEventCardsWrapper>
            <Flex style={{
                backgroundColor: colorCareerDiveBlue, borderRadius: 8,
                padding: 24, marginRight: '12px',
                width: '100%', height: '202px',
                cursor: 'pointer'
            }}
                onClick={
                    () => {
                        window.open('https://www.notion.so/CBT-c57283dae1fe4602ad25f2b6ba0419aa')
                    }
                }
            >
                <TextHeading5 color="white" style={{ textDecoration: 'underline' }}>서비스 정책 및 가이드라인 멘티편 ></TextHeading5>
            </Flex>
            <Flex style={{
                backgroundColor: colorCareerDiveBlue, borderRadius: 8,
                padding: 24, marginLeft: '12px',
                width: '100%', height: '202px',
                cursor: 'pointer',

            }}
                onClick={
                    () => {
                        window.open('https://pf.kakao.com/_xhHtxlxj')
                    }
                }>
                <TextHeading5 color="white" style={{ textDecoration: 'underline' }}>카카오톡 채널 문의</TextHeading5>
            </Flex>
        </BottomEventCardsWrapper>
    );
}

export default BottomEventGroup;
