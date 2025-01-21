FROM node:alpine

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE ${VITE_DEV_PORT}
CMD ["sh", "-c", "if [ \"$ENV\" = 'production' ]; then exit 1; else pnpm dev --host; fi"]
