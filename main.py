from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)

app.secret_key = 'webengineering'

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']

        test_username = "testuser"
        test_password = "testpass"

        if username == test_username and password == test_password:
            session['logged_in'] = True
            return redirect(url_for('game'))
        else:
            return "Invalid credentials"

    return render_template("login.html")

@app.route("/game", methods=["GET"])
def game():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template("game.html")

@app.route("/scoreboard", methods=["GET"])
def scoreboard():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    return render_template("scoreboard.html")

@app.route("/about", methods=["GET"])
def about():
    return render_template("about.html")

@app.route("/contact", methods=["GET"])
def contact():
    return render_template("contact.html")

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)