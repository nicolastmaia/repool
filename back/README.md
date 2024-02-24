# Necessary files

credentials.json: Google Cloud Storage credentials. It can be generated [here](https://cloud.google.com/storage/docs/getting-service-account?hl=pt).

.env: environment variables file. Must have the following format:

```
DATABASE_URL="postgresql://postgres:postgres@dominio:port/database?schema=public"

TOKEN_JWT="INSERT-YOUR-JWT-SECRET-HERE"

ADMIN_PASSWORD="INSERT-ADMIN-PASSWORD"

GCS_BUCKET="google-cloud-storage-bucket-name"

GCLOUD_PROJECT="project-id-from-google-cloud-application"

GCS_KEYFILE=./credentials.json

```

## 🚀 Getting Started

To run the backend application, you'll need a PostgreSQL instance.
If you have Docker installed on your machine, you can use the docker-compose.yml file in the root of the project to quickstart an instance of PostgreSQL.

Run the following command and a PostgreSQL container will be started:

```
docker-compose up
```

After installing NodeJS, run the following command to download all of the project's dependencies:

```
npm install
```

Run the following command to start the server:

```
npm run start
```

To add the schema to the database, you must run the migration. For this, run:

```
npx prisma migrate dev --name init
```

This will generate the migration named **init**.
To enter random test data into the migration, use the command:

```
npx prisma db seed --preview-feature
```

## Test API's

API tests can be conducted through the client folder at the root of the project. The user.http file refers to actions that can be executed by any user, subscriber.http refers to actions that can be performed by any user subscribed to the platform and logged in, owner.http contains actions that can be executed by property-owner users, and admin.http contains actions for the system administrator.

## Server tasks

### Users endpoints

✔ get all users

✔ create user

✔ create user return token

✔ email exists

✔ login

✔ get add

✔ get ad by string

✔ get ad filtred

✔ get ad filtred by maximum price and minimum price

✔ pagination on get ad

✔ upload image on create user

### Subscriber endpoints

✔ get user infos

✔ get full user infos (without password)

✔ edit user infos

✔ delete user & delete profile

✔ get favorits by user

✔ insert favorit on user

✔ remove favorit

✔ create interest

✔ get rent from user

✔ get rent from property

✔ get evaluate from property

✔ create property

✔ confirm interest

✔ remove interest

✔ remove rent

✔ create evaluate

✔ create rent by double confirmation

✔ upload image on create property

### Owner endpoints

✔ get interesteds

✔ create property

✔ create ad

✔ get property

✔ get all properties

✔ update property

✔ delete property

✔ delete ad

✔ confirm vacancy

✔ remove rent

✔ remove vacancy

✔ get users with activ vacancy

✔ get user with partial rent

✔ upload image on create property

✔ create report

### Admin endpoints

✔ create report
