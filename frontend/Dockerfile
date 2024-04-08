# Build stage
FROM node:18.17-alpine AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache python3 make g++ && yarn install
COPY . .
RUN yarn build

# Production stage
FROM node:18.17-alpine

WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["yarn", "start"]