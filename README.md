# apollo-graphql-starter
🚀👨‍🚀 A starter project for GraphQL-backed projects using Apollo Server

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