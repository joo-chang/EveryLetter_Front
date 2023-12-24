import { atom } from "recoil";

export const userState = atom({
    key: "user",
    default: {
        userId: 0,
        email: '',
        nickname: '',
        profileUrl: '',
        role: ''
    }
})