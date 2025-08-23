FROM python:3.13-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl bash postgresql-client \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONPATH=/app

COPY . .

RUN find . -type f -name "*.sh" -exec sed -i 's/\r$//' {} +

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]