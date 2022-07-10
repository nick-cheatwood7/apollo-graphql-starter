# apollo-graphql-starter

🚀👨‍🚀 A starter project for GraphQL-backed projects using Apollo Server

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/nick-cheatwood7/apollo-graphql-starter)

**Push (upload) app image**

```shell
$ docker push {{username}}/{{app_name}}:{{tagname}}
```

## Docker Compose

**Build image**

```shell
$ docker-compose up -d
```

If you encounter any errors, make sure Docker is running on your device.

**Check running images**

```shell
$ docker container ls
```

**Connect to PostgreSQL Database**

```shell
$ psql -h {{HOST}} -U {{USER}} -p {{PORT}} -d {{DATABASE}}
```

**Shut down Docker instance**

```shell
$ docker-compose down
```

## Prisma

**Generate new Migration**

```shell
$ yarn migrate
```

or

```shell
$ npx prisma migrate dev
```

**Deploy migration**

```shell
$ npx prisma migrate deploy
```

## Testing

See Nexus + Prisma testing guide here: https://nexusjs.org/docs/getting-started/tutorial/chapter-testing-with-prisma
