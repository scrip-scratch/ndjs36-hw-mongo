FROM node:20.10-alpine

WORKDIR /app

ARG NODE_ENV=production
COPY ./ ./
RUN npm install

CMD ["npm", "run", "server"]