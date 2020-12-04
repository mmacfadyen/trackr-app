import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { dbUserObj } from "./user-obj";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  userData: any;

  constructor(public afStore: AngularFirestore) {}

  getUser(userId: string) {
    return this.afStore
      .collection("users")
      .doc(userId)
      .ref.get()
      .then((doc) => {
        if (doc.exists) {
          console.log("retrieved user: " + doc.id);
          return doc.data();
        } else {
          console.log("Could not retrieve user: " + userId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createUser(user: dbUserObj) {
    return this.afStore.collection("users").doc(user.uid).set(user);
  }

  updateUser(user: dbUserObj) {
    return this.afStore.collection("users").doc(user.uid).update(user);
  }

  deleteUser(userId: string) {
    return this.afStore.collection("users").doc(userId).delete();
  }
}