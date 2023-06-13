import { create } from 'zustand';

export const useUserDetailsService = create((set, get)=>({
    userInfo: {},
    updateUserInfo: (info)=>{
        set((state)=>({
            userInfo: {...state.userInfo, ...info} 
        }))
    }
}));

    

