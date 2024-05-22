import { Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import CreateMessage from './CreateMessage';
import Message from './Message';
import Messages from './Message';
import { Post } from '../../types/messagetypes';


export interface IAppProps {
}

export default class Home extends React.Component<IAppProps> {

    recievedPosts: Post[] = [{
        title: "hey",
        content: "mycontent"
    },
    {
        title: "hey2",
        content: "mycontent2"
    }]

    sentPosts: Post[] = [{
        title: "hey",
        content: "thanks for sending, lets talk more"
    },
    {
        title: "hey3",
        content: "displayed"
    }]
    public render() {
        return (
            <Grid
                templateAreas={`"header header"
                "nav create"
                "nav message"`}
                gridTemplateRows={"0.5fr 2fr 4fr"}
                gridTemplateColumns={'1fr 3fr'}
                gap='2'
                minHeight={"100VH"}
                color='blackAlpha.700'
                fontWeight='bold'>
                <GridItem pl='2' bg='red.300' area={'header'}>
                    Header
                </GridItem>
                <GridItem pl='2' bg='pink.300' area={'nav'}>
                    Nav
                </GridItem>

                <GridItem pl='2' bg='white' color={"black"} area={'create'}>
                    <CreateMessage></CreateMessage>
                </GridItem>
                <GridItem pl='2' bg='white' color={"black"} area={'message'}>
                    <Tabs variant='soft-rounded'>
                        <TabList justifyContent="center" alignItems="center" margin={"auto"}>
                            <Tab _hover={{ bg: "gray.200" }}>Received</Tab>
                            <Tab _hover={{ bg: "gray.200" }}>Sent</Tab>
                        </TabList>

                        <TabPanels >
                            <TabPanel borderWidth='1px' borderTop={'none'} borderBottom={'none'} overflow='hidden' width='50%' justifyContent="center" alignItems="center" margin={"auto"}>
                                <Messages isSent={false} posts={this.recievedPosts}></Messages>
                            </TabPanel>
                            <TabPanel borderWidth='1px' borderBottom={'none'} borderTop={'none'} overflow='hidden' width='50%' justifyContent="center" alignItems="center" margin={"auto"}>
                                <Messages isSent={true} posts={this.sentPosts}></Messages>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </GridItem>

            </Grid>
        );
    }
}
