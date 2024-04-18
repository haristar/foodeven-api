import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FooditemService } from './fooditem.service';
import { AddItemDto } from './dto/additem.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'multer';

@Controller('fooditem')
export class FooditemController {


    constructor(private readonly fooditemservice: FooditemService,){}

    @Get()
    getHello(): String{
        return this.fooditemservice.getHello()
    }

    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    async uploaddItemImage(@UploadedFile() file: MulterFile) {
        return this.fooditemservice.uploadItemImage(file)
    }

    @Post('add')
    async createeUser(@Body() itemdto : AddItemDto) {
        return this.fooditemservice.addFoodItem(itemdto)
    }
}
