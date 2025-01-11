import * as admin from 'firebase-admin';
import { envs } from './envs';

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: envs.firebase.client_email,
    privateKey: envs.firebase.private_key,
    projectId: envs.firebase.project_id,
  }),
});
