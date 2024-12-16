from app.models import db, Review, environment, SCHEMA
from .users import User

def seed_reviews():
    client_5 = User.query.get(5)
    client_6 = User.query.get(6)
    client_7 = User.query.get(7)
    client_8 = User.query.get(8)

    review_1 = Review(
        client_id=client_5.id,
        review="The service was amazing, and my dog looked so happy after the stay!",
        stars=5
    )
    review_2 = Review(
        client_id=client_6.id,
        review="Very clean and luxurious facility. My cat felt like royalty!",
        stars=5
    )
    review_3 = Review(
        client_id=client_7.id,
        review="The staff was friendly, but I wish there were more outdoor spaces for pets.",
        stars=4
    )
    review_4 = Review(
        client_id=client_8.id,
        review="Overall, a great experience. My pet seemed well cared for.",
        stars=4
    )

    db.session.add_all([review_1, review_2, review_3, review_4])

    db.session.commit()
