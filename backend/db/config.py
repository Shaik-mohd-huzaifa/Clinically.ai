from peewee import MySQLDatabase
from dotenv import load_dotenv
import os

load_dotenv()

TIDB_HOST = os.getenv("TIDB_HOST")
TIDB_USERNAME = os.getenv("TIDB_USERNAME")
TIDB_PASSWORD = os.getenv("TIDB_PASSWORD")

# Initialize the TiDB database connection
db = MySQLDatabase(
    "clinically_AI",
    user=TIDB_USERNAME,
    password=TIDB_PASSWORD,
    host=TIDB_HOST,
    port=4000,
    ssl_verify_cert=True,
    ssl_verify_identity=True,
)
