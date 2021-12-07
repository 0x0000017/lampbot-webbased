#! /usr/bin/env python3

import random
import json
import torch
from datetime import datetime
from hostChecker import lamphost
from dbconnect import doQuery
from pathlib import Path
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

def hostcheck():
	status = lamphost("lamp.gordoncollege.edu.ph")
	if status == True:
		isHostUp = " up and running !."
		return isHostUp
	else:
		isHostUp = " currently down at the moment."
		return isHostUp

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('intents.json', 'r', encoding='UTF-8') as json_data:
    intents = json.load(json_data)

FILE = "data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "LAMPBot"


def get_response(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                if tag == "lamp_status":
                    hostcheck()
                    return intent['responses']+[hostcheck()]
                return random.choice(intent['responses'])

    dateNow = datetime.date(datetime.now())
    logVals = (msg, dateNow)
    doQuery(logVals)

    return "I don't quite understand, but don't worry -- it will be added next time ! :) "


if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        print(resp)