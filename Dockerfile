FROM python:alpine
WORKDIR /code

EXPOSE 8000
ADD . /code

ENV HOST=api.navitia.io
ENV NAVITIA=http://api.navitia.io/v1/
ENV TYR=http://tyr.navitia.io/v0/
ENV KEY="your_navitia_io_key"
ENV COVERAGE="your_coverage"

RUN /bin/bash -c "envsubst < /code/params.tmpl > /code/params.json"

CMD python -m http.server
