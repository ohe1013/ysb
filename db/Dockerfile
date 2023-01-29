FROM postgres:15.1-alpine3.17

ENV POSTGRES_DB=ysb
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV MYSQL_ROOT_PASSWORD=root

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
