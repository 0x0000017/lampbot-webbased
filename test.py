mystring = 'im here !'
pos = 6039


with open('intents.json', 'r+') as f:
    contents = f.read()
    contents = contents[:pos] + mystring + contents[pos + 1:]
    f.seek(0)
    f.truncate()
    f.write(contents)