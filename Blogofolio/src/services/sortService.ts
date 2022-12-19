import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";

class SortService{
    static async getSortResults(ordering: string = "") {
        return await
            HTTPService.get(`https://studapi.teachmeskills.by/blog/posts?ordering=${ordering}`)
            .then(responseToJSONHandler)
            .catch(console.log)
    }
}

export default SortService;