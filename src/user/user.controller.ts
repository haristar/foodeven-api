import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignupDto } from 'src/auth/dto/usersignup.dto';
import { UserLoginDto } from 'src/auth/dto/userlogin.dto';


@Controller('user')
export class UserController {

    constructor(private readonly userservice: UserService,){}

    @Get()
    getHello(): String{
        return this.userservice.getHello()
    }

    @Post('signup')
    async createeUser(@Body() signupdto : UserSignupDto) {
        return this.userservice.createUser(signupdto)
    }

    @Post('login')
    async loginnUser(@Body() logindto: UserLoginDto){
        return this.userservice.loginUser(logindto)
    }    
}
