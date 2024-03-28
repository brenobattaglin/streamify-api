FROM node:20.12.0-slim

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]
