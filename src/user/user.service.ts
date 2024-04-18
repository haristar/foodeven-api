import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserSignupDto } from 'src/auth/dto/usersignup.dto';
import { UserLoginDto } from 'src/auth/dto/userlogin.dto';
import { LoggerService } from 'src/shared/logger.service';
import { HelperService } from 'src/helper/helper.service';
import { ConstantconfigService } from 'src/constant/constantconfig.service';


@Injectable()
export class UserService {

    private logger = new LoggerService()
    private readonly tag = UserService.name

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
                private readonly helper: HelperService,
                private readonly constantconfig : ConstantconfigService){}

    getHello(): string {
        return 'Hello from user!';
    }

    async createUser(createsignupdto: UserSignupDto) : Promise<object> {
        try{

            this.logger.log(this.tag, `ENTRY: ${JSON.stringify(createsignupdto)}`)

            const { name, reg_no, emailId, password } = createsignupdto;
            if (!name || !reg_no || !emailId || !password) {
                return this.helper.responsemsg(12, this.constantconfig.field_empty, {});
            }

            if(!this.validateEmail(emailId)){
                return this.helper.responsemsg(25, this.constantconfig.invalid_email, 'Please enter a valid email id');
            }
        
            const existingUsers = await this.userModel.find({ emailId: emailId });
        
            if (existingUsers.length > 0) {
                return this.helper.responsemsg(13, this.constantconfig.user_already_exists, {});
            }
        
            createsignupdto.password = await this.hashPassword(password);
        
            const newUser = await this.userModel.create({
                userId: this.generateUniqueNumber(), 
                name: name,
                reg_no: reg_no,
                emailId: emailId,
                password: createsignupdto.password,
            });

            this.logger.log(this.tag, `USER: ${newUser}`)
        
            if (newUser) {
                return this.helper.responsemsg(14, this.constantconfig.created, 'Thanks for Signing up');
            } else {
                return this.helper.responsemsg(15, this.constantconfig.unable_to_create, {});
            }

        }catch(e){
            this.logger.error(this.tag,`ERROR: ${e.message}`)
            return this.helper.responsemsg(23, this.constantconfig.catch_error, {})
        }
    }

    private validateEmail(email: string): boolean {
        // Regular expression : email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    generateUniqueNumber(): string {
        const timestamp = Date.now().toString();
        const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${timestamp}-${randomNumber}`;
    }
    hashPassword(password) {
        return  bcrypt.hashSync(password,10)
    }
    comparePasswords(plainPassword, hashedPassword){
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }

    async loginUser(logindto: UserLoginDto) : Promise<Object>{
        try{

            this.logger.log(this.tag, `ENTRY: ${JSON.stringify(logindto)}`)

            const { emailId, password } = logindto;
            if (!emailId || !password) {
                return this.helper.responsemsg(12, this.constantconfig.field_empty, {});
            }
        
            const users = await this.userModel.find({ emailId: emailId });
            if (!users || users.length === 0) {
                return this.helper.responsemsg(16, this.constantconfig.user_not_found, {});
            } 
        
            for (const user of users) {
                const passwordpoint = await this.comparePasswords(password, user.password);
                if (passwordpoint) {
                    // const jwttoken = await this.generateJwt(user.name,user.userId,user.role)
                    // this.logger.log(this.tag, `JWT-GUEST: ${jwttoken}`)
                    // if(!jwttoken){
                    //     return this.helper.responsemsg(22, this.constantconfig.token_not_found, {})
                    // } `${jwttoken}`

                    return this.helper.responsemsg(10, this.constantconfig.success, 'login success');
                }
            }

            return this.helper.responsemsg(17, this.constantconfig.password_mismatch, {});
        }catch(e){
            this.logger.error(this.tag,`ERROR: ${e.message}`)
            return this.helper.responsemsg(23, this.constantconfig.catch_error, {})
        }
    }

}
