# Utilisez une image Node.js comme base
FROM node:v18.18.0

# Définissez le répertoire de travail
WORKDIR /usr/share/react

# Copiez les fichiers de package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances Node.js
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port sur lequel l'application va s'exécuter
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]