FROM node:14.18
RUN npm install express
WORKDIR /var/www
COPY server.ts server.ts
COPY dist dist
EXPOSE $PORT
CMD node server.js