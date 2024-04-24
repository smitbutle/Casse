from app import db
from datetime import datetime, timezone

class User(db.Model):
    __tablename__ = 'users'
    # admin = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, primary_key=True)
    user_fullname = db.Column(db.String(500))
    user_email = db.Column(db.String(500))
    password = db.Column(db.String(500))
    username = db.Column(db.String(500))
    last_login_date = db.Column(db.DateTime)
    user_image = db.Column(db.LargeBinary)
    create_date = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))



class Functions(db.Model):
    __tablename__ = 'functions'

    function_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    entrypoint = db.Column(db.String(100))
    description = db.Column(db.Text)
    content = db.Column(db.Text)
    weburl = db.Column(db.Text)
    create_date = db.Column(db.TIMESTAMP(timezone=False), nullable=False, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
