from flask import json
from ping3 import ping
import mysql.connector as mysql
import webbrowser

mydb = mysql.connect(
	host = "localhost",
	user = "root",
	passwd = "",
	database = "db_logs"
)
cursor = mydb.cursor()
if cursor:
	print("Success")
else:
	print("No database connection")

def lamphost(host):
	resp = ping(host)
	if resp == False:
		return False
	else:
		return True

def hostcheck():
	status = lamphost("lamp.gordoncollege.edu.ph")
	if status == True:
		isHostUp = " up and running !."
		return isHostUp
	else:
		isHostUp = " currently down at the moment."
		return isHostUp

def doQuery(self):
	query = "INSERT INTO tbl_logs (col_query, col_dateadded) VALUES (%s, %s)"

	cursor.execute(query, self)
	mydb.commit()

def write_json(new_data, filename="intents.json"):
	with open(filename, "r+") as file:
		file_data = json.load(file)
		file_data["intents"].append(new_data)
		file.seek(0)
		json.dump(file_data, file, indent = 4)

def showQuery():
	query = "SELECT * FROM tbl_logs"
	cursor.execute(query)
	res = cursor.fetchall()

	x = []
	tbl = "<tr><td>ID</td><td>Query</td><td>Date Added</td></tr>"
	x.append(tbl)
	for row in res:
		a = "<tr><td>%s</td>" %row[0]
		x.append(a)
		b = "<td>%s</td>" %row[1]
		x.append(b)
		c = "<td>%s</td>" %row[2]
		x.append(c)

	contents = '''
	<!DOCTYPE html">
		<html>
		<head>
			<title> Unknown responses </title>
			<style>
			#resp {
  				font-family: Arial, Helvetica, sans-serif;
  				border-collapse: collapse;
  				width: 100%%;
			}
			#resp td, #resp th {
  			border: 1px solid #ddd;
  			padding: 8px;
			}

			#resp tr:nth-child(even){background-color: #f2f2f2;}

			#resp tr:hover {background-color: #ddd;}

			#resp th {
  				padding-top: 12px;
  				padding-bottom: 12px;
  				text-align: left;
  				background-color: #04AA6D;
  				color: white;
			}
			</style>
		</head>
		<body>
		<h1> Unknown Responses Logs</h1>
			<table id = "resp">
				%s
			</table>
		</body>
		</html>
	'''%(x)

	filename = "output.html"
	def gen(contents, filename):
		output = open(filename, "w")
		output.write(contents)
		output.close()

	gen(contents, filename)
	webbrowser.open(filename)