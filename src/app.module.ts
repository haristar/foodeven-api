import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { HelperModule } from './helper/helper.module';
import { ConstantconfigModule } from './constant/constantconfig.module';
import { FooditemModule } from './fooditem/fooditem.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AdminModule,
    HelperModule,
    ConstantconfigModule,
    FooditemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
