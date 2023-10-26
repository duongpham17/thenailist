import axios from 'axios';

export interface InstgramMediaApi {
    caption: string,
    id: string,
    media_type: "VIDEO",
    media_url: string,
    permalink: string,
    thumbnail_url: string,
    timestamp: string
};

const api_key = process.env.NEXT_PUBLIC_API_INSTAGRAM_API_KEY as string;

export const getInstagramMedia = async (): Promise<InstgramMediaApi[] | null> => {
    try{
        const url = `https://graph.instagram.com/v13.0/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${api_key}`;
        const response = await axios.get(url);
        return response.data.data
    } catch(err: any){
        return null
    }
}
