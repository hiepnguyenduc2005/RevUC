import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
    authOrg: {name: "test"},


    //set authOrg to null
    logout: () => {
        set({ authOrg: null });
    },

    //login function, set authOrg state
    login: async (data) => {
        //handle api call with data
        set({ authOrg: {name: "logged in"} });
        
    }
    
}))