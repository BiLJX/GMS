import admin from "firebase-admin"
import { initializeApp } from "firebase/app";
import * as serviceAccount from "./serviceAccountKey.json"


const params = {               
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}
const firebaseConfig = {
    apiKey: "AIzaSyCw3IImYYhTOMy2sJ9PZk1AoJuXhr8FXcA",
    authDomain: "gym-management-system-d12cb.firebaseapp.com",
    projectId: "gym-management-system-d12cb",
    storageBucket: "gym-management-system-d12cb.appspot.com",
    messagingSenderId: "508221626056",
    appId: "1:508221626056:web:1d29a2ddcd51ad14d9b7fd"
};
  
// firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(params),
    storageBucket: "gym-management-system-d12cb.appspot.com"
});

const app = initializeApp(firebaseConfig);

export { app };