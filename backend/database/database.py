import sqlite3
from os import path

class database():
    def __init__(self) -> None:
        self.dir = path.dirname(path.abspath(__file__))
        self.file = f'{self.dir}/database.db'
        self.connect = None
        self.cursor = None

    def __enter__(self):
        self.connect = sqlite3.connect(self.file)
        self.cursor = self.connect.cursor()
        return self

    def __exit__(self, *args):
        self.connect.commit()
        self.connect.close()

    def createTables(self):
        with open(f'{self.dir}/data.sql') as f:
            self.cursor.executescript(f.read())