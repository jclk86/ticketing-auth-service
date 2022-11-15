FROM node:alpine

WORKDIR /app
# copy over only package.json first and install packages
COPY package.json .
RUN npm install
# then copy everythign over after package.json
COPY . .

CMD ["npm", "start"]