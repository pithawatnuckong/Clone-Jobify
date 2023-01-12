import CustomAPIError from "./CustomAPIError.js";
import { StatusCodes } from "http-status-codes";

class UnAuthenticatedError extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCodes = StatusCodes.UNAUTHORIZED
    }
}
 
export default UnAuthenticatedError;