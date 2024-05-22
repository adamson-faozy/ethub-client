// api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual API base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

const axiosPrivateInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL
})

export const fetchLoginChallenge = async () => {
    try {
        const response = await axiosInstance.get('auth/login');
        return response.data.challengeMessage;
    } catch (error) {
        console.log('Error fetching user data:', error);
        throw error;
    }
};


export const loginUser = async (wallet_address: string, signature: string, challengeMessage: string) => {
    try {
        const response = await axiosPrivateInstance.post('auth/login', { wallet_address, signature, challengeMessage });
        return response.data;
    } catch (error) {
        console.log('Error fetching user data:', error);
        throw error;
    }
};


export const getCurrentUser: any = async () => {
    try {
        const response = await axiosPrivateInstance.get('auth/currentuser');
        return response.data.wallet;
    } catch (error) {
        console.log('Error fetching user data:', error);
        throw error;
    }
};
// Other API request functions...
