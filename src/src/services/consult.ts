import { IConsult } from "interfaces/consult";


export function onEnterSession(consult: IConsult) {
    const startDateTime = consult.startTime.getTime();
    const nowTime = new Date().getTime();

    if (nowTime - startDateTime >= 1000 * 60 * 6 - 1) { // 5분59초 이후 진입 불가. 
        alert('종료된 상담이에요.');
        return;
    }

    if (consult.status === 'created') {
        alert('아직 상담 예약이 확정되지 않았어요.');
    } else if (consult.status === 'approved') {
        if (nowTime - startDateTime <= -1000 * 60 * 11 - 1) {
            alert('상담 시간 10분 전부터 입장할 수 있어요.');
        }
        else {
            window.open(`/session/${consult.id}`, '_blank');
        }
    } else if (['rejected'].includes(consult.status)) {
        alert('예약이 이뤄지지 못한 상담이에요.');
    } else if (['done', 'mentor_noshow', 'mentee_noshow', 'noshow'].includes(consult.status)) {
        alert('종료된 상담이에요.');
    } else {
        alert(`상담 상태에 문제가 발생했어요. 카카오 채널로 관리자에게 문의해 주세요. 상태: ${consult.status}`,);
    }
}
