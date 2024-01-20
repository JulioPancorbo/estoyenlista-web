import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { setDoc } from 'firebase/firestore';
import { doc, docData, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ref, Storage } from '@angular/fire/storage';
import { Observable, firstValueFrom } from 'rxjs';

export interface User {
  uid?: string;
  id?: string;
  email?: string;
  password?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) { }

  async register(email: string, password: string, name: string) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      if (user?.user) {
        await this.createProfile(user.user, email, password, name);
      }
      return user;
    } catch (error) {
      console.log('AuthService -> register -> error', error);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      console.log('AuthService -> login -> error', error);
      return null;
    }
  }

  logout() {
    this.auth.signOut();
  }

  async createProfile(user: any, email: string, password: string, name: string) {
    const userDocRef = doc(this.firestore, `users/${user.uid}`); // Create a reference to the user document
    await setDoc(userDocRef, { email: email, password: password, name: name, role: 'rrpp' }); // Set the document
    //* The role is set as 'user' by default. To add a 'creator', this should be developed in other function or something.
  }

  async getCurrentUser() { // Get the current user
    const user: any | null = this.auth.currentUser;
    if (user) {
      return user || null;
    } else {
      return null;
    }
  }

  getUserProfile() { // Get the user profile with its document data
    const user: any = this.auth.currentUser; // Get the current user
    console.log('user', user);
    
    if (user) {
      const userDocRef = doc(this.firestore, `users/${user.uid}`); // Get the reference to the user document
      return docData(userDocRef, { idField: 'id' }) as Observable<User>; // Get the user document data as an observable with the id field
    } else {
      return null;
    }
  }

}
