from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .service_staff import service_staff


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    fname = db.Column(db.String(40), nullable=False)
    lname = db.Column(db.String(40), nullable=False)
    phone_num = db.Column(db.String(13), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    staff = db.Column(db.Boolean, nullable=True, default=False)
    position = db.Column(db.String(40), nullable=True, default=None)

    services = db.relationship(
        'Service',
        secondary=service_staff,
        back_populates='staff',
        lazy='joined'
    )

    reviews = db.relationship(
        'Review',
        back_populates='client'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'fname': self.fname,
            'lname': self.lname,
            'phone_num': self.phone_num,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
            'staff': self.staff,
            'position': self.position
        }
