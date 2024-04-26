# ArgolightSpace 🚀

This repository is a technical test destinated to [Argolight](https://argolight.com/) and was made by [Dylan Tavares](https://github.com/TavaresDylan) ( [dylantavares.fr](https://dylantavares.fr) ) with passion.

This WebApp use [Nx Monorepo Workspace](https://nx.dev/),[Typescript](https://www.typescriptlang.org/), [ExpressJs](https://expressjs.com/fr/), [VueJs](https://vuejs.org/) in v3 with composition API, [Prisma ORM](https://www.prisma.io/) and [ElectronJs](https://www.electronjs.org/fr/)

## Get started

Requirements :

- Node >= v 18.0.0
- Mysql >= 8.0.0

ℹ️ I recommend to use Nx extension :

- [Nx console VsCode extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
- [Nx console JetBrains IDE extension](https://plugins.jetbrains.com/plugin/21060-nx-console)

(Instead of using `npx` command you can install Nx globally `npm add --global nx@latest` if you want)

### Installation

1. **Clone the repository**

   - `git clone git@github.com:TavaresDylan/ArgoSpace.git`

2. **Install the dependencies**

   - `npm install`

3. **Copy the .env.sample file as .env at the project root**

   - `cp .env.sample .env`

4. **Setup your database**

   - You can use a local MySQL database
   - Or a [Docker](https://www.docker.com/) container that use [MySQL image](https://hub.docker.com/_/mysql)

5. **Provide env variables values of the .env file**

   - **DATABASE_URL** have the following format `DATABASE_URL=mysql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE_NAME>`
   - All other vars related to Firebase are private : [contact-me](mailto:tavares.dylan03@gmail.com) and i'll send it to you if it's not already done.

6. **Generate the prisma client**

   (This will generate the prisma client by setting up the connexion to the database).

   - `npx nx run prisma:generate-types`
   - Or use directly the Nx console extension by running the "generate-types" command.

7. **Migrate the database**

   (This will generate the tables and seed it)

   - `npx nx run prisma:migrate`
   - Or use directly the Nx console extension by running the "migrate" command

8. **Run the backend app**

   (The backend app will run on [localhost:3000](http://localhost:3000) by default)

   - `npx nx run backend:serve`
   - Or use directly the Nx console extension by running the "serve" command of the backend project.

9. **Run the frontend app**

   (The frontend app will run on [localhost:4200](http://localhost:4200) by default)

   - `npx nx run frontend:serve`
   - Or use directly the Nx console extension by running the "serve" command of the frontend project

10. **Run the electron app**

    - `npx nx run electron-app:serve`
    - Or use directly the Nx console extension by running the "serve" command of the electron-app project

11. **Enjoy**
    - You can create a new account by providing your real email or by using a fake mail like [maildrop mail](https://maildrop.cc) with a password and you will directly being connected when the registration will complete.
    - Or you can use the following test credentials :
      email : `test@test.fr`
      password : `testargo`
