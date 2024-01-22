import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  docData,
  addDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  FieldValue,
} from '@angular/fire/firestore';
import { Timestamp, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { ref, Storage } from '@angular/fire/storage';
import { setDoc } from 'firebase/firestore';
import { getDownloadURL, uploadString } from 'firebase/storage';
import { switchMap, map, combineLatestWith } from 'rxjs/operators';
import { User } from './auth.service';
import { take } from 'rxjs/operators';

export interface Party {
  id?: string;
  name: string;
  place: string;
  date: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

@Injectable({
  providedIn: 'root',
})
export class PartiesService {
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage
  ) {}

  getRRPPs() {
    // Get all the rrpp users
    const usersRef = collection(this.firestore, 'users');
    const rrppUsersQuery = query(usersRef, where('role', '==', 'rrpp'));
    return collectionData(rrppUsersQuery, { idField: 'id' }) as Observable<
      User[]
    >;
  }

  getRRPPById(rrppId: string) {
    // Get the rrpp user by id
    const userRef = doc(this.firestore, 'users', rrppId);
    return docData(userRef) as Observable<User>;
  }

  getAllParties(): Observable<Party[]> {
    const partiesRef = collection(this.firestore, 'parties');
    return collectionData(partiesRef, { idField: 'id' }) as Observable<Party[]>;
  }
}
