FROM node:10-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./
# Install dependencies
RUN npm install
# Bundle app source code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]