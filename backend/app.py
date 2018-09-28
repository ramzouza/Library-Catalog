from flask import Flask, logging
from flask_restful import Resource, Api

app = Flask(__name__)
app.config.from_pyfile('config.py')

# Init app
app = Flask(__name__)

app.config.from_pyfile('config.py')

# Create api
api = Api(app)


from controllers import UserApi, UserCatalogApi

# add those Resources to the api
apiRoute = '/api'

@app.route('/api')
def index():
    return 'hello world'


#api.add_resource(UserApi, apiRoute + '/users/<string:id>')
#api.add_resource(UserCatalogApi, apiRoute + '/users')

if __name__  == "__main__" :
    app.run()
