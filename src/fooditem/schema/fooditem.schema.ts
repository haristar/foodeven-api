import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Category, Role } from "src/shared/types";

@Schema({timestamps: true})
export class FoodItem extends Document{

    @Prop({ type: String, required: false, unique: true})
    itemId?: string;
    
    @Prop({type: String, required: true})
    itemName: string

    @Prop({type: Number, required: true})
    itemPrice: number

    // @Prop({type: String, required: true})
    // emailId: string

    // @Prop({type: String, required: true})
    // password: string

    @Prop({type: String, required: true})
    itemDetail: string

    @Prop({type: String, required: true})
    itemImage: string

    // @Prop({type: String})
    // address: string

    @Prop({type: String, enum: Category, required: true, default: Category.STARTERS})
    itemCategory: Category


}


export const FoodItemSchema = SchemaFactory.createForClass(FoodItem)

