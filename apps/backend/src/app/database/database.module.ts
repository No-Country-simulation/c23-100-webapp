import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';
import * as admin from 'firebase-admin';

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
