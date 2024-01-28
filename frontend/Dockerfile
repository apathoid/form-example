# Node image
FROM node:20.10.0-alpine as base_image


# Build container
FROM base_image as build

# The build directory
WORKDIR /build

# Prefix of the service directory inside build context
ARG DIR_PREFIX=./
# Path to a dotenv config file
ARG DOTENV_CONFIG_PATH

# Copy all build related files
COPY $DIR_PREFIX/package*.json $DIR_PREFIX/webpack.config.js $DIR_PREFIX/tsconfig.json tsconfig.base.json .env ./
COPY $DIR_PREFIX/src ./src
COPY $DIR_PREFIX/public ./public

# Install deps and build the project
RUN npm install \
    && npm run build


# App container
FROM base_image as app

# The main application directory
WORKDIR /app

# Node env
ARG NODE_ENV=production

# Expose vars to the app environment
ENV NODE_ENV $NODE_ENV

# Copy app files from build container
COPY --from=build /build/dist ./dist
COPY --from=build /build/package.json ./package.json


# Static server container
FROM nginx:1.25.3-alpine

# Prefix of the service directory inside build context
ARG DIR_PREFIX=./
# Server hostname
ARG API_HOST
# Server port
ARG API_PORT
# App hostname
ARG CLIENT_HOST
# App port
ARG CLIENT_PORT
# Hostname of an url the API traffic should be redirected to
ARG PROXY_API_HOST

# Copy app files to container
COPY $DIR_PREFIX/.nginx/nginx.conf /etc/nginx/conf.d/default.conf.bak
COPY --from=app /app/dist /usr/share/nginx/html

# Substitute env vars in nginx config
RUN cd /etc/nginx/conf.d \
    && cat default.conf.bak | envsubst '${API_PORT} ${CLIENT_PORT} ${PROXY_API_HOST}' | tee default.conf
    
# Expose the application port
EXPOSE $CLIENT_PORT

# Start the app
CMD ["nginx", "-g", "daemon off;"]