import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class FirestoreService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firestore: Firestore
  ) {}

  async getCollection<T>(collectionName: string): Promise<T[]> {
    const snapshot = await this.firestore.collection(collectionName).get();

    if (snapshot.empty) {
      throw new NotFoundException(
        `No documents found in collection: ${collectionName}`
      );
    }

    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async getDocument<T>(collectionName: string, documentId: string): Promise<T> {
    const doc = await this.firestore
      .collection(collectionName)
      .doc(documentId)
      .get();

    if (!doc.exists) {
      this.throwDocumentNotFoundError(collectionName, documentId);
    }

    return doc.data() as T;
  }

  async createDocument<T>(
    collectionName: string,
    data: T,
    id?: string
  ): Promise<T> {
    const docRef = id
      ? this.firestore.collection(collectionName).doc(id)
      : this.firestore.collection(collectionName).doc(); // Genera un ID si no se proporciona

    await docRef.set(data);

    const doc = await docRef.get();
    return doc.data() as T;
  }

  async updateDocument<T>(
    collectionName: string,
    documentId: string,
    data: Partial<T>
  ): Promise<T> {
    const document = this.firestore.collection(collectionName).doc(documentId);
    const docRef = await document.get();

    if (!docRef.exists) {
      this.throwDocumentNotFoundError(collectionName, documentId);
    }

    await document.set(data, { merge: true });
    const updatedDoc = await document.get();

    return updatedDoc.data() as T;
  }

  async deleteDocument<T>(
    collectionName: string,
    documentId: string
  ): Promise<T> {
    const document = this.firestore.collection(collectionName).doc(documentId);
    const docRef = await document.get();

    if (!docRef.exists) {
      this.throwDocumentNotFoundError(collectionName, documentId);
    }

    await document.delete();
    return docRef.data() as T;
  }

  private throwDocumentNotFoundError(
    collectionName: string,
    documentId: string
  ) {
    throw new NotFoundException(
      `Document with ID ${documentId} not found in ${collectionName}`
    );
  }
}
