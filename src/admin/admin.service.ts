import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schema/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AdminSignupDto } from 'src/auth/dto/adminsignup.dto';
import { AdminLoginDto } from 'src/auth/dto/adminlogin.dto';
import { LoggerService } from 'src/shared/logger.service';
import { HelperService } from 'src/helper/helper.service';
import { ConstantconfigService } from 'src/constant/constantconfig.service';

@Injectable()
export class AdminService {

    private logger = new LoggerService()
    private readonly tag = AdminService.name

    constructor(@InjectModel(Admin.name) private readonly userModel: Model<Admin>,
                private readonly helper: HelperService,
                private readonly constantconfig : ConstantconfigService){}

    getHello(): string {
        return 'Hello from admin!';
    }

    async createAdmin(createsignupdto: AdminSignupDto) : Promise<object> {
        try{

            this.logger.log(this.tag, `ENTRY: ${JSON.stringify(createsignupdto)}`)

            const { username, password } = createsignupdto;
            if (!username || !password) {
                return this.helper.responsemsg(12, this.constantconfig.field_empty, {});
            }
        
            const existingUsers = await this.userModel.find({ username: username });
        
            if (existingUsers.length > 0) {
                return this.helper.responsemsg(13, this.constantconfig.user_already_exists, {});
            }
        
            createsignupdto.password = await this.hashPassword(password);
        
            const newUser = await this.userModel.create({
                userId: this.generateUniqueNumber(), 
                username: username,
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

    async loginAdmin(logindto: AdminLoginDto) : Promise<Object>{
        try{

            this.logger.log(this.tag, `ENTRY: ${JSON.stringify(logindto)}`)

            const { username, password } = logindto;
            if (!username || !password) {
                return this.helper.responsemsg(12, this.constantconfig.field_empty, {});
            }
        
            const users = await this.userModel.find({ username: username });
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
                    // } ${jwttoken}

                    return this.helper.responsemsg(10, this.constantconfig.success, `login success`);

                }
            }

            return this.helper.responsemsg(17, this.constantconfig.password_mismatch, {});
        }catch(e){
            this.logger.error(this.tag,`ERROR: ${e.message}`)
            return this.helper.responsemsg(23, this.constantconfig.catch_error, {})
        }
    }

}
