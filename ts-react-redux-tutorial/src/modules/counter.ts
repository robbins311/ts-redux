// 카운터 리덕스 모듈, Ducks패턴
// Ducks 패턴에서는 편의성을 위하여 액션 type, 액션 생성함수, 리듀서를 모두 한 파일에 작성

/* 액션 type 선언 */
/* 
as const를 선언하지않으면 type이 모두 string으로 리턴
*/
const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCREASE_BY" as const;

/* 액션 함수 선언 (function, arrow f 둘다 가능) */
/* 
increase 와 decrease 의 경우엔 함수에서 따로 파라미터를 받아오지 않음. 
increaseBy의 경우엔 diff라는 값을 파라미터로 받아와서 액션의 payload값으로 설정. 
이 과정에서 값의 이름을 payload로 바꿔주었는데 이는 FSA 규칙을 따르기 위함.
*/
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff,
});

/* 액션 객체들에 대한 type 준비 */
/* 
여기서 type은 TypeScript의 타입을 의미 나중에 리듀서를 작성 할 때, 
action 파라미터의 타입을 설정하기 위해 만든 모든 액션들의 typeScript 타입을 준비해야함.
 */
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

/* 상태의 타입과 초깃값 선언 */

// 관리상태 타입
type CounterState = {
  count: number;
};
// 관리상태 초기값
const initialState: CounterState = {
  count: 0,
};

/* 리듀서 작성 */
/* 
리듀서 작성 시 함수의 반환타입에 상태의 타입을 꼭 넣어야함
*/
function counter(state: CounterState = initialState, action: CounterAction) {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      break;
  }
}

export default counter;
