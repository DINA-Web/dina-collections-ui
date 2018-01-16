FROM nginx

# Add produciton build of Collection manager to public folder.
ADD ./build/ /usr/share/nginx/html
ADD ./build-storybook/ /usr/share/nginx/storybook

COPY ./nginx.conf /etc/nginx/conf.d/default.template
