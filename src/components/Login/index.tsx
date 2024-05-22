import { Flex, Box, Heading } from "@chakra-ui/react"
import React, { useState, useEffect } from 'react';
import { Web3 } from 'web3';

import {
    FormLabel,
    FormControl,
    Input,
    Button
} from "@chakra-ui/react";
import { fetchLoginChallenge, loginUser } from "../../services/login.service";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/protected/AuthProvider";



export default function Login() {

    const [message, setMessage] = useState('');
    const [connectedAccount, setConnectedAccount] = useState('null');
    const [signedMessage, setSignedMessage] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const { auth, setAuth } = useAuth();

    const handleWalletChange = (event: any) => setWalletAddress(event.target.value)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    useEffect(() => {
        (async () => {
            try {
                const act = fetchLoginChallenge();
                const str = await act;
                console.log(str);
                setMessage(str);
                console.log("after set message is", message);

            } catch (error) {

            }
        })();
    }, []);

    const handleSignMessageRandom = () => {
        console.log("message is", message);
        requestSignature(message);
    };
    console.log(walletAddress)

    const handleLogin = async () => {
        try {
            const userData = await loginUser(walletAddress, signedMessage, message);
            // Handle successful login (e.g., navigate to home screen)
            setAuth && setAuth(walletAddress);
            navigate(from, { replace: true });
            console.log('Logged in successfully:', userData);
        } catch (error: any) {
            // Handle login error (e.g., display error message)
            console.log('Login failed', error.message);
        }
    };

    async function requestSignature(message: string) {
        try {
            //check metamask is installed
            if (window.ethereum) {
                // instantiate Web3 with the injected provider
                const web3 = new Web3(window.ethereum);

                //request user to connect accounts (Metamask will prompt)
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                //get the connected accounts
                const accounts: string[] = await web3.eth.getAccounts();

                //show the first connected account in the react page
                if (accounts.length > 0)
                    setConnectedAccount(accounts[0]);

                const signature = await window.ethereum.request({
                    method: 'personal_sign',
                    params: [message, accounts[0]],
                });
                console.log(signature)
                setSignedMessage(signature)
            } else {
                alert('Please download metamask');
            }

        } catch (error) {
            console.error('Error requesting signature:', error);
        }
    }

    return (
        <Flex justifyContent="center" alignItems="center" minHeight="100vh">
            <Box minW="md" maxW="xl" borderWidth="1px" borderRadius="lg" p="10" boxShadow="lg" >
                <Heading as="h3" mb="4" textAlign="center">Login</Heading>
                <FormControl id="username" mb="4">
                    <FormLabel>Wallet address</FormLabel>
                    <Input placeholder="Wallet Address" width="100%"
                        type="text"
                        value={walletAddress} onChange={handleWalletChange} />
                </FormControl>
                <FormControl id="password" mb="4">
                    <FormLabel>Signature</FormLabel>
                    <Input id="signature"
                        placeholder="Signed Message"
                        readOnly={true}
                        value={signedMessage} />
                </FormControl>
                <Button colorScheme="blue" width="100%" mb="10px" onClick={handleSignMessageRandom}> Sign random message</Button>
                <Button colorScheme="blue" width="100%" onClick={handleLogin}>Sign in</Button>
            </Box>
        </Flex >
    );
}
function alert(arg0: string) {
    throw new Error("Function not implemented.");
}

