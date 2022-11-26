FROM node:16

COPY package*.json ./

RUN npm clean-install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .


ENV NODE_OPTIONS="--max-old-space-size=16000"
EXPOSE 80
CMD ["npm", "run", "prod"]
