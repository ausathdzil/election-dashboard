#! /usr/bin/env bash

set -e
set -x

# Let the DB start
python app/backend_pre_start.py

# Run migrations if versions exist
if compgen -G "alembic/versions/*.py" > /dev/null; then
  alembic upgrade head
else
  echo "No alembic versions directory or revision files found, skipping migrations"
fi

# Populate geospatial data from SQL files
echo "Populating provinces..."
psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_SERVER}:${POSTGRES_PORT}/${POSTGRES_DB}" -f /app/sql/province.sql

echo "Populating cities and regencies..."
psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_SERVER}:${POSTGRES_PORT}/${POSTGRES_DB}" -f /app/sql/city_regency.sql

# Create the tile-generating function
echo "Creating tile-generating function..."
psql "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_SERVER}:${POSTGRES_PORT}/${POSTGRES_DB}" -f /app/sql/function.sql

# Create initial data in DB
if [ -f "news_data.csv" ]; then
  python app/initial_data.py
else
  echo "news_data.csv not found, skipping seed"
fi

python app/enrich_by_author.py
