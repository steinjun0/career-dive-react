import { styled } from "@mui/material";
import { colorCareerDivePink, EmptyWidth, RowAlignCenterFlex, TextCaption } from './styledComponent'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { Rating } from '@mui/material'

const RatingScore = styled('span')`
    font-size: 12px;
    margin-left: 6px;
    margin-bottom: 2px;
    // color: #828282;
    // margin-right: 24px;
`;

function CustomRating({ value = 0, size = '16px', readOnly = true, setValue = null, precision = 0.5 }) {
    return (<RowAlignCenterFlex>
        <Rating name="read-only" value={value}
            readOnly={readOnly}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={precision}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteIcon fontSize="inherit" style={{ color: '#EDEDED' }} />}
            sx={{
                fontSize: size,
                color: colorCareerDivePink
            }}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
    </RowAlignCenterFlex>);
}
export default CustomRating;