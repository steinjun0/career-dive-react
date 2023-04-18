import { useContext, useEffect, useState } from 'react';

import { useTheme, } from "@mui/material";

import {
    VerticalFlex,
    TextHeading6,
    Flex,
} from "util/styledComponent";
import { CustomButton } from 'util/Custom/CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomTextField from "util/ts/Custom/CustomTextField";
import React from "react";

function Cbt() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [code, setCode] = useState<string>('');

    const onClickEnter = async () => {
        if (code === 'cbt2023') {
            localStorage.setItem('CBTCode', 'cbt2023');
            navigate('/');
        }
    };

    return (
        <Flex
            sx={{
                width: '100%',
                height: 'calc(100vh - 80px - 32px)',
                alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
            }}
        >
            <VerticalFlex sx={{
                width: '100%',
                minWidth: '284px',
                maxWidth: '378px',
                [theme.breakpoints.down('sm')]: { margin: '16px' }
            }}>
                <VerticalFlex>
                    <TextHeading6>
                        CBT 전용 입장 번호
                    </TextHeading6>
                    <VerticalFlex sx={{ gap: '24px', marginTop: '36px', marginBottom: '24px' }}>
                        <CustomTextField
                            onChange={(event) => { setCode(event.target.value); }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    onClickEnter();
                                    event.preventDefault();
                                }
                            }}
                            placeholder="입장 번호"
                            type='text'
                            height="48px"
                        />
                    </VerticalFlex>
                </VerticalFlex>

                <VerticalFlex sx={{ gap: '24px' }}>
                    <CustomButton
                        height='48px'
                        onClick={onClickEnter}>
                        입장
                    </CustomButton>
                </VerticalFlex>
            </VerticalFlex>
        </Flex >

    );
}

export default Cbt;
