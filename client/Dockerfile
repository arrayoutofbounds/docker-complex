# First section for build

FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build

# Second section is to serve build assets using nginx
FROM nginx
# just tells the developer that this container needs to be port 
# mapped to port 80. However, beanstalk looks at it and knows that 
# it has to map all requests to this port automatically.
EXPOSE 3000

# overwrite default conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# copy from builder phase into folder where nginx serves items.
COPY --from=builder /app/build /usr/share/nginx/html

# No need to start nginx, it starts it automatically due to the nginx image