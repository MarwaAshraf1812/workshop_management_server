# Use official Node.js image as a base
FROM node:18

# Set the working directory inside the container
WORKDIR /server

# Copy the package.json and package-lock.json
COPY ./package*.json /server/

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . /server/

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
