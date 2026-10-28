from datetime import datetime
from enum import Enum
from typing import Optional
import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, HttpUrl
from sqlalchemy import create_engine, String, Text, DateTime, select, or_
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./delhi_voice.db")
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

class Base(DeclarativeBase): pass
class ContentStatus(str, Enum): draft = "draft"; published = "published"; archived = "archived"
class Article(Base):
    __tablename__ = "articles"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(220), nullable=False)
    slug: Mapped[str] = mapped_column(String(240), unique=True, index=True, nullable=False)
    summary: Mapped[str] = mapped_column(String(500), default="")
    body: Mapped[str] = mapped_column(Text, default="")
    category: Mapped[str] = mapped_column(String(80), default="Culture")
    cover_image: Mapped[Optional[str]] = mapped_column(String(1000), nullable=True)
    author: Mapped[str] = mapped_column(String(120), default="Delhi Voice Editorial")
    status: Mapped[str] = mapped_column(String(20), default=ContentStatus.draft.value)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Place(Base):
    __tablename__ = "places"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(220), nullable=False)
    slug: Mapped[str] = mapped_column(String(240), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    area: Mapped[str] = mapped_column(String(120), default="Delhi")
    category: Mapped[str] = mapped_column(String(80), default="Heritage")
    image_url: Mapped[Optional[str]] = mapped_column(String(1000), nullable=True)
    map_url: Mapped[Optional[str]] = mapped_column(String(1000), nullable=True)

class Event(Base):
    __tablename__ = "events"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(220), nullable=False)
    slug: Mapped[str] = mapped_column(String(240), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    venue: Mapped[str] = mapped_column(String(220), default="")
    neighbourhood: Mapped[str] = mapped_column(String(120), default="Delhi")
    starts_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    ends_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    entry_fee: Mapped[str] = mapped_column(String(100), default="Check with organiser")
    booking_url: Mapped[Optional[str]] = mapped_column(String(1000), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default=ContentStatus.draft.value)

Base.metadata.create_all(engine)
app = FastAPI(title="Delhi Voice API", version="1.0.0", description="REST API for the Delhi Voice city-culture magazine")
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

class ArticleIn(BaseModel):
    title: str = Field(min_length=3, max_length=220)
    slug: str = Field(pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$", max_length=240)
    summary: str = Field(default="", max_length=500)
    body: str = ""
    category: str = "Culture"
    cover_image: Optional[str] = None
    author: str = "Delhi Voice Editorial"
    status: ContentStatus = ContentStatus.draft
class PlaceIn(BaseModel):
    name: str = Field(min_length=2, max_length=220)
    slug: str = Field(pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$", max_length=240)
    description: str = ""
    area: str = "Delhi"
    category: str = "Heritage"
    image_url: Optional[str] = None
    map_url: Optional[str] = None
class EventIn(BaseModel):
    title: str = Field(min_length=3, max_length=220)
    slug: str = Field(pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$", max_length=240)
    description: str = ""
    venue: str = ""
    neighbourhood: str = "Delhi"
    starts_at: Optional[datetime] = None
    ends_at: Optional[datetime] = None
    entry_fee: str = "Check with organiser"
    booking_url: Optional[str] = None
    status: ContentStatus = ContentStatus.draft

def dump(obj):
    return {c.name: getattr(obj, c.name).isoformat() if isinstance(getattr(obj, c.name), datetime) else getattr(obj, c.name) for c in obj.__table__.columns}
def get_or_404(db, model, item_id):
    obj = db.get(model, item_id)
    if not obj: raise HTTPException(404, "Item not found")
    return obj
def list_items(model, limit, offset, search, published_only=False):
    with SessionLocal() as db:
        stmt = select(model)
        if published_only and hasattr(model, "status"): stmt = stmt.where(model.status == ContentStatus.published.value)
        if search:
            fields = [model.title, model.summary] if model is Article else ([model.name, model.description, model.area] if model is Place else [model.title, model.description, model.venue, model.neighbourhood])
            stmt = stmt.where(or_(*(field.ilike(f"%{search}%") for field in fields)))
        rows = db.scalars(stmt.order_by(model.id.desc()).offset(offset).limit(limit)).all()
        return [dump(row) for row in rows]

@app.get("/")
def root(): return {"name": "Delhi Voice API", "docs": "/docs", "health": "/health"}
@app.get("/health")
def health(): return {"status": "ok"}
@app.get("/api/articles")
def articles(limit: int = Query(12, ge=1, le=100), offset: int = Query(0, ge=0), q: Optional[str] = None): return list_items(Article, limit, offset, q, True)
@app.get("/api/articles/{slug}")
def article_detail(slug: str):
    with SessionLocal() as db:
        obj = db.scalar(select(Article).where(Article.slug == slug, Article.status == ContentStatus.published.value))
        if not obj: raise HTTPException(404, "Published article not found")
        return dump(obj)
@app.get("/api/places")
def places(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0), q: Optional[str] = None): return list_items(Place, limit, offset, q)
@app.get("/api/events")
def events(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0), q: Optional[str] = None): return list_items(Event, limit, offset, q, True)

# Demo CRUD routes are intentionally labelled as unprotected. Before public deployment,
# add authentication and role checks here; do not expose these endpoints to the internet as-is.
@app.post("/api/admin/articles", status_code=201)
def create_article(payload: ArticleIn):
    with SessionLocal() as db:
        if db.scalar(select(Article).where(Article.slug == payload.slug)): raise HTTPException(409, "Slug already exists")
        obj = Article(**payload.model_dump()); db.add(obj); db.commit(); db.refresh(obj); return dump(obj)
@app.put("/api/admin/articles/{item_id}")
def update_article(item_id: int, payload: ArticleIn):
    with SessionLocal() as db:
        obj = get_or_404(db, Article, item_id)
        duplicate = db.scalar(select(Article).where(Article.slug == payload.slug, Article.id != item_id))
        if duplicate: raise HTTPException(409, "Slug already exists")
        for key, value in payload.model_dump().items(): setattr(obj, key, value)
        db.commit(); db.refresh(obj); return dump(obj)
@app.delete("/api/admin/articles/{item_id}", status_code=204)
def delete_article(item_id: int):
    with SessionLocal() as db:
        obj = get_or_404(db, Article, item_id); db.delete(obj); db.commit(); return None
@app.post("/api/admin/places", status_code=201)
def create_place(payload: PlaceIn):
    with SessionLocal() as db:
        if db.scalar(select(Place).where(Place.slug == payload.slug)): raise HTTPException(409, "Slug already exists")
        obj = Place(**payload.model_dump()); db.add(obj); db.commit(); db.refresh(obj); return dump(obj)
@app.post("/api/admin/events", status_code=201)
def create_event(payload: EventIn):
    with SessionLocal() as db:
        if db.scalar(select(Event).where(Event.slug == payload.slug)): raise HTTPException(409, "Slug already exists")
        obj = Event(**payload.model_dump()); db.add(obj); db.commit(); db.refresh(obj); return dump(obj)
