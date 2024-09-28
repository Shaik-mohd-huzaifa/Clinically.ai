from peewee import Model, AutoField, PrimaryKeyField, CharField, IntegerField
from db.config import db


class Appointments(Model):
    appointment_id = PrimaryKeyField(AutoField())
    patient_name = CharField()
    patient_bloodGroup = CharField()
    patient_age = IntegerField()
    type = CharField()
    department = CharField()

    class Meta:
        database = db
        table_name = "appointments"


def tableCreation():
    db.connect()
    db.create_tables([Appointments])
