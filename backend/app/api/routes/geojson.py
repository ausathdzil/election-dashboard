from app.api.deps import SessionDep
from fastapi import APIRouter, HTTPException, Response
from sqlmodel import text
import logging

router = APIRouter(prefix="/tiles", tags=["tiles"])

logger = logging.getLogger(__name__)


def _validate_slippy(z: int, x: int, y: int) -> None:
    max_index = 1 << z
    if x < 0 or y < 0 or x >= max_index or y >= max_index:
        raise HTTPException(
            status_code=400, detail="Invalid tile coordinates for zoom level"
        )


@router.get("/{z}/{x}/{y}")
def get_tile(session: SessionDep, z: int, x: int, y: int):
    _validate_slippy(z, x, y)

    try:
        sql_query = text("SELECT public.generate_tile(:z, :x, :y)")
        value = session.execute(
            sql_query, {"z": z, "x": x, "y": y}
        ).scalar_one_or_none()

        if value is None:
            logger.warning(f"Tile {z}/{x}/{y} returned no data")
            return Response(
                status_code=204, media_type="application/vnd.mapbox-vector-tile"
            )

        tile = bytes(value)
        logger.debug(f"Successfully generated tile {z}/{x}/{y} with {len(tile)} bytes")

        return Response(
            content=tile,
            media_type="application/vnd.mapbox-vector-tile",
            headers={
                "Access-Control-Allow-Origin": "*",
            },
        )

    except Exception as e:
        error_msg = str(e)
        logger.error(f"Error generating tile {z}/{x}/{y}: {error_msg}")

        if "TopologyException" in error_msg or "GEOSIntersects" in error_msg:
            logger.warning(f"Topology error for tile {z}/{x}/{y}, returning empty tile")
            return Response(
                status_code=204, media_type="application/vnd.mapbox-vector-tile"
            )

        raise HTTPException(
            status_code=500, detail=f"Failed to generate tile: {error_msg}"
        )
