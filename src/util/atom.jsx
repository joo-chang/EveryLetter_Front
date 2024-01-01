import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist();

export const userState = atom({
    key: "user",
    default: {
        userId: 0,
        email: '',
        nickname: '',
        profileUrl: '',
        role: ''
    },
    // 새로고침해도 값 유지
    effects_UNSTABLE: [persistAtom],
})