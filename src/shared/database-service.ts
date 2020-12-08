import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { dbBehaviorObj, dbInstanceObj } from './behavior-obj';
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
          console.log("retrieved user: " + doc.data());
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

  getBehavior(userId: string, behaviorId: string) {
    return this.afStore
      .collection("users")
      .doc(userId)
      .collection("behaviors")
      .doc(behaviorId)
      .ref.get()
      .then((doc) => {
        if (doc.exists) {
          console.log("retrieved behavior: " + doc.data());
          return doc.data();
        } else {
          console.log("Could not retrieve behavior: " + userId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getBehaviors(userId: string) {
    let behaviors = [];
    this.afStore
      .collection("users")
      .doc(userId)
      .collection("behaviors")
      .ref.get()
      .then((behaviorCollection) => {
        behaviorCollection.forEach((behavior) => {
          behaviors.push(behavior.data());
        });
      });
    return behaviors;
  }

  createBehavior(userId: string, behavior: dbBehaviorObj) {
    return this.afStore.collection("users").doc(userId)
      .collection("behaviors").doc(behavior.uid).set(behavior);
  }

  getInstances(userId: string, behaviorId: string) {
    let instances = [];
    this.afStore
      .collection("users").doc(userId)
      .collection("behaviors").doc(behaviorId)
      .collection("instances")
      .ref.get()
      .then((instanceCollection) => {
        instanceCollection.forEach((instance) => {
          instances.push(instance.data());
        })
      })
  }

  createInstance(userId: string, behaviorId: string, instance: dbInstanceObj) {
    return this.afStore.collection("users").doc(userId)
      .collection("behaviors").doc(behaviorId)
      .collection("instances").doc(instance.uid).set(instance);
  }
}