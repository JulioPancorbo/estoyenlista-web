import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, docData, addDoc, doc, query, where, getDocs, getDoc, FieldValue } from '@angular/fire/firestore';
import { Timestamp, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { ref, Storage } from '@angular/fire/storage';
import { setDoc } from 'firebase/firestore';
import { getDownloadURL, uploadString } from 'firebase/storage';
import { switchMap, map, combineLatestWith } from 'rxjs/operators';
import { User } from './auth.service';
import { take } from 'rxjs/operators';

export interface Client {
  id?: string;
  name: string;
  partyId: string;
  guests: number;
  guests_confirmed?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public clientId: string;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage
  ) { }

  async addClient(client: Client): Promise<any> { //add a client
    const user: any = this.auth.currentUser; // Get the current user
    const clientsRef = collection(this.firestore, 'clients');
    const docRef = await addDoc(clientsRef, client);
    const clientDocRef = doc(this.firestore, `clients/${docRef.id}`);
    setDoc(clientDocRef, { id: docRef.id, guests_confirmed: 0, user_id: user.uid, createdAt: Timestamp.now(), updatedAt: Timestamp.now() }, { merge: true });
    this.clientId = docRef.id;

    if (this.clientId) {
      console.log('¡Cliente creado correctamente!');
      return true;
    } else {
      console.log('Error al crear el cliente');
      return false;
    }
  }

  getAllClientsByPartyId(): Observable<Client[]> { //get all clients from a party (for adminrrpp users only)
    const clientsRef = collection(this.firestore, 'clients');
    const partyClientsQuery = query(clientsRef, where('partyId', '==', this.clientId));
    return collectionData(partyClientsQuery, { idField: 'id' }) as Observable<Client[]>;
  }

  getClientsByUserId(userId: string): Observable<Client[]> { //get all clients by user (for rrpp users)
    const clientsRef = collection(this.firestore, 'clients');
    const userClientsQuery = query(clientsRef, where('user_id', '==', userId));
    return collectionData(userClientsQuery, { idField: 'id' }) as Observable<Client[]>;
  }

  getClientsByUserIdAndPartyId(userId: string, partyId: string): Observable<Client[]> { //get all clients by user and party (for both rrpp users)
    const clientsRef = collection(this.firestore, 'clients');
    const userClientsQuery = query(clientsRef, where('user_id', '==', userId), where('partyId', '==', partyId));
    return collectionData(userClientsQuery, { idField: 'id' }) as Observable<Client[]>;
  }
}
