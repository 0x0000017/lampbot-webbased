#! /usr/bin/env python3

from os import stat
from flask import Flask, render_template, request, jsonify
from flask_cors	import CORS
from chat import get_response
from hostChecker import lamphost

# import dbconnect

app = Flask(__name__)
CORS(app)



@app.post("/predict")
def predict():
	text = request.get_json().get("message")
	# validation
	response = get_response(text)
	message = {"answer": response}
	return jsonify(message)

	
if __name__ == "__main__":
	app.run(debug=False)
	status = lamphost("lamp.gordoncollege.edu.ph")