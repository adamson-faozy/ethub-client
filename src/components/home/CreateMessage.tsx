import { Alert, AlertDescription, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, AlertTitle, Box, Button, Divider, Flex, Grid, GridItem, Input, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import { Web3 } from 'web3';
import { useAuth } from '../../auth/protected/AuthProvider';



type Props = {}

type State = {
    message?: string,
    wallet_to?: string,
    signedTransaction?: string
}

function CreateMessage(props: Props) {
    const [messageTransaction, setMessageTransaction] = useState<State>();
    const { auth } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef(null);

    const [isSending, setIsSending] = useState(false);
    const [showDivider, setshowDivider] = useState(false);


    const hanndleMessageChange = (event: any) => {
        const updateMessage: State = { ...messageTransaction, message: event.target.value };
        setMessageTransaction(updateMessage);
    }
    const handleWalletChange = (event: any) => {
        const updateWalletTo: State = { ...messageTransaction, wallet_to: event.target.value };
        setMessageTransaction(updateWalletTo);
    }

    async function signMessageTransaction(message: string) {
        try {
            //check metamask is installed
            if (window.ethereum) {
                // instantiate Web3 with the injected provider
                const web3 = new Web3(window.ethereum);

                //request user to connect accounts (Metamask will prompt)
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                //get the connected accounts
                const accounts: string[] = await web3.eth.getAccounts();
                let signedInAccount;

                //show the first connected account in the react page
                if (accounts.length > 0 && auth) {
                    signedInAccount = accounts.find(val => val === auth);
                }

                if (!signedInAccount) {
                    return (<AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Account Error
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    No account found on Metamask for current signed in wallet
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='red' onClick={onClose} ml={3}>
                                        Close
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>)
                }



            } else {
                alert('Please download metamask');
            }

        } catch (error) {
            console.error('Error requesting signature:', error);
        }
    }



    return (
        <>
            <Box width={'50%'} justifyContent="center" alignItems="center" margin={"auto"} height={"100%"} borderWidth='1px' borderBottom={'none'} overflow='hidden'>
                <Flex justifyContent="center" alignItems="center" direction={'column'}>
                    <Textarea _focus={{ boxShadow: "none" }} mb={"5px"} width={'100%'} resize={"none"} outline={"none"} boxShadow={"none"}
                        border={"none"} placeholder='Add a message to send' onChange={hanndleMessageChange}
                        onClick={() => setshowDivider(true)} onBlur={() => setshowDivider(false)}>
                    </Textarea>
                    {showDivider && <Divider borderBottomColor={'black'} borderBottomWidth={"2px"} />}
                    <Input _focus={{ boxShadow: "none" }} border={"none"} mb={"50px"} placeholder='Wallet to send to' onChange={handleWalletChange}
                        onClick={() => setshowDivider(true)} onBlur={() => setshowDivider(false)}>
                    </Input>
                    <Button isLoading={isSending}
                        loadingText='Submitting'
                        fontFamily={'cursive'}
                        borderRadius={'20px'}
                        colorScheme="blue" mb="10px">
                        PUUSH
                    </Button>
                </Flex>
            </Box>
        </>
    )
}

export default CreateMessage