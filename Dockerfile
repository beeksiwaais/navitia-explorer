FROM python:alpine
WORKDIR /code

EXPOSE 8000
ADD . ./code

ENV HOST=api.navitia.io
    NAVITIA=http://api.navitia.io/v1/
    TYR=http://tyr.navitia.io/v0/
    KEY="your_navitia_io_key"
    COVERAGE="your_coverage"

RUN sed -e "s/HOST/{{HOST}}/g" -e "s/NAVITIA/{{NAVITIA}}/" -e "s/TYR/{{TYR}}/" -e "s/KEY/{{KEY}}/" -e "s/COVERAGE/{{COVERAGE}}/" /code/params.tmpl > /code/params.json

CMD python -m http.server
