FROM node:22.11.0-slim

ENV NODE_ENV=production

WORKDIR /app

RUN useradd --user-group --create-home --shell /bin/false node
USER node

COPY --chown=node:node . .

RUN npm ci --only=production && npm cache clean --force

EXPOSE 3000

CMD ["node", "index.js"]