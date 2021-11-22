import datetime

currentDay = datetime.datetime.today().weekday()

hostname = 'localhost'
username = 'root'
password = ''
database = 'studentSched_db'


def doQuery(conn):
	cur = conn.cursor()
	if (currentDay == 0):
		cur.execute("SELECT st_id, scd_monday FROM tbl_students;")
		sched = "scd_monday"
	elif (currentDay == 1):
		cur.execute("SELECT st_id, scd_tues FROM tbl_students;")
		sched = "scd_tues"
	elif (currentDay == 2):
		cur.execute("SELECT st_id, scd_wed FROM tbl_students;")
		sched = "scd_wed"
	elif (currentDay == 3):
		cur.execute("SELECT st_id, scd_thur FROM tbl_students;")
		sched = "scd_thur"
	elif (currentDay == 4):
		cur.execute("SELECT st_id, scd_fri FROM tbl_students;")
		sched = "scd_fri"
	elif (currentDay == 5):
		cur.execute("SELECT st_id, scd_sat FROM tbl_students;")
		sched = "scd_sat"
	elif (currentDay == 6):
		cur.execute("SELECT st_id, scd_sun FROM tbl_students;")
		sched = "scd_sun"

	for st_id, sched in cur.fetchall():
		print (st_id, sched)
		
import pymysql
myConnection = pymysql.connect( host=hostname, user=username, passwd=password, db=database )
doQuery( myConnection )
myConnection.close()


