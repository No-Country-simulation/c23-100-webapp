import { Global, Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';
import admin from 'firebase-admin';

@Global()
@Module({
  providers: [
    FirestoreService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return admin.firestore();
      },
    },
  ],
  exports: ['FIREBASE_ADMIN', FirestoreService],
})
export class DatabaseModule {}
