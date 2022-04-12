import { styled } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import {
  VerticalFlex,
  TextSubtitle1,
  colorCareerDiveBlue,
  UlNoDeco,
} from "util/styledComponent";
import Card from "util/Card";

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
  const navigationList = ['프로필', '계정', '후기', '결제'];
  const mapRoutetoSubPage = { 'profile': '프로필', 'account': '계정', 'review': '후기', 'payment': '결제', }
  const mapSubPageToRoute = { '프로필': 'profile', '계정': 'account', '후기': 'review', '결제': 'payment', }
  const params = useParams();
  const navigater = useNavigate();

  const onClickListItem = (subPage) => {
    navigater(`/mentee/mypage/${subPage}`)
  };

  return (
    <Card id='my-page-side-nav' title={'마이페이지'}>
      <VerticalFlex>
        <NavigationUndorderedList>
          {navigationList.map((subPage, index) => {
            if (subPage === mapRoutetoSubPage[params.subPage])
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
                  <UnselectedNavigation onClick={() => { onClickListItem(mapSubPageToRoute[subPage]) }}>
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
