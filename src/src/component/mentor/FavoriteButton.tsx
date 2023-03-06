import { Button, styled } from "@mui/material";
import API from "API"
import React, { HTMLProps, useState } from "react";
import { useEffect } from "react"
import { colorBackgroundGrayLight, colorCareerDivePink, colorTextLight } from "util/styledComponent";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const FavoriteMentorButtonClicked = styled(Button)`
  min-width: 40px;
  min-height: 40px;
  background-color: rgba(226, 93, 125, 0.2);;
  color: white;
  &:hover {
    background-color: rgba(226, 93, 125, 0.2);;
    color: white;
  }
`;

const FavoriteMentorButton = styled(Button)`
  min-width: 40px;
  min-height: 40px;
  background-color: ${colorBackgroundGrayLight};
  color: white;
  &:hover {
    background-color: ${colorBackgroundGrayLight};
    color: white;
  }
`;


export default function FavoriteButton({ menteeId, mentorId, ...props }: { menteeId: number, mentorId: number } & HTMLProps<HTMLDivElement>) {
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    useEffect(() => {
        API.getAccountFavoriteMentorList({ menteeId: menteeId })
            .then((res) => {
                if (res.data === null) {
                    setIsFavorite(false)
                } else {
                    if (res.data.find((e: any) => e.UserID === mentorId)) {
                        setIsFavorite(true)
                    } else {
                        setIsFavorite(false)
                    }
                }
            })

    }, [])

    return <div {...props}>
        {
            isFavorite ?
                <FavoriteMentorButtonClicked disableElevation onClick={() => {
                    // API.postAccountMenteeFavoritesMentor({ menteeId, mentorId })
                    // TODO: 삭제 api 추가 필요
                    setIsFavorite(false)
                }}>
                    <BookmarkBorderIcon style={{ color: colorCareerDivePink }} />
                </FavoriteMentorButtonClicked>
                :
                <FavoriteMentorButton disableElevation onClick={() => {
                    API.postAccountMenteeFavoritesMentor({ menteeId, mentorId })
                    setIsFavorite(true)
                }}>
                    <BookmarkBorderIcon style={{ color: colorTextLight }} />
                </FavoriteMentorButton>
        }
    </div>


    if (isFavorite) {
        return (<FavoriteMentorButtonClicked disableElevation onClick={() => {
            // API.postAccountMenteeFavoritesMentor({ menteeId, mentorId })
            // TODO: 삭제 api 추가 필요
            setIsFavorite(false)
        }}>
            <BookmarkBorderIcon style={{ color: colorCareerDivePink }} />
        </FavoriteMentorButtonClicked>)
    }
    else {
        return (<FavoriteMentorButton disableElevation onClick={() => {
            API.postAccountMenteeFavoritesMentor({ menteeId, mentorId })
            setIsFavorite(true)
        }}>
            <BookmarkBorderIcon style={{ color: colorTextLight }} />
        </FavoriteMentorButton>)
    }
}
