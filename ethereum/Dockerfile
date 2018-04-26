FROM node:9

WORKDIR /app

RUN npm install -g truffle

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app

ENTRYPOINT ["truffle"]
CMD ["console"]
