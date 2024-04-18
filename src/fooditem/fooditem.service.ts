import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from 'src/shared/logger.service';
import { MulterFile } from 'multer';
import { FoodItem } from './schema/fooditem.schema';
import { Model } from 'mongoose';
import { HelperService } from 'src/helper/helper.service';
import { ConstantconfigService } from 'src/constant/constantconfig.service';
import { AddItemDto } from './dto/additem.dto';
import { FirebaseService } from 'src/helper/firebase.service';
import { Category } from 'src/shared/types';

@Injectable()
export class FooditemService {

    private logger = new LoggerService()
    private readonly tag = FooditemService.name


    constructor(@InjectModel(FoodItem.name) private readonly itemModel: Model<FoodItem>,
                private readonly helper: HelperService,
                private readonly constantconfig : ConstantconfigService,
                private readonly firebasehelper: FirebaseService){}

    getHello(): string {
        return 'Hello from fooditem!';
    }

    categorizeItem(input: string): Category {
        switch (input.toLowerCase()) {
            case Category.STARTERS:
            case Category.MAINCOURSE:
            case Category.SNACKS:
            case Category.DESERTS:
                return input.toLowerCase() as Category;
            default:
                return Category.OTHERS;
        }
    }

    async addFoodItem(additem: AddItemDto) : Promise<object> {
        try{

            this.logger.log(this.tag, `ENTRY: ${JSON.stringify(additem)}`)

            const { itemName, itemPrice, itemDetail, itemCategory, imageuri } = additem;
            if (!itemName || !itemPrice || !itemDetail || !itemCategory || !imageuri) {
                return this.helper.responsemsg(12, this.constantconfig.field_empty, {});
            }            
        
            const existingItem = await this.itemModel.find({ itemName: itemName });
        
            if (existingItem.length > 0) {
                return this.helper.responsemsg(13, this.constantconfig.user_already_exists, {});
            }

            const itemcateg = await this.categorizeItem(itemCategory)
        
            // createsignupdto.password = await this.hashPassword(password);

            const newItem = await this.itemModel.create({
                itemId: this.generateUniqueNumber(), 
                itemName: itemName,
                itemPrice: itemPrice,
                itemDetail: itemDetail,
                itemCategory: itemcateg,
                itemImage: imageuri
            });

            this.logger.log(this.tag, `ITEM: ${newItem}`)
        
            if (newItem) {
                return this.helper.responsemsg(14, this.constantconfig.created, 'thankks for creating');
            } else {
                return this.helper.responsemsg(15, this.constantconfig.unable_to_create, {});
            }

        }catch(e){
            this.logger.error(this.tag,`ERROR: ${e.message}`)
            return this.helper.responsemsg(23, this.constantconfig.catch_error, {})
        }
    }

    async uploadItemImage(file: MulterFile){
        try {
            this.logger.log(this.tag, `ENTRY: ${file.originalname}`)
            const imageUrl = await this.firebasehelper.uploadImage(file);
            this.logger.log(this.tag, `IMAGE-URI: ${imageUrl}`);
            if(imageUrl){
                return this.helper.responsemsg(10, this.constantconfig.success, {uri: imageUrl});
            }else{
                return this.helper.responsemsg(24, this.constantconfig.image_error, 'unable to get uri');
            }
            // console.log(this.imageuri);
        } catch (error) {
            this.logger.error(this.tag, `ERROR uploading image: ${error.message}`);
            return this.helper.responsemsg(23, this.constantconfig.catch_error, {})
        }
    }
    generateUniqueNumber(): string {
        const timestamp = Date.now().toString();
        const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${timestamp}-${randomNumber}`;
    }
}
