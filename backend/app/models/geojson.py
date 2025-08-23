from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from geoalchemy2 import Geometry

GISBase = declarative_base()


class Province(GISBase):
    __tablename__ = "province"

    ogc_fid = Column(Integer, primary_key=True, autoincrement=True)
    wkb_geometry = Column(Geometry("GEOMETRY", 4326))
    objectid = Column(Integer)
    kode_prov = Column(String)
    provinsi = Column(String)
    remark = Column(String)
    metadata_field = Column(String)
    srs_id = Column(String)
    kdbbps = Column(String)
    kdcbps = Column(String)
    kdcpum = Column(String)
    kdebps = Column(String)
    kdepum = Column(String)
    kdpbps = Column(String)
    kdpkab = Column(String)
    kdppum = Column(String)
    luaswh = Column(Float)
    tipadm = Column(Integer)
    wadmkc = Column(String)
    wadmkd = Column(String)
    wadmkk = Column(String)
    wadmpr = Column(String)
    wiadkc = Column(String)
    wiadkk = Column(String)
    wiadpr = Column(String)
    wiadkd = Column(String)
    uupp = Column(String)
    luas = Column(Float)


class CityRegency(GISBase):
    __tablename__ = "city_regency"

    ogc_fid = Column(Integer, primary_key=True, autoincrement=True)
    wkb_geometry = Column(Geometry("GEOMETRY", 4326))
    objectid = Column(Integer)
    namobj = Column(String)
    fcode = Column(String)
    remark = Column(String)
    metadata_field = Column(String)
    srs_id = Column(String)
    kdbbps = Column(String)
    kdcbps = Column(String)
    kdcpum = Column(String)
    kdebps = Column(String)
    kdepum = Column(String)
    kdpbps = Column(String)
    kdpkab = Column(String)
    kdppum = Column(String)
    luaswh = Column(Float)
    tipadm = Column(Integer)
    wadmkc = Column(String)
    wadmkd = Column(String)
    wadmkk = Column(String)
    wadmpr = Column(String)
    wiadkc = Column(String)
    wiadkk = Column(String)
    wiadpr = Column(String)
    wiadkd = Column(String)
    uupp = Column(String)
    luas = Column(Float)
