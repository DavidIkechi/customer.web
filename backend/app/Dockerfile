# pull the official base image
FROM python:3.8

# set work directory
WORKDIR /backend/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 5000
ENV API_KEY 084d4e25-e82c-4444-a1c2-b80ad42fe8f6
ENV MODEL_KEY b2003c48-07a1-4d67-a992-8871b172584e

# copy requirements.txt so it can be cached if changes are made to sourcefile but requirements dont change.
COPY requirements.txt ./


# install dependencies
RUN pip install --upgrade pip 
RUN pip install -r requirements.txt

#Copy Projects
COPY . .

EXPOSE 5000

