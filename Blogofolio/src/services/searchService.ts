import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";
import {IPostCard} from "../components/common/PostsList/PostCard/PostCard";

export interface Results {
    count: number,
    next: string | null,
    previous: string | null,
    results: IPostCard[]
}

class SearchService{
    static async getSearchResults(search: string = "", limit: number = 6, offset: number = 0): Promise<Results>  {
        return await HTTPService.get(`https://studapi.teachmeskills.by/blog/posts?search=${search}&limit=${limit}&offset=${offset}`)
            .then(responseToJSONHandler)
            .catch(console.error)
    }

    static async getSearchPage(url: string): Promise<Results> {
        return await HTTPService.get(url).then(responseToJSONHandler).catch(console.log)
    }
}

export default SearchService;