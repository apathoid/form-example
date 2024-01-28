# Node image
FROM node:20.10.0-alpine as base_image


# Build container
FROM base_image as build

# The build directory
WORKDIR /build

# Prefix of the service directory inside build context
ARG DIR_PREFIX=./

# Copy all build related files
COPY $DIR_PREFIX/package*.json $DIR_PREFIX/tsconfig.json tsconfig.base.json ./
COPY $DIR_PREFIX/src ./src

# Install deps and build the project
RUN npm install \
    && npm run build


# App container
FROM base_image

# The main application directory
WORKDIR /app

# Node env
ARG NODE_ENV=production
# App port
ARG API_PORT

# Expose vars to the app environment
ENV NODE_ENV $NODE_ENV

# Copy app files from build container
COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json ./package.json

# Remove dev dependencies
RUN npm prune --production --no-package-lock

# Expose application port
EXPOSE $API_PORT

# Start the app
CMD [ "node", "./dist/app.js" ]
