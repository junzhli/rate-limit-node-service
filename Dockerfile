FROM node:12-alpine

WORKDIR /app

COPY . .

RUN apk update && \
    yarn install --forzen-lockfile && \
    addgroup -S user && \
    adduser -S -G user user && \
    chown -R user:user ./

USER user

ENTRYPOINT [ "yarn", "run", "prod" ]
