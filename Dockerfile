FROM node:18

WORKDIR /app
RUN npm install -g serve
COPY . /app

RUN npm install
RUN npm run build

CMD ["npx", "serve", "-s", "dist"]