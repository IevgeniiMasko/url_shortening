FROM node:20.11.0-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . . 
EXPOSE 3000

RUN npm run build
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm start"]