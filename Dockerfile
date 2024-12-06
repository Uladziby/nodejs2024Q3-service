FROM node:22 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

ENV NODE_ENV production

RUN npm install --only=production && npm cache clean --force

FROM node:22-alpine

WORKDIR /app

COPY --from=development /app/dist ./dist
COPY --from=development /app/node_modules ./node_modules

EXPOSE $PORT

CMD ["npm", "run", "start:dev:migrate"]