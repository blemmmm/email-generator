# node lts
FROM node:18

# client dependencies
WORKDIR /client/
COPY ["./client/package.json", "./client/package-lock.json", "./"]
RUN npm install -g typescript
RUN npm install -g vite
RUN npm ci

# server dependencies
WORKDIR /server/
COPY ["./server/package.json", "./server/package-lock.json", "./"]
RUN npm ci --omit=dev

# client files
WORKDIR /client/
COPY ["./client/", "./"]

# server files
WORKDIR /server/
COPY ["./server/", "./"]

# client test
# WORKDIR /client/
# RUN tsc

# server test
# WORKDIR /server/
# RUN tsc

# client build
WORKDIR /client/
RUN vite build

# server build
WORKDIR /server/
CMD ["npx", "--yes", "tsx", "./src/app.ts"]