FROM node:20 AS transpiler
WORKDIR /usr/local/app
copy . .

RUN npm ci && npx tsc

FROM node:20 AS installer

WORKDIR /usr/local/app
copy package-lock.json .
copy package.json .
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /usr/local/app
COPY --from=transpiler /usr/local/app/build/ .
COPY --from=installer /usr/local/app/node_modules/ .

CMD ["/usr/local/app/index.mjs"]
