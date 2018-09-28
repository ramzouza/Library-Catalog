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

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'



#api.add_resource(UserApi, apiRoute + '/users/<string:id>')
#api.add_resource(UserCatalogApi, apiRoute + '/users')



# Run
if __name__ == '__main__':
	app.run(host='0.0.0.0',debug=True)