import json
import psutil
from ..database.database import database
from ..session import Session

class Data:
    def __init__(self) -> None:
        self.cpu = None
        self.ram = None
        self.users = None
        self.projects = None

    def getUsers(self):
        with database() as db:
            db.cursor.execute(f"select Name, Status from Accounts")
            return db.cursor.fetchall()

    def response(self):
        user = Session('user', None).getSession()
        if not user: return json.dumps(None)

        self.cpu = psutil.cpu_percent(interval=0)
        self.ram = psutil.virtual_memory()[2]
        self.users = self.getUsers()

        return json.dumps({
            'cpu': self.cpu,
            'ram': self.ram,
            'users': self.users
        })