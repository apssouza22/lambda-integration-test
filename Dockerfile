FROM python:3.9


RUN pip install --upgrade pip
RUN pip install awscli

RUN pip install aws-sam-cli

WORKDIR /var/task

COPY ./cdk.out/CdkTsStack.template.json template.yml

VOLUME /var/run/docker.sock

EXPOSE 3001

ENTRYPOINT ["/bin/sh"]