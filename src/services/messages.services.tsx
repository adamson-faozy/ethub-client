import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual API base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

const axiosPrivateInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL
})

export const getAllMessages = async () => {
    try {
        const response = await axiosInstance.get('messages');
        return response.data.challengeMessage;
    } catch (error) {
        console.log('Error fetching user data:', error);
        throw error;
    }
};


export const senMessage = async (wallet_address: string, signed_transaction: string, amount: number) => {
    try {
        const response = await axiosPrivateInstance.post('sendMessage', { wallet_address, signed_transaction, amount });
        return response.data;
    } catch (error) {
        console.log('Error fetching user data:', error);
        throw error;
    }
};


// Other API request functions...
