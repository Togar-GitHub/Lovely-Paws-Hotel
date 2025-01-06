from datetime import date
from app.models import db, Pet, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pets():
    pets = [
        Pet(
            name='King',
            type='cat',
            breed='Domestic Shorthair',
            age=13,
            gender='Male',
            color='White and black',
            weight=12.0,
            dob=date(2011, 6, 15),
            size='a heckin chonker',
            behavior='calm',
            medication_note='',
            dietary_note='Prefers grain-free food',
            preview_image='https://i.ibb.co/KKJRh0s/king-4.png',
            owner_id=5
        ),
        Pet(
            name='Kilo',
            type='cat',
            breed='Domestic Shorthair',
            age=1,
            gender='male',
            color='White and black',
            weight=8.0,
            dob=date(2024, 6, 1),
            size='a fine boi',
            behavior='aggresive',
            medication_note='',
            dietary_note='Prefers wet food',
            preview_image='https://i.ibb.co/prDb4np/Kilo-1.png',
            owner_id=6
        ),
        Pet(
            name='Zeus',
            type='dog',
            breed='Pug',
            age=3,
            gender='male',
            color='Black',
            weight=22.0,
            dob=date(2021, 3, 25),
            size='he chomnk',
            behavior='playful',
            medication_note='Takes daily supplements for joints',
            dietary_note='',
            preview_image='https://i.ibb.co/RhfnWz8/Zeus-5.png',
            owner_id=7
        ),
        Pet(
            name='Zola',
            type='dog',
            breed='Husky',
            age=7,
            gender='female',
            color='White',
            weight=53.0,
            dob=date(2017, 7, 8),
            size='hefty chonk',
            behavior='playful',
            medication_note='',
            dietary_note='',
            preview_image='https://i.ibb.co/8KgmVGq/Alex-dog-4.jpg',
            owner_id=8
        ),
        Pet(
            name='Bella',
            type='dog',
            breed='American Boxer',
            age=10,
            gender='female',
            color='Brown',
            weight=42.0,
            dob=date(2014, 5, 12),
            size='a fine boi',
            behavior='playful',
            medication_note='',
            dietary_note='',
            preview_image='https://i.ibb.co/bXPhRLQ/bella-2.png',
            owner_id=7
        ),
        Pet(
            name='Cosmo',
            type='cat',
            breed='Domestic Longhair',
            age=11,
            gender='female',
            color='Gray',
            weight=17.0,
            dob=date(2013, 1, 14),
            size='megachonker',
            behavior='aggresive',
            medication_note='',
            dietary_note='Eats 12 times a day to solve his aggression',
            preview_image='https://i.ibb.co/sv0b55q/cosmo-1.jpg',
            owner_id=6
        ),
        Pet(
            name='Wilson',
            type='dog',
            breed='Miniature Australian Shepherd',
            age=6,
            gender='male',
            color='White, brown and black',
            weight=17.0,
            dob=date(2018, 4, 11),
            size='a fine boi',
            behavior='playful',
            medication_note='',
            dietary_note='',
            preview_image='https://i.ibb.co/bKbqRTx/Wilson-3.jpg',
            owner_id=6
        ),
        Pet(
            name='Kira',
            type='dog',
            breed='Husky Mix',
            age=5,
            gender='female',
            color='Black and white',
            weight=53.0,
            dob=date(2019, 12, 31),
            size='megachonker',
            behavior='calm',
            medication_note='',
            dietary_note='',
            preview_image='https://i.ibb.co/hWCpzLX/Kira-4.jpg',
            owner_id=6
        ),
        Pet(
            name='Roxy',
            type='dog',
            breed='Australian Shepherd',
            age=4,
            gender='female',
            color='Brown and white',
            weight=45.0,
            dob=date(2020, 9, 7),
            size='heftychonker',
            behavior='aggresive',
            medication_note='',
            dietary_note='',
            preview_image='https://i.ibb.co/cQ5FjPN/Roxy-5.jpg',
            owner_id=6
        ),
        Pet(
            name='Harris',
            type='cat',
            breed='Domestic Longhair',
            age=9,
            gender='male',
            color='White and Striped',
            weight=18.0,
            dob=date(2015, 7, 10),
            size='heftychonker',
            behavior='timid',
            medication_note='',
            dietary_note='',
            preview_image='https://i.ibb.co/LJ58tKD/harris1.jpg',
            owner_id=6
        ),
    ]

    for pet in pets:
        db.session.add(pet)

    db.session.commit()

def undo_pets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))
    db.session.commit()
