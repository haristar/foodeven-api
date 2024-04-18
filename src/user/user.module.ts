import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { HelperModule } from 'src/helper/helper.module';
import { ConstantconfigModule } from 'src/constant/constantconfig.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    HelperModule,
    ConstantconfigModule
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
