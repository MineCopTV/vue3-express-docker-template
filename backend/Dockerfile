FROM node:alpine

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE ${NODE_PORT}
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'prod' ]; then pnpm start; else pnpm dev; fi"]
