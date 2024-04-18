import { Module } from '@nestjs/common';
import { FooditemService } from './fooditem.service';
import { FooditemController } from './fooditem.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodItem, FoodItemSchema } from './schema/fooditem.schema';
import { HelperModule } from 'src/helper/helper.module';
import { ConstantconfigModule } from 'src/constant/constantconfig.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: FoodItem.name, schema: FoodItemSchema}]),
    HelperModule,
    ConstantconfigModule
  ],
  providers: [FooditemService],
  controllers: [FooditemController]
})
export class FooditemModule {}
