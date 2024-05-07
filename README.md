## Example app using MongoDB

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Deploy your own

Once you have access to the environment variables you'll need, deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=with-mongodb&repository-name=with-mongodb&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-mongodb&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-mongodb with-mongodb-app
```

```bash
yarn create next-app --example with-mongodb with-mongodb-app
```

```bash
pnpm create next-app --example with-mongodb with-mongodb-app
```

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

#### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=with-mongodb&repository-name=with-mongodb&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-mongodb&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH)

--------------------

## Context

#### Queried database

This app is made for the `sample_mflix` of Atlas MongoDB.

You can easily create the sample from their website and then run this app.

#### Environnement

Make sur you copied `.env.local.example` as `.env.local` or renamed it.

Format of the DB link is :
```bash
MONGODB_URI=mongodb+srv://<'username'>:<'password'>@<'db_name'>.<'id'>.mongodb.net/?retryWrites=true&w=majority
```
Text after `.net/` is optional but seems legit.

#### Tests

You may try it by yourself using Postman or by creating your own script.

I personaly used Postman to test my endpoints.

#### Datas

The datas sent to this API are in Json format. MongoDB with NodeJS natively accepts it and doesn't require for any translation.

All Json informations have to be in the body of the request. It permits to send long strings without any error compare to HEAD arguments.

Learn more about :

 - HTTP Methods : https://developer.mozilla.org/fr/docs/Web/HTTP/Methods

 - HTTP Codes : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP 

#### Web Interface

You may see a simple web interface for this API at http://localhost:3000/.
There's a search bar to find movies by keywords (for title, genres, cast etc...).
You can add a new movie by going through http://localhost/movie/add. Some elements are required and notified with a star. You are not allowed to send data without writing in this text areas. 

http://localhost/comments shows you all commentaries with a search bar to search by user's name.


## Swagger UI

#### Requirements :

Run :
```bash
npm install next-swagger-doc
npm install formdata-node
npm install swagger-ui-react

#or

yum install next-swagger-doc
yum install formdata-node
yum install swagger-ui-react
```

#### Self-hosted API doc link :

Once the packages installed, you can see you're API doc through this URI :
`http://localhost:3000/swagger/`

#### Swagger UI

Complete UI :
![alt text](https://github.com/skrylexx/POC_MongoDB_With_JS/blob/main/images/swagger_vue.png?raw=true)

Documentation exemple :
![alt text](https://github.com/skrylexx/POC_MongoDB_With_JS/blob/main/images/api_call.png?raw=true)

----------------------

## What's next ?

#### Movie section update

Besides reviewing comments for a movie on its page, you will be able to add a new comment by clicking on a button and fill out a form.

A new functionality to like or dislike a movie should appear soon too ! For now, it has no effect, it's only front-end.

When adding a movie, a notification will show you the result.

#### User authentication and cookies

Form to create an account and to log in. Cookies will be used to keep the user logged in and show him his comments.
Cookies will also be used to show to the user his last researches and corresponding movies (by `genres`).

Administrator accounts will be created to supervise the website and keep its community safe.

#### Update or delete a comment

Authenticated users will be able to update their comments or delete them. Administrators will be able to delete comment from anybody if he's not correct.

#### Rating

Soon, the rating feature would be added directly on the movie's page. You will need to be authenticated before rating to not pollute movie's reputation.

Comment rating will be avalaible too.

#### Optimisations

The search and the loading will be optimised to be faster (by loading films only if asked/needed)