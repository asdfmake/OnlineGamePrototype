FROM node:18

WORKDIR /app

COPY backend* ./

COPY index.html ../
COPY index.js ../
COPY index.css ../
COPY playOnline.js ../
COPY startMenu.js ../
COPY startMenu.css ../
COPY winLine.css ../
COPY imgs ../imgs

WORKDIR /app

RUN npm install

EXPOSE 80

# Start the backend server
CMD ["node", "app.js"]

# docker build -t online-game .
# docker run -d -p 80:80 online-game