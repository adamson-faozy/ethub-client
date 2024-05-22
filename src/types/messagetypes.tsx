import { User } from "./usertypes";

export interface Post {
    id?: number,
    content: string,
    posts?: Array<Post>,
    sender?: User,
    receiver?: User | null,
    receiver_wallet?: string,
    title?: string,
    images?: Array<Image> | null,
    sentOn?: string


}

export interface Image {
    id: number
    image_url: string
}

export interface Transaction {
    id: number,
    received: boolean,
    sentOn: string,
    receivedOn: string,
    amountSent: number,
}