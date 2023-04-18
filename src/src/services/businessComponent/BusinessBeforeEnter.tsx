import { AccountDataContext } from "index";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BusinessBeforeEnter() {
    const { updateAccountData } = useContext(AccountDataContext);
    const navigate = useNavigate();
    const location = useLocation();
    const CBTCode = localStorage.getItem('CBTCode');

    function checkMentor() {
        if (localStorage.getItem('IsMentor') === 'true') {
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
    }

    useEffect(() => {
        console.log('CBTCode', CBTCode);
        if (CBTCode !== 'cbt2023') {
            navigate('/cbt');
        } else {
            if (location.pathname.slice(0, 8) !== '/session') {
                checkMentor();
            }
        }
    }, []);

    return null;
}