import { AppException } from "./exception.model";

export class ValidationException extends AppException{
    constructor(
        message:string
    ){
        super(
            400,
            message
        )
    }
}