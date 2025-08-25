FROM python:3.13.7-alpine

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN apk add --no-cache curl bash postgresql-client

ENV PYTHONPATH=/app

COPY . .

RUN find . -type f -name "*.sh" -exec sed -i 's/\r$//' {} +

EXPOSE 8000

CMD ["fastapi", "run", "app/main.py", "--host", "0.0.0.0", "--port", "8000"]