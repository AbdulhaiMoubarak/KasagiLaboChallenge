FROM node:14
WORKDIR /usr/src/app
COPY challenge_b.js ./
COPY data ./data
ENV INPUT_FILE=data/data.txt
ENV OUTPUT_FILE=data/output.txt
CMD ["node", "challenge_b.js"]