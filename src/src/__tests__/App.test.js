import { cleanup, render, screen } from "@testing-library/react";
import { getDatesOfMonth } from "component/calendar/Calendar.service";
import MenteeCalendar from "component/calendar/MenteeCalendar";
import React from "react";
import { act } from "react-dom/test-utils";
// 테스트할 컴포넌트 파일 Import 

/**
 * @jest-environment jsdom
 */

// describe("", () => {
//   afterEach(cleanup)
// })

// let container = null;
// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// 테스트마다 일반적으로 React 트리를 document의 DOM 엘리먼트에 렌더링하는데, 
// 이는 DOM 이벤트를 수신하기 위해 중요합니다. 테스트가 끝날 때는, 테스트와 관련된 
// 설정 및 값에 대해 정리(clean up)를 하고 document 트리에서 마운트 해제합니다.

it("카드 제목이 렌더링 되어야합니다", () => {
  render(<MenteeCalendar yearAndMonthDate={new Date()} />);
  expect(screen.getByText("상담 가능 일정"));
});

it("모든 달의 날짜가 모두 출력 되어야합니다(view)", () => {
  for (let i = 1; i <= 12; i++) {
    const testDate = new Date(new Date().getFullYear(), i - 1, 1)
    const lastDateOfMonth = new Date(new Date().getFullYear(), i, 0).getDate()
    act(() => {
      render(<MenteeCalendar yearAndMonthDate={testDate} />);
    });
    const element = screen.getAllByTestId("date-elem", undefined)
    expect(element.filter(e => e.textContent !== '')).toHaveLength(lastDateOfMonth)
    cleanup()
  }
});

it("모든 달의 날짜가 모두 출력 되어야합니다(service)", () => {
  for (let i = 1; i <= 12; i++) {
    const testDate = new Date(new Date().getFullYear(), i - 1, 1)
    const lastDateOfMonth = new Date(new Date().getFullYear(), i, 0).getDate()
    expect(getDatesOfMonth(testDate).slice(-1)[0].getDate()).toBe(lastDateOfMonth)
  }
});