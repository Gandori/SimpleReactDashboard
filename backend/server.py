from flask import Flask, render_template, redirect, url_for

from .serverConfig import *
from .database.database import database
from .routes import *

class app:
    def __init__(self) -> None:
        self = Flask(__name__)
        self.config.from_object(dev_config)
        self.host = '0.0.0.0'
        self.port = 5050
        self.template_folder = '../client/build'
        self.static_folder = '../client/build/static'
        
        @self.errorhandler(404)
        def errorhandler_404(*args):
            return redirect(url_for('index'))

        @self.route('/', methods=['GET'])
        def index():
            return render_template('index.html')
        
        self.view_functions['signin'] = signin.Signin().response
        self.view_functions['signup'] = signup.Signup().response
        self.view_functions['data'] = data.Data().response
        self.view_functions['logout'] = logout.Logout().response

        self.add_url_rule('/signin', 'signin', methods=['POST'])
        self.add_url_rule('/signup', 'signup', methods=['POST'])
        self.add_url_rule('/data', 'data', methods=['GET'])
        self.add_url_rule('/logout', 'logout', methods=['POST'])

        with database() as db: db.createTables()
        self.run(self.host, self.port)