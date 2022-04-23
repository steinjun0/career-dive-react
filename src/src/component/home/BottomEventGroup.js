import { styled } from "@mui/material";
import { RowAlignCenterFlex } from 'util/styledComponent'
import BottomEventCard from './BottomEventCard'

const BottomEventCardsWrapper = styled(RowAlignCenterFlex)`
    justify-content: space-between;
    width: 100%;
    margin-top: 80px;
    margin-bottom: 204px;
`;


function BottomEventGroup() {
    return (
        <BottomEventCardsWrapper>
            <BottomEventCard></BottomEventCard>
            <BottomEventCard></BottomEventCard>
        </BottomEventCardsWrapper>
    );
}

export default BottomEventGroup;
