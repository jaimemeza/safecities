import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const createUserCollection = functions.auth.user().onCreate((user: any) => {
        return admin.database().ref(`users/${user.uid}`).set({ 
                displayName: user.displayName,
                email: user.email,
                admin: false,
                trust: true,})
        .then()
        .catch(err => console.log(err))
})

export const deleteUserCollection = functions.auth.user().onDelete((user: any) => {
        return admin.database().ref(`users/${user.uid}`).remove()
        .then()
        .catch(err => console.log(err))
})