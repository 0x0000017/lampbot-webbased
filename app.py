
import sys
import nltk

from os import stat
from flask import Flask, json, render_template, request, jsonify
from flask_cors	import CORS

from chat import get_response
from additional_functions import lamphost, showQuery
from additional_functions import write_json

nltk.download('punkt')

app = Flask(__name__)
CORS(app)


@app.post("/predict")
def predict():
	text = request.get_json().get("message")
	# validation
	response = get_response(text)
	message = {"answer": response}
	return jsonify(message)


@app.route("/getReport")
def getReport():
	showQuery()

	return getReport
@app.route('/uploadq', methods=['GET','POST'])
def uploadq():
	data = request.get_json()
	tag = data['tag']
	patterns = data['patterns']
	responses = data['responses']

	newRes = {
		"tag": tag, "patterns": patterns, "responses" : responses
		}

	write_json(newRes)
	return newRes


if __name__ == "__main__":
	app.run(debug=True)