import { AccountDataContext } from "index";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BusinessCheckMentor() {
    const { accountData, updateAccountData } = useContext(AccountDataContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname.slice(0, 9));
        if (JSON.parse(localStorage.getItem('IsMentor')!) && location.pathname.slice(0, 8) !== '/session') {
            updateAccountData('isMentorMode', true);
            localStorage.setItem('IsMentorMode', 'true');
            navigate('/mentor');
        } else if (location.pathname.slice(0, 7) === '/mentor' && !location.pathname.includes('/mentor/register')) {
            if (!JSON.parse(localStorage.getItem('IsMentor')!)) {
                updateAccountData('isMentorMode', false);
                alert('멘토 등록을 진행해주세요');
                navigate('/mentor/register');
            }
        }


    }, []);

    return null;
}