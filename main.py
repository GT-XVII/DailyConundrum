from flask import Flask, jsonify, render_template, request, redirect, url_for, flash, session, get_flashed_messages
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
            if username in users:
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
    login_text = "Log In"
    if request.method == "POST":
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if not username or not email or not password:
            flash("Username, email, and password cannot be empty.", "error")
            return render_template("register.html", login_text=login_text)

        message = add_user(username, email, password)
        if message == "User added successfully.":
            flash("Account created successfully. Please log in.", "success")
            return redirect(url_for('login'))
        else:
            flash(message, "error")
            
            return render_template("register.html",login_text=login_text)

    return render_template("register.html", login_text=login_text)

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

    if session.get('logged_in'):
        login_text = "Log Out"
    else:
        login_text = "Log In"

    return render_template("login.html", error=error,login_text=login_text)

@app.route("/game", methods=["GET"])
def game():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    login_text = "Log Out" if session.get('logged_in') else "Log In"
    return render_template("game.html",login_text=login_text)

@app.route("/scoreboard", methods=["GET"])
def scoreboard():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    login_text = "Log Out" if session.get('logged_in') else "Log In"
    return render_template("scoreboard.html",login_text=login_text)

@app.route("/about", methods=["GET"])
def about():
    login_text = "Log Out" if session.get('logged_in') else "Log In"
    return render_template("about.html", login_text=login_text)

@app.route("/contact", methods=["GET", "POST"])
def contact():
    submission_success = False
    if request.method == 'POST':
        submission_success = True
        flash('Submission was successful. We will be in touch shortly!', 'success')
        return redirect(url_for('contact'))
    login_text = "Log Out" if session.get('logged_in') else "Log In"
    return render_template("contact.html", submission_success=submission_success, login_text=login_text)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

@app.route('/save_score', methods=['POST'])
def save_score():
    if request.method == 'POST':
        data = request.get_json()
        if 'playerName' in data and 'score' in data:
            player_name = data['playerName']
            score = data['score']
            try:
                with open('scores.json', 'r') as file:
                    scores = json.load(file)
            except FileNotFoundError:
                scores = []
            
            scores.append({'name': player_name, 'score': score})
            
            with open('scores.json', 'w') as file:
                json.dump(scores, file, indent=4)
            
            return jsonify({'success': True})
        else:
            return jsonify({'success': False, 'error': 'Invalid data format'})
    else:
        return jsonify({'success': False, 'error': 'Method not allowed'})

@app.route('/get_scores', methods=['GET'])
def get_scores():
    try:
        with open('scores.json', 'r') as file:
            scores = json.load(file)
        return jsonify(scores)
    except FileNotFoundError:
        return jsonify([])


if __name__ == '__main__':
    app.run(debug=True)