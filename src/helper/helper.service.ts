import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {

    responsemsg(code: number, msg: string, data: any){
        return {statusCode: code, msg: msg, data: data}
    }
}
