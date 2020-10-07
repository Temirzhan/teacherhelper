from flask import Flask, render_template, request, g, session, redirect, url_for
import os
from Globals import PATH
from tools import log, load_users
from waitress import serve
from functools import wraps
log = log("main", "main.log")
app = Flask(__name__)
app.secret_key = os.urandom(24)
app.logr = log

# @app.route('/')
# def index():
#     if g.user:
#         return render_template("index.html")
#     else:
#         return redirect( url_for( "auth" ) )


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user is None:
            return redirect( url_for('auth') )
        return f( *args, **kwargs )
    return decorated_function


@app.route('/')
@login_required
def home():
    data = {}
    data['user'] = g.user
    return render_template("home.html", data = data)


@app.route("/auth", methods=["GET"])
def auth():
    if g.user:
        return redirect( url_for( "home" ) )
    else:
        data = {}
        data['user'] = None
        return render_template("login.html", data = data)


@app.route("/auth", methods=["POST"])
def auth_():
    session.pop('user', None)
    form = request.form.to_dict()
    users = load_users()
    if form['InputINN'] in users.keys():
        session['user_id'] = users[ form['InputINN'] ]
        return redirect( url_for( "home" ) )
    else:
        return redirect( url_for("auth") )


@app.route('/module1')
@login_required
def module1():
    data = {}
    data['user'] = g.user
    return render_template("module1.html", data = data)


@app.route('/module2')
@login_required
def module2():
    data = {}
    data['user'] = g.user
    return render_template("module2.html", data = data)


@app.route('/module3')
@login_required
def module3():
    data = {}
    data['user'] = g.user
    return render_template("module3.html", data = data)


@app.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        g.user = session['user_id']


@app.route('/logout', methods=["GET"])
def logout():
    session.pop('user_id', None)
    return redirect( url_for("auth") )

# @app.errorhandler(413)
# def request_entity_too_large(error):
#     # return 'File Too Large', 413
#     return render_template("404.html", error=error, code_error = 413), 413

@app.errorhandler(404)
def error_404(error):
    # return render_template("404.html" ), 404
    return "Error Not Found 404", 404

def app_run():
    if os.getenv("APP_PATH", False):
        serve(app, host='0.0.0.0', port=5000)
    else:
        app.run(port=5000, host='0.0.0.0', debug=True)

if __name__ == '__main__':
    app_run()