# FROM node:19 AS compile

# WORKDIR /app

# COPY . .

# RUN yarn 

# RUN yarn tsc

# FROM node:19-alpine AS app

# WORKDIR /app

# COPY --from=compile /app/dist ./dist

# COPY package.json yarn.lock ./

# RUN yarn --production

# COPY bin ./bin

# COPY public ./public

# COPY views ./views

# CMD ["node", "bin/www"]

# EXPOSE 3000

FROM node:16-alpine




WORKDIR /app




COPY . .




COPY package.json yarn.lock ./




RUN yarn




RUN yarn tsc




CMD ["node", "bin/www"]




EXPOSE 3000


