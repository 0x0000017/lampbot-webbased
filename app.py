
import sys

from os import stat
from flask import Flask, json, render_template, request, jsonify
from flask_cors	import CORS

from chat import get_response
from additional_functions import lamphost



app = Flask(__name__)
CORS(app)


@app.post("/predict")
def predict():
	text = request.get_json().get("message")
	# validation
	response = get_response(text)
	message = {"answer": response}
	return jsonify(message)

	
@app.route('/uploadq', methods=['GET','POST'])
def uploadq():
	result = []
	data = request.get_json()
	tag = data['tag']
	patterns = data['patterns']
	responses = data['responses']

	newRes = {"tag": tag, "patterns": patterns, "responses" : responses}
	newRes_dumped = json.dumps(newRes)
	newLine = ",\n"
	print(newRes)
	pos = 6038
	with open('intents.json', 'r+') as f:
		contents = f.read()
		contents = contents[:pos] + newLine + str(newRes_dumped) + newLine + contents[pos + 1:]
		f.seek(0)
		f.truncate()
		f.write(contents)
	f.close()
	return newRes


if __name__ == "__main__":
	app.run(debug=False)
	