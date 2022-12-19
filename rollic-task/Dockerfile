#Use long term supported alphine version
FROM node:lts-alpine

#Create app directory
WORKDIR /home/kerem/rollic-task  

#Copy app dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

#Install npm dependencies
RUN npm install --production --silent && mv node_modules ../

#Bundle app source
COPY . .

#Prefered port for expose
EXPOSE 8080

#Authorie files
RUN chown -R node /home/kerem/rollic-task  

#Run app with npm
CMD ["npm", "start"]