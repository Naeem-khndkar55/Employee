FROM node:21-slim
WORKDIR /app
ADD package.json /app/
ADD package-lock.json /app/
RUN npm install

copy .  .


CMD ["npm","run","dev"  ]
