import logging
import random

from app.core.db import engine
from app.models.schema import News
from sqlmodel import Session, select

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

AUTHOR_LOCATION_MAP = {
    "detikJatim": {
        "province": "Jawa Timur",
        "cities": [
            {"name": "Kota Surabaya", "lat": -7.2575, "lon": 112.7521},
            {"name": "Kota Malang", "lat": -7.9839, "lon": 112.6214},
            {"name": "Kabupaten Sidoarjo", "lat": -7.4478, "lon": 112.7183},
            {"name": "Kabupaten Jember", "lat": -8.1845, "lon": 113.6681},
        ],
    },
    "detikJateng": {
        "province": "Jawa Tengah",
        "cities": [
            {"name": "Kota Semarang", "lat": -6.9932, "lon": 110.4203},
            {"name": "Kota Surakarta", "lat": -7.5755, "lon": 110.8243},
            {"name": "Kota Magelang", "lat": -7.4706, "lon": 110.2177},
            {"name": "Kota Tegal", "lat": -6.8694, "lon": 109.14},
        ],
    },
    "detikJabar": {
        "province": "Jawa Barat",
        "cities": [
            {"name": "Kota Bandung", "lat": -6.9175, "lon": 107.6191},
            {"name": "Kota Bekasi", "lat": -6.2349, "lon": 106.9896},
            {"name": "Kota Depok", "lat": -6.4025, "lon": 106.7942},
            {"name": "Kota Bogor", "lat": -6.595, "lon": 106.8166},
        ],
    },
    "detikSulsel": {
        "province": "Sulawesi Selatan",
        "cities": [
            {"name": "Kota Makassar", "lat": -5.1477, "lon": 119.4327},
            {"name": "Kota Parepare", "lat": -4.0135, "lon": 119.6255},
            {"name": "Kota Palopo", "lat": -3.0014, "lon": 120.1989},
        ],
    },
    "detikSumut": {
        "province": "Sumatera Utara",
        "cities": [
            {"name": "Kota Medan", "lat": 3.5952, "lon": 98.6722},
            {"name": "Kota Pematangsiantar", "lat": 2.9604, "lon": 99.0681},
            {"name": "Kota Binjai", "lat": 3.6001, "lon": 98.4853},
        ],
    },
    "detikBali": {
        "province": "Bali",
        "cities": [
            {"name": "Kota Denpasar", "lat": -8.65, "lon": 115.2167},
            {"name": "Kabupaten Badung", "lat": -8.5818, "lon": 115.177},
            {"name": "Kabupaten Gianyar", "lat": -8.5396, "lon": 115.3255},
        ],
    },
    "detikJogja": {
        "province": "Daerah Istimewa Yogyakarta",
        "cities": [
            {"name": "Kota Yogyakarta", "lat": -7.7971, "lon": 110.3708},
            {"name": "Kabupaten Sleman", "lat": -7.6819, "lon": 110.3233},
            {"name": "Kabupaten Bantul", "lat": -7.8831, "lon": 110.3289},
        ],
    },
    "detikSumbagsel": {
        "province": "Sumatera Selatan",
        "cities": [
            {"name": "Kota Palembang", "lat": -2.9761, "lon": 104.7754},
            {"name": "Kota Prabumulih", "lat": -3.4324, "lon": 104.2345},
            {"name": "Kota Lubuklinggau", "lat": -3.2965, "lon": 102.8619},
        ],
    },
    "detikNews": {
        "province": "DKI Jakarta",
        "cities": [
            {
                "name": "Kota Administrasi Jakarta Pusat",
                "lat": -6.1754,
                "lon": 106.8272,
            },
            {
                "name": "Kota Administrasi Jakarta Selatan",
                "lat": -6.2615,
                "lon": 106.7806,
            },
            {
                "name": "Kota Administrasi Jakarta Timur",
                "lat": -6.2088,
                "lon": 106.8456,
            },
            {
                "name": "Kota Administrasi Jakarta Barat",
                "lat": -6.1697,
                "lon": 106.7893,
            },
            {"name": "Kota Administrasi Jakarta Utara", "lat": -6.1384, "lon": 106.866},
        ],
    },
}


def get_location_data():
    """Returns the pre-defined location data for authors."""
    location_map = {}
    logger.info("Setting up author location data...")
    for author, places in AUTHOR_LOCATION_MAP.items():
        province_name = places["province"]
        location_map[author] = {"province": province_name, "cities": places["cities"]}
        logger.info(
            f"Configured {author} -> {province_name} with {len(places['cities'])} cities"
        )
    logger.info("Finished setting up location data.")
    return location_map


def enrich_data_by_author(location_map):
    with Session(engine) as session:
        authors_to_find = list(location_map.keys())
        statement = select(News).where(
            News.author.in_(authors_to_find), News.city == None
        )
        articles_to_process = session.exec(statement).all()
        logger.info(
            f"Found {len(articles_to_process)} articles to enrich based on author."
        )

        updated_count = 0
        for article in articles_to_process:
            if article.author in location_map:
                author_data = location_map[article.author]
                if author_data["cities"]:
                    chosen_city_data = random.choice(author_data["cities"])

                    article.city = chosen_city_data["name"]
                    article.province = author_data["province"]
                    article.latitude = chosen_city_data["lat"]
                    article.longitude = chosen_city_data["lon"]

                    session.add(article)
                    updated_count += 1

        if updated_count > 0:
            session.commit()
            logger.info(
                f"Successfully updated {updated_count} articles with randomized locations."
            )


if __name__ == "__main__":
    location_data = get_location_data()
    if location_data:
        enrich_data_by_author(location_data)
