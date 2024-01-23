import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { setDoc } from 'firebase/firestore';
import {
  doc,
  docData,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { ref, Storage } from '@angular/fire/storage';
import { Observable, firstValueFrom } from 'rxjs';
import { NavController } from '@ionic/angular';

export interface User {
  uid?: string;
  id?: string;
  email?: string;
  password?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore, private navCtrl: NavController) {}

  async register(email: string, password: string, name: string) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
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
      if (user?.user) {
        //guardar en local storage
        localStorage.setItem('user', JSON.stringify(user.user.uid));
      }
      return user;
    } catch (error) {
      console.log('AuthService -> login -> error', error);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.auth.signOut();
    this.navCtrl.navigateRoot('/login');
  }

  async createProfile(
    user: any,
    email: string,
    password: string,
    name: string
  ) {
    const userDocRef = doc(this.firestore, `users/${user.uid}`); // Create a reference to the user document
    await setDoc(userDocRef, {
      email: email,
      password: password,
      name: name,
      role: 'rrpp',
    }); // Set the document
    //* The role is set as 'rrpp' by default. To add an 'adminrrpp', add it from Firebase console.
  }

  async getCurrentUser() {
    // Get the current user
    const user = this.auth.currentUser;
    return user;
  }

  getUserProfile() {
    const user2 = this.auth.currentUser; // Get the current user
    const userDocRef = doc(this.firestore, `users/${user2.uid}`); // Get the reference to the user document
    return docData(userDocRef, { idField: 'id' }) as Observable<User>; // Get the user document data as an observable with the id field
  }

  getUserProfileById(userId: any) {
    // Get the user profile with its document data
    const userDocRef = doc(this.firestore, `users/${userId}`); // Get the reference to the user document
    return docData(userDocRef, { idField: 'id' }) as Observable<User>; // Get the user document data as an observable with the id field
  }

  isLoggedIn(): boolean {
    // Devuelve el estado de autenticación del usuario
    localStorage.getItem('user');
    return localStorage.getItem('user') !== null;
  }
}
