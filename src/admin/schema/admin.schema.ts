import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Role } from "src/shared/types";

@Schema({timestamps: true})
export class Admin extends Document{

    @Prop({ type: String, required: false, unique: true})
    userId?: string;
    
    @Prop({type: String, required: true})
    username: string

    // @Prop({type: Number, required: true})
    // contactNo: number

    // @Prop({type: String, required: true})
    // emailId: string

    @Prop({type: String, required: true})
    password: string

    @Prop({type: String})
    imageUrl: string

    // @Prop({type: String})
    // address: string

    @Prop({type: String, enum: Role, default: Role.ADMIN})
    role: Role


}


export const AdminSchema = SchemaFactory.createForClass(Admin)

