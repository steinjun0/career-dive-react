import { styled } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import {
  VerticalFlex,
  TextSubtitle1,
  colorCareerDiveBlue,
  UlNoDeco,
} from "util/styledComponent";
import { Card } from "util/Card";
import { useEffect } from "react";
import { useState } from "react";

const NavigationListItem = styled(`li`)`
  margin-top: 20px;
`
const SelectedNavigation = styled(TextSubtitle1)`
  cursor: pointer;
  color: ${colorCareerDiveBlue};
`;

const UnselectedNavigation = styled(TextSubtitle1)`
  cursor: pointer;
`;

const NavigationUndorderedList = styled(UlNoDeco)`
  margin: 0;
`;

function SideNavigation() {
  const menteeNavigationList = ['프로필', '계정', '리뷰', '결제 관리'];
  const mentorNavigationList = ['멘토 프로필', '계정', '대금 수령'];
  const menteeMapRouteSubPage = {
    '/mentee/mypage/profile': '프로필',
    '/mentee/mypage/account': '계정',
    '/mentee/mypage/review': '리뷰',
    '/mentee/mypage/payment': '결제 관리',
    '프로필': '/mentee/mypage/profile',
    '계정': '/mentee/mypage/account',
    '리뷰': '/mentee/mypage/review',
    '결제 관리': '/mentee/mypage/payment'
  }
  const mentorMapRouteSubPage = {
    '/mentor/mypage/profile': '멘토 프로필',
    '/mentor/mypage/account': '계정',
    '/mentor/mypage/recieve': '대금 수령',
    '멘토 프로필': '/mentor/mypage/profile',
    '계정': '/mentor/mypage/account',
    '대금 수령': '/mentor/mypage/recieve',
  }
  const params = useParams();
  const navigater = useNavigate();
  const [navigationList, setNavigationList] = useState([]);
  const [mapRouteSubPage, setMapRouteSubPage] = useState({});

  const onClickListItem = (subPage) => {
    navigater(subPage)
  };

  useEffect(() => {
    if (localStorage.getItem('IsMentorMode')) {
      setNavigationList(mentorNavigationList)
      setMapRouteSubPage(mentorMapRouteSubPage)
    } else {
      setNavigationList(menteeNavigationList)
      setMapRouteSubPage(menteeMapRouteSubPage)
    }
  }, [])


  return (
    <Card id='my-page-side-nav' title={'마이페이지'}>
      <VerticalFlex>
        <NavigationUndorderedList>
          {navigationList.map((subPage, index) => {
            if (subPage === mapRouteSubPage[params.subPage])
              return (
                <NavigationListItem key={index}>
                  <SelectedNavigation>
                    {subPage}
                  </SelectedNavigation>
                </NavigationListItem>
              );

            else
              return (
                <NavigationListItem key={index}>
                  <UnselectedNavigation onClick={() => { onClickListItem(mapRouteSubPage[subPage]) }}>
                    {subPage}
                  </UnselectedNavigation>
                </NavigationListItem>
              );
          })}
        </NavigationUndorderedList>
      </VerticalFlex>
    </Card>
  );
}

export default SideNavigation;
