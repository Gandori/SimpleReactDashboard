from flask import request
import json
from ..database.database import database
from ..session import Session
from .data import Data

class Signin():
    def __init__(self):
        self.username = None
        self.passwd = None

    def isUsernameInDatabase(self):
        with database() as db:
            db.cursor.execute(f"select Passwort from Accounts where Name = '{self.username}'")
            data = db.cursor.fetchone()
            if data: return data[0]
            return data

    def isPasswdValid(self):
        if self.passwd == self.isUsernameInDatabase():
            return True
        return False

    def setUserOnline(self):
        with database() as db:
            db.cursor.execute(f"update Accounts set Status = 'online' where Name = '{self.username}'")

    def response(self):
        self.username = request.json['Username']
        self.passwd = request.json['Passwd']

        if not self.isPasswdValid():
            return json.dumps(False)
            
        Session('user', self.username).createSession()
        self.setUserOnline()

        return Data().response()