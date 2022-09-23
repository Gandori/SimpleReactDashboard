import json
from ..session import Session

class Logout:
    def __init__(self) -> None:
        pass

    def response(self):
        Session('user', None).deleteSession()
        return json.dumps(None)