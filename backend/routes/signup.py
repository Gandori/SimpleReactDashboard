from flask import request
import json
from ..database.database import database

class Signup:
    def __init__(self) -> None:
        self.username = None
        self.passwd = None

    def getAllUsernamesFromDatabase(self):
        with database() as db:
            db.cursor.execute(f"select Name from Accounts")
            return db.cursor.fetchall()

    def isUsernameInDatabase(self):
        for user in self.getAllUsernamesFromDatabase():
            if(self.username == user[0]):
                return True
            if(self.username.capitalize() == user[0]):
                return True
            if(self.username.lower() == user[0]):
                return True

    def addUsernameInDatabase(self):
        with database() as db:
            db.cursor.execute(f"insert into Accounts values('{self.username}', '{self.passwd}', 'offline', ' ')")

    def response(self):
        self.username = request.json['Username']
        self.passwd = request.json['Passwd']

        if self.isUsernameInDatabase():
            return json.dumps(False)
        self.addUsernameInDatabase()
        return json.dumps(True)