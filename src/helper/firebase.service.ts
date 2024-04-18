import { Injectable } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin'
import { MulterFile } from 'multer';

@Injectable()
export class FirebaseService {
    constructor() {}

    async uploadImage(file: MulterFile): Promise<string> {
        const bucket = FirebaseAdmin.storage().bucket();
        const folderName = 'foodeven-admin'; // Specify the folder name
        const filename = `${folderName}/${Date.now()}-${file.originalname}`; // Append folder name to the filename
        const fileUpload = bucket.file(filename);

        await fileUpload.save(file.buffer, {
            contentType: file.mimetype,
            metadata: {
                metadata: {
                    // You can add custom metadata here if needed
                }
            }
        });

        // Get the download URL for the uploaded file
        const url = await fileUpload.getSignedUrl({
            action: 'read',
            expires: '03-11-2025' // Set expiry date for the URL if needed
        });

        return url[0];
    }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('image'))
    // async uploadImage(@UploadedFile() file: MulterFile) {
    //     const imageUrl = await this.firebasehelper.uploadImage(file)
    //     return { imageUrl };
    // }

}
