import { useMediaQuery, useTheme } from "@mui/material";
import testMentorImage from "../../assets/img/logo/testProfileImage.png";
import Button from "@mui/material/Button";

import {
    CircleImg,
    VerticalFlex,
    colorCareerDiveBlue,
    colorCareerDivePink,
    colorBackgroundCareerDiveBlue,
    EmptyHeight,
    TextHeading6,
    TextBody1,
    TextButton,
    colorBackgroundCareerDivePink,
    Flex,
    TextSubtitle1,
} from "util/styledComponent";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TagMedium } from "util/Custom/CustomTag";
import React from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CustomTogglebutton from "component/button/BasicToggleButton";

function MobileBottomBar({ isFavorite, setIsFavorite, id }: { isFavorite: boolean, setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, id: number; }) {
    const navigater = useNavigate();

    return <Flex
        style={{
            position: 'fixed',
            left: 0,
            zIndex: 10,
            bottom: 0,
            padding: '8px 16px',
            height: '56px',
            gap: '8px',
            backgroundColor: 'white',
            width: '100vw',
            filter: 'drop-shadow(0px -20px 40px rgba(130, 130, 130, 0.1))'
        }}
    >
        <CustomTogglebutton
            value='check'
            selected={isFavorite}
            onChange={() => {
                setIsFavorite((prev) => !prev);
            }}>
            <BookmarkBorderIcon />
        </CustomTogglebutton>
        <Button
            disableElevation
            disableRipple
            sx={{
                width: '100%',
                backgroundColor: colorCareerDiveBlue,
                color: 'white',
                borderRadius: '8px',
                '&:hover': { backgroundColor: colorCareerDiveBlue },
            }}
            onClick={() => { navigater(`/mentee/mentor/${id}/request`); }}
        >
            <TextSubtitle1>
                상담 신청
            </TextSubtitle1>
        </Button>
    </Flex>;
}

function MentorProfile({ name = '', description = '', inService = true, id = -1 }) {
    const theme = useTheme();
    const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const [isFavorite, setIsFavorite] = useState(false);
    const navigater = useNavigate();
    const location = useLocation();
    return (
        <Flex sx={{
            height: '200px',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
        }}>
            <Flex sx={{ alignItems: 'center', gap: '30px' }}>
                <CircleImg sx={{ width: '120px', height: '120px' }} src={testMentorImage} alt="profile-image" />
                <VerticalFlex>
                    <TextHeading6>{name} 멘토</TextHeading6>
                    <EmptyHeight height='4px'></EmptyHeight>
                    <TextBody1>{description}</TextBody1>
                    <EmptyHeight height='8px'></EmptyHeight>
                    <Flex>
                        {
                            inService ?
                                <TagMedium style={{ padding: '0 8px' }} color={colorCareerDiveBlue} background_color={colorBackgroundCareerDiveBlue}><TextButton>현직자</TextButton></TagMedium> :
                                <TagMedium style={{ padding: '0 8px' }} color={colorCareerDivePink} background_color={colorBackgroundCareerDivePink}><TextButton>경력자</TextButton></TagMedium>
                        }
                    </Flex>
                </VerticalFlex>
            </Flex>
            {
                !isDownMd ?
                    <Flex style={{
                        marginLeft: 'auto',
                        height: '40px',
                        gap: '12px',
                        justifyContent: 'space-between'
                    }}>
                        <CustomTogglebutton
                            value='check'
                            selected={isFavorite}
                            onChange={() => {
                                setIsFavorite((prev) => !prev);
                            }}>
                            <BookmarkBorderIcon />
                        </CustomTogglebutton>
                        {
                            !location.pathname.includes('request') &&
                            <Button
                                disableElevation
                                disableRipple
                                sx={{
                                    backgroundColor: colorCareerDiveBlue,
                                    color: 'white',
                                    borderRadius: '8px',
                                    '&:hover': { backgroundColor: colorCareerDiveBlue },
                                    width: '100px'
                                }}
                                onClick={() => { navigater(`/mentee/mentor/${id}/request`); }}
                            >
                                <TextSubtitle1>
                                    상담 신청
                                </TextSubtitle1>
                            </Button>
                        }
                    </Flex> :
                    (
                        !location.pathname.includes('request') &&
                        <MobileBottomBar
                            isFavorite={isFavorite}
                            setIsFavorite={setIsFavorite}
                            id={id}
                        />
                    )
            }
        </Flex >
    );
}

export default MentorProfile;
