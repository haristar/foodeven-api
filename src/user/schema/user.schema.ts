import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Role } from "src/shared/types";

@Schema({timestamps: true})
export class User extends Document{

    @Prop({ type: String, required: false, unique: true})
    userId?: string;
    
    @Prop({type: String, required: true})
    name: string

    // @Prop({type: Number, required: true})
    // contactNo: number

    @Prop({type: String, required: true})
    emailId: string

    @Prop({type: String, required: true})
    password: string

    @Prop({type: String})
    imageUrl: string

    // @Prop({type: String})
    // address: string

    @Prop({type: String, enum: Role, default: Role.CUSTOMER})
    role: Role


}


export const UserSchema = SchemaFactory.createForClass(User)

