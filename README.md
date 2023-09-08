# Vue3 + Vuetify + Firebase Starter

> Still work in progress

* Vue3
* Pinia (state management)
* Vue Router
* Vuetify
* Firebase v9
* Moment

#### Firebase features

* Firestore basic CRUD data table and functions (user restricted to own space)
* Firebase Storage image upload, read and delete functions (user restricted to own space)
* Firebase Functions template
* Firebase auth component to handle password login and reset

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).


### Firebase setup

* Install Google CLI - https://cloud.google.com/storage/docs/gsutil_install

```
npm install -g firebase-tools
firebase init
cp functions/env.example functions/.env
```

Change `src/plugins/firebase.js`

#### Firestore Rules

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      match /{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
  }
}
```

#### Storage Rules

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      match /{allPaths=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
  }
}
```

#### Update CORS for bucket

Use Cloud Shell to run
```
gsutil cors get gs://example.appspot.com

gsutil cors set cors.json gs://example.appspot.com
```