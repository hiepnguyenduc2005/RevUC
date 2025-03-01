import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
    authOrg: {name: "test"},


    //set authOrg to null
    logout: async () => {
        set({ authOrg: null });
    },
    
}))