import { styled } from "@mui/material";
import { VerticalCenterAlignDiv } from './styledComponent'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { Rating } from '@mui/material'



const RatingScore = styled('span')`
    font-size: 12px;
    color: #828282;
    margin-left: 6px;
    margin-right: 24px;
`;

function CustomRating({ value = 0, size = 'small' }) {
    return (<VerticalCenterAlignDiv>
        <Rating name="read-only" value={value} readOnly
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteIcon fontSize="inherit" style={{ color: '#EDEDED' }} />}
            size={size}
            sx={{
                color: '#E25D7D'
            }}
        />
        <RatingScore>{value}</RatingScore>
    </VerticalCenterAlignDiv>);
}
export default CustomRating;