import React from 'react'
import { Post } from '../../types/messagetypes'
import { Box, Flex, Icon, Image } from '@chakra-ui/react'
import ImageSlider from '../utility/image/ImageSlider'

type Props = {
    post: Post,
    isSent: boolean
}

const Message = (props: Props) => {
    const post: Post = props.post
    return (
        <Box>
            <Flex justifyItems={'center'} color='grey.600' fontSize={'small'} direction={'row'}>
                {props.isSent ? <span>#### {post.receiver_wallet}</span> : <span>#### {post.sender?.wallet_address}</span>}
                <span><Icon>dot</Icon>{post.sentOn}</span>
            </Flex>


            <div><b>{post.title}</b></div>

            <div>{post.content}</div>

            {post.images?.length && post.images?.length >= 2 ?
                post.images && <ImageSlider images={post.images} ></ImageSlider>
                : post.images && <Image src={post.images[0].image_url}></Image>}


            <div></div>
            <div></div>
        </Box>

    )
}

type MessagesProps = {
    posts: Post[],
    isSent: boolean
}

const Messages = ({ posts, isSent }: MessagesProps) => {
    return (
        posts && posts.length > 0 ? <Box>
            {posts.map((value) => (
                <Message post={value} isSent={isSent}></Message>
            ))}
        </Box> :
            <div>You have No Messages to view</div>
    )
}

export default Messages