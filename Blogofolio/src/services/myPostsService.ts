import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";

class MyPostsService  {
    static async getMyPosts(token: string) {
        return await HTTPService.get("https://studapi.teachmeskills.by/blog/posts/my_posts/", {
            "Authorization": `Bearer ${token}`
        })
            .then(responseToJSONHandler)
            .catch(console.error)
    }
}

export default MyPostsService;