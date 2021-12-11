from ping3 import ping
import mysql.connector as mysql


## host checker using ping
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


## pag di mainitindihan yung sinabi, insert sa db yung sinend na message 🤣

mydb = mysql.connect(
	host = "localhost",
	user = "root",
	passwd = "",
	database = "db_logs"
)
cursor = mydb.cursor()

def doQuery(self):
	query = "INSERT INTO tbl_logs (col_query, col_dateadded) VALUES (%s, %s)"

	cursor.execute(query, self)
	mydb.commit()

def showResults():
	query = "SELECT * FROM tbl_logs;"
	cursor.execute(query)
	result = cursor.fetchall()

	p =[]
	tbl = "idcol_querycol_dateadded"
	p.append(tbl)

	for row in result:
		a = "%s" %row[0]
		b = "%s"%row[1]
		p.append(b)
		c = "%s"%row[2]
		p.append(c)
		d = "%s"%row[3]
		p.append(d)

