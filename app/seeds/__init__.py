from flask.cli import AppGroup
from .users import seed_users, undo_users
from .services import seed_services, undo_services
from .bookings import seed_bookings, undo_bookings
from .pets import seed_pets, undo_pets
from .reviews import seed_reviews, undo_reviews
from .pet_images import seed_pet_images, undo_pet_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_bookings()
        undo_pet_images()
        undo_pets()
        undo_reviews()
        undo_services()
        undo_users()
    seed_users()
    seed_services()
    seed_reviews()
    seed_pets()
    seed_pet_images()
    seed_bookings()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_services()
    undo_reviews()
    undo_pets()
    undo_pet_images()
    undo_bookings()
    # Add other undo functions here
