import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminSignupDto } from 'src/auth/dto/adminsignup.dto';
import { AdminLoginDto } from 'src/auth/dto/adminlogin.dto';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminservice: AdminService,){}

    @Get()
    getHello(): String{
        return this.adminservice.getHello()
    }

    @Post('signup')
    async createeAdmin(@Body() signupdto : AdminSignupDto) {
        return this.adminservice.createAdmin(signupdto)
    }

    @Post('login')
    async loginnAdmin(@Body() logindto: AdminLoginDto){
        return this.adminservice.loginAdmin(logindto)
    }    

}
