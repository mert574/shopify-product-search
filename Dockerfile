FROM node:12-alpine AS build
WORKDIR /usr/src/shopify-search

COPY . .
RUN yarn install --pure-lockfile
RUN yarn test
RUN yarn build

ENV CI=true
RUN cd dashboard && yarn install && yarn test && yarn build

# -- production container -- #
FROM node:12-alpine
WORKDIR /usr/src/shopify-search

COPY package.json yarn.lock ./
COPY --from=build /usr/src/shopify-search/dist .
COPY --from=build /usr/src/shopify-search/public ./public

RUN yarn install --pure-lockfile --production

ENTRYPOINT [ "node" ]
CMD [ "index.js" ]
EXPOSE 8080
