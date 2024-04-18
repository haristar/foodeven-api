# Use the official Node.js 20-alpine image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8000
EXPOSE 8000

# Command to run the application
CMD ["npm", "run", "start:prod"]