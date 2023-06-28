import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom({
    key: "userState",
    default: {
    userId: null,
    userNickname: null,
    },
    effects_UNSTABLE: [persistAtom],
});