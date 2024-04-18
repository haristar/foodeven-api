import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as firebaseAdmin from 'firebase-admin';

dotenv.config()

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  //firebase initialize using credentials
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      project_id: process.env.FIREBASE_PROJECT_ID,
    } as Partial<firebaseAdmin.ServiceAccount>),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });

  //allowing request from any origin
  app.enableCors({
    origin: '*',
    credentials: true
  })

  await app.listen(process.env.PORT);
}

export { firebaseAdmin };

bootstrap();
