import { initializeApp } from 'firebase/app';
import { envs } from '../../../environments/environment';

export const firebaseApp = initializeApp(envs.firebase);
