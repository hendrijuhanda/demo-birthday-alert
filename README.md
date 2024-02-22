## NestJS

This app is built with NestJS. Look at the [NestJS documentation](https://docs.nestjs.com/) to learn more.

## Prerequisite

- Node 18
- MySQL 5.7

## Usage

First, copy `.env.example` to `.env`. Specify the content to suit your environments.

```
DB_HOST=database
DB_PORT=3306
DB_DATABASE=database
DB_USERNAME=mysql
DB_PASSWORD=mysql
```

Then run these commands.

```
npm install
npm run build
npm run schema:sync

// Development
npm run start:dev

// Production
npm run start:prod
```

The app should be running on `http://localhost:3000`.

Refer to the API at [demo-birthday-alert.openapi.json](https://github.com/hendrijuhanda/demo-birthday-alert/blob/main/demo-birthday-alert.openapi.json).
