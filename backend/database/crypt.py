import cryptocode

class crypt:
    def __init__(self, value) -> None:
        self.value = value

    def encrypt(self):
        return cryptocode.encrypt(str,self.value)

    def decoded(self):
        return cryptocode.decrypt(str, self.value)