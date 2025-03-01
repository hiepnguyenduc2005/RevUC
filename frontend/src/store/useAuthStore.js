import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
    authOrg: null,

    logout: async () => {

    },
    
}))