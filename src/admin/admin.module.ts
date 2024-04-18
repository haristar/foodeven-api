import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schema/admin.schema';
import { HelperModule } from 'src/helper/helper.module';
import { ConstantconfigModule } from 'src/constant/constantconfig.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}]),
    HelperModule,
    ConstantconfigModule
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
