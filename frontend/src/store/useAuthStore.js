import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
    authOrg: null,


    //set authOrg to null
    logout: () => {
        set({ authOrg: null });
    },

    //login function, set authOrg state
    login: async (data) => {
        try {
            const response = await axiosInstance.post("/login-org", data); 
            set({ authOrg: response.data });
        } catch (error) {
            console.log(error)
        }
    },

    signup: async (data) => {
        try {
            const response = await axiosInstance.post("/signup-org", data); 
            set({ authOrg: response.data });
        } catch (error) {
            console.log(error)
        }
    }
    
}))