import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";
import {Results} from "./searchService";

class PostsService{
    static async getPostsResultsFirstPage(limit: number, offset: number = 0):Promise<Results>  {
        return await HTTPService.get(`https://studapi.teachmeskills.by/blog/posts?limit=${limit}&offset=${offset}`)
            .then(responseToJSONHandler)
            .catch(console.error)
    }
    static async getPostsResults(limit: number = 12, offset: number = 0): Promise<Results>  {
        return await HTTPService.get(`https://studapi.teachmeskills.by/blog/posts?limit=${limit}&offset=${offset}`)
            .then(responseToJSONHandler)
            .catch(console.error)
    }
}

export default PostsService;