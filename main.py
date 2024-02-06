from flask import Flask, render_template

app = Flask(__name__)

@app.route("/game", methods=["GET"])
def index():
    return render_template("game.html")

@app.route("/scoreboard", methods=["GET"])
def scoreboard():
    return render_template("scoreboard.html")

@app.route("/about", methods=["GET"])
def about():
    return render_template("about.html")

@app.route("/contact", methods=["GET"])
def contact():
    return render_template("contact.html")

if __name__ == '__main__':
    app.run(debug=True)