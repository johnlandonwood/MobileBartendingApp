import random
from faker import Faker
import requests

faker = Faker()

# Define API endpoint
api_endpoint = "http://localhost:8080/api/events"

# Generate a random event
def generate_random_event():
    name = faker.name()

    event = {
        "name": f'{name}\'s Event',
        "host": faker.name(),
        "date_of_event": faker.date_between(start_date="-1y", end_date="+1y").isoformat(),
        "start_time": faker.iso8601(tzinfo=None, end_datetime=None),
        "end_time": faker.iso8601(tzinfo=None, end_datetime=None),
        "open_bar": faker.boolean(chance_of_getting_true=50),
        "public_event": faker.boolean(chance_of_getting_true=50),
        "location": generate_random_us_coordinates()
    }
    return event

# Generate random coordinates within the US
def generate_random_us_coordinates():
    latitude = 32.7767
    longitude = -96.7970

    latitude += random.uniform(-0.02, 0.02)
    longitude += random.uniform(-0.02, 0.02)

    latitude = round(latitude, 4)
    longitude = round(longitude, 4)
    return [longitude, latitude]

# Send an event to the API endpoint
def send_event(event):
    response = requests.post(api_endpoint, json=event)
    if response.status_code == 201:
        print("Event created:", response.json())
    else:
        print("Error:", response.status_code, response.text)

# Generate and send multiple events
num_events = 100
for _ in range(num_events):
    event = generate_random_event()
    send_event(event)
