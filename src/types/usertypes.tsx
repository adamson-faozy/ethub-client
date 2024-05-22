import { Post } from "./messagetypes";

export interface User {
    id: number,

    wallet_address: string,

    posts: Array<Post>

}