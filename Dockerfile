FROM nginx

EXPOSE 80
COPY . /usr/share/nginx/html

ENV HOST=api.navitia.io
ENV NAVITIA=http://api.navitia.io/v1/
ENV TYR=http://tyr.navitia.io/v0/
ENV KEY="your_navitia_io_key"
ENV COVERAGE="your_coverage"

CMD /bin/bash -c "envsubst < /usr/share/nginx/html/params.tmpl > /usr/share/nginx/html/params.json && nginx -g 'daemon off;'"
