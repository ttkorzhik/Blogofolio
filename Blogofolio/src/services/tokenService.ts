import HTTPService from "./HTTPService";
import {responseToJSONHandler} from "../utils/responseUtil";

class TokenService  {
    static async getToken(email: string, password: string) {
        return await HTTPService.post("https://studapi.teachmeskills.by/auth/jwt/create/", {
            email, password
        }, {
            "Content-Type": "application/json"
        }).then(responseToJSONHandler)
          .catch(console.error)
    }
    static async updateAccessToken(refresh: string) {
        return await HTTPService.post("https://studapi.teachmeskills.by/auth/jwt/refresh/", {
            refresh
        }, {
            "Content-Type": "application/json"
        }).then(responseToJSONHandler)
          .catch(console.error)
    }
    static async verifyToken(token: string) {
        return await HTTPService.post("https://studapi.teachmeskills.by/auth/jwt/verify/", {
            token
        }, {
            "Content-Type": "application/json"
        }).then(responseToJSONHandler)
          .catch(console.error)
    }
}

export default TokenService;