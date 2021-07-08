from flask import Flask, render_template, request
from decouple import config
from opentok import Client

opentok_api = config('OPENTOK_API')
opentok_secret = config('OPENTOK_SECRET')
scaledrone_api = config('SCALENDRONE')

client = Client(opentok_api, opentok_secret)
session = client.create_session()
session_id = session.session_id

app = Flask(__name__, static_url_path='')


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        token = client.generate_token(session_id)
        admin = False
        if 'admin' in request.form:
            admin = True
        name = request.form['name']
        return render_template('main_view.html', session_id=session_id, token=token, is_admin=admin, name=name,
                               scaledrone_api=scaledrone_api, api_key=opentok_api)
    return 'please log in'


@app.route('/admin')
def admin():
    return render_template('admin.html')


@app.route('/join')
def join():
    return render_template('name.html')


app.debug = True
app.run()