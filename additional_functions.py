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
	
cursor.close()