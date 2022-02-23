import { styled } from "@mui/material";
import { VerticalCenterAlignDiv } from '../../util/styledComponent'


const BottomEventCardWrapper = styled('div')`
    display:flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 582px;
    height: 250px;
    background-color: #698CFF;
    border-radius: 8px;
`;

const Title = styled('span')`
    text-align: start;
    font-weight: 900;
    font-size: 24px;
    margin: 30px;
    color: white;
`;

function BottomEventCard() {
    return (
        <BottomEventCardWrapper>
            <Title>커리어다이브<br />친구 추천 이벤트</Title>
        </BottomEventCardWrapper>
    );
}

export default BottomEventCard;
