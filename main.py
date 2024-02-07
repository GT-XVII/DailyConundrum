from flask import Flask, render_template, request, redirect, url_for, flash, session, get_flashed_messages
from flask_bcrypt import Bcrypt
import json

app = Flask(__name__)

bcrypt = Bcrypt(app)

app.secret_key = 'webengineering'

def save_credentials(username, password):
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = {username: hashed_password}

    try:
        with open('users.json', 'r+') as file:
            users = json.load(file)
            users.update(new_user)
            file.seek(0)
            json.dump(users, file)
    except FileNotFoundError:
        with open('users.json', 'w') as file:
            json.dump(new_user, file)
            
def validate_login(username, password):
    try:
        with open('users.json', 'r') as file:
            users = json.load(file)
            hashed_password = hashed_password = users[username]['password']
            if hashed_password:
                return bcrypt.check_password_hash(hashed_password, password)
            return False
    except FileNotFoundError:
        return False
  
def hash_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

def add_user(username, email, password):
    hashed_password = hash_password(password)
    new_user = {username: {"email": email, "password": hashed_password}}

    try:
        with open('users.json', 'r+') as file:
            users = json.load(file)
            
            # Check if username or email already exists
            if username in users or any(user["email"] == email for user in users.values()):
                get_flashed_messages(with_categories=True)
                return "Username or email already exists." 
            
            users.update(new_user)
            file.seek(0)
            json.dump(users, file, indent=4)
            return "User added successfully."
    except FileNotFoundError:
        with open('users.json', 'w') as file:
            json.dump(new_user, file, indent=4)
            return "User added successfully."

    
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not username or not email or not password:
            get_flashed_messages(with_categories=True)
            flash("Username, email, and password cannot be empty.", "error")
            return render_template("register.html")

        message = add_user(username, email, password)
        if message == "User added successfully.":
            get_flashed_messages(with_categories=True)
            flash("Account created successfully. Please log in.", "success")
            return redirect(url_for('login'))
        else:
            flash(message, "error")

    return render_template("register.html")

@app.route("/", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']

        if validate_login(username, password):
            session['logged_in'] = True
            return redirect(url_for('game'))
        else:
            error = "Incorrect login details"

    return render_template("login.html", error=error)

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