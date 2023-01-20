import MenteeCalendar from "component/calendar/MenteeCalendar";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Card from "util/ts/Card";
// 테스트할 컴포넌트 파일 Import 


/**
 * @jest-environment jsdom
 */

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// 테스트마다 일반적으로 React 트리를 document의 DOM 엘리먼트에 렌더링하는데, 
// 이는 DOM 이벤트를 수신하기 위해 중요합니다. 테스트가 끝날 때는, 테스트와 관련된 
// 설정 및 값에 대해 정리(clean up)를 하고 document 트리에서 마운트 해제합니다.

test("카드 제목이 렌더링 되어야합니다", () => {
  act(() => {
    render(<MenteeCalendar />, container);
  });
  expect(container.querySelector("h6").textContent).toBe("상담 가능 일정");
});

//`act` 함수는 “unit”과 관련된 모든 업데이트 단위가 실행되기 전에 처리되고 
//DOM에 적용되도록 돕습니다.

test("디폴트로 오늘 달의 날짜가 모두 출력 되어야합니다", () => {
  act(() => {
    render(<MenteeCalendar />, container);
  });
  const lastDateOfMonth = new Date(new Date().getFullYear, new Date().getMonth(), 0).getDate()
  for (let i = 1; i <= lastDateOfMonth; i++) {

    expect(container.querySelector("data-elem")).toBe(`${i}`)
  }
  console.log(container.getElementsByClassName("data-elem").length)
});