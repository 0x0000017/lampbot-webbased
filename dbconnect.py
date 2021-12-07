import mysql.connector as mysql

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