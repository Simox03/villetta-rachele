# Villetta Rachele - One Page (React + Firebase + Cloudinary)

Questo progetto è una versione pronta per il deploy del sito **Villetta Rachele** (one-page) con area admin per gestione immagini, testi, colori e calendario manuale.

## Cosa contiene
- Frontend React (Vite)
- Admin (login con Firebase Auth)
- Salvataggio contenuti: Firestore (testi, settings, bookings)
- Upload immagini: Cloudinary (unsigned upload preset)
- Istruzioni per deploy su Netlify

## Passaggi rapidi (riassunto)
1. Crea il progetto Firebase (lo hai già fatto).
2. Abilita Authentication (Email/Password) e Firestore.
3. In Firebase Console -> Authentication -> Users -> Add user: crea l'utente admin
   - Email: admin@villettarachele.it
   - Password: una password temporanea (es. ChangeMe123!)
4. Crea su Cloudinary un **Upload preset** (unsigned) e prendi il nome del preset.
5. Rinomina `.env.example` in `.env.local` e inserisci:
   - VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID
   - VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET
6. Esegui `npm install` e `npm run build` in locale (opzionale) oppure carica il repo su GitHub e collegalo a Netlify.
7. Su Netlify imposta build command `npm run build` e pubblica la cartella `dist`.

---

## Note importanti
- Le immagini vengono caricate su Cloudinary usando un upload preset **unsigned** (non serve la API secret client-side).
- Per sicurezza, non includere API secret nei file pubblici.
- Firestore regole di esempio sono incluse nel file `firebase-rules.txt`.

