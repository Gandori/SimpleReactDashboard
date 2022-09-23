from flask import session

class Session:
    def __init__(self, key, value) -> None:
        self.key = key
        self.value = value

    def createSession(self):
        session[self.key] = self.value

    def getSession(self):
        if self.key in session:
            return session[self.key]

    def deleteSession(self):
        if self.key in session:
            del session[self.key]

    def clearAllSessions():
        session.clear()