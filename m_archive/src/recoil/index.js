import {atom} from "recoil";

export const meState = atom({
    key:'meState',
    default: null,
})

/**
 //* MEMO:
 * - useRecoilState() : useState()와 유사함, [state,setState] 튜플에 할당, 
 * 인자에 Atoms(혹은 Selector)를 넣어준다.
 * - useRecoilValue() : 전역상태의 state 상태값만으 참조! 하기위해 사용됨, 선언된 변수에 할당, 사용.
 * - useSetRecoilState():  전역상태의 setter 함수만을 활용하기위해 사용. 선언된 함수변수에 할당하여 사용
 * - useResetRecoilState() : 전역상태를 default(초기값)으로 Reset하기위해 사용됨. 선언된 함수변수에 할당하여 사용.
 * 
 * 
 * import {useRecoilState, useSetRecoilState, useResetRecoilState} from 'recoil';
 * import {countState} from "/recoil/count";
 * const [count,setCount] = useRecoilState(countState);
 * const countValue = useRecoilValue(countState); //구독하는 atom의 값만반환
 * const setCountUseSetRecoilState = useSetRecoilState(countState); 값을 변경하는 함수만 반환
 * const resetCount = useResetRecoilState(countState); 설정된 기본값으로 리셋
 * 
 * Selector는 다음에 알아보도록...
 * 
 */