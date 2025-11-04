import os
from sqlalchemy import create_engine, desc
from sqlalchemy.orm import sessionmaker
from .model import Base, Message
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
    
    # Add an initial message if the table is empty
    db = SessionLocal()
    if db.query(Message).count() == 0:
        initial_message = Message(
            name="Catalina",
            message="Welcome to the message wall! Feel free to leave a message. 頑張りましょう！"
        )
        db.add(initial_message)
        db.commit()
    db.close()

# CRUD Operations
def create_message(db, name: str, message: str):
    if not name or not name.strip():
        name = "Anonymous"
    db_message = Message(name=name, message=message)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_messages(db, limit: int = 10):
    return db.query(Message).order_by(desc(Message.created_at)).limit(limit).all()

def delete_message(db, message_id):
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if db_message:
        db.delete(db_message)
        db.commit()
        return True
    return False