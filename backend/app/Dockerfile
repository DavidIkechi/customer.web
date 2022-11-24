# pull the official base image
FROM python:3.9

# set work directory
WORKDIR /backend/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 5000
ENV API_KEY f99bb50c-7593-400d-a3a9-24af5672b8bd
ENV MODEL_KEY 1753db23-31b7-4461-9d27-61c8c3966a9e
ENV EMAIL advendift@gmail.com
ENV PASS quavuqerlwklsrte
ENV JWT_ACCESS_SECRET_KEY d9048e81-9260-43e2-96a5-25ce027c4ab4
ENV JWT_REFRESH_SECRET_KEY 60db8627-dd6e-4eab-856d-b5fc0422ac19
ENV SECRET e0ff4fb0-f16f-446f-899d-93f7dbe0cead

# copy requirements.txt so it can be cached if changes are made to sourcefile but requirements dont change.
COPY requirements.txt ./


# install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

#Copy Projects
COPY . .

EXPOSE 5000

