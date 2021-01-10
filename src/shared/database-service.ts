import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { dbBehaviorObj, dbInstanceObj } from './behavior-obj';
import { dbUserObj } from "./user-obj";
import { map } from "rxjs/operators";
import { AuthenticationService } from "./authentication-service";
import { AngularFireAuth } from "@angular/fire/auth";

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

  getLiveBehaviors(userId: string) {
    return this.afStore
    .collection("users").doc(userId)
      .collection("behaviors", (ref) => ref.orderBy("uid", "desc"))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...(c.payload.doc.data() as dbBehaviorObj),
          }))
        )
      );
  }

  createBehavior(userId: string, behavior: dbBehaviorObj) {
    return this.afStore.collection("users").doc(userId)
      .collection("behaviors").doc(behavior.uid).set(behavior);
  }

  deleteBehavior(userId: string, behaviorId: string) {
    return this.afStore.collection("users").doc(userId)
      .collection("behaviors").doc(behaviorId).delete();
  }

  async getAllInstances(userId: string, behaviorId: string) {
    return (await this.afStore
      .collection("users").doc(userId)
      .collection("behaviors").doc(behaviorId)
      .collection("instances")
      .ref.get())
      .docs.map(doc => doc.data());
  }

  //Returns instances made after given date
  async getInstancesInSpan(userId: string, behaviorId: string, timespan: Number) {
    return (await this.afStore
      .collection("users").doc(userId)
      .collection("behaviors").doc(behaviorId)
      .collection("instances")
      .ref.where("time", ">=", timespan)
      .get())
      .docs.map(doc => doc.data());
  }

  getLiveInstances(userId: string, behaviorId: string) {
    return this.afStore
    .collection("users").doc(userId)
      .collection("behaviors").doc(behaviorId)
      .collection("instances", (ref) => ref.orderBy("time", "desc"))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...(c.payload.doc.data() as dbInstanceObj),
          }))
        )
      );
  }

  createInstance(userId: string, behaviorId: string, instance: dbInstanceObj) {
    return this.afStore.collection("users").doc(userId)
      .collection("behaviors").doc(behaviorId)
      .collection("instances").doc(instance.uid).set(instance);
  }
}