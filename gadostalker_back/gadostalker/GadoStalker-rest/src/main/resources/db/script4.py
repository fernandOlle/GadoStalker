import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="toor",
  database="gadostalkerdb"
)
mycursor = mydb.cursor()

mycursor.execute("Show tables;")
myresult = mycursor.fetchall()

mycursor.execute("SET FOREIGN_KEY_CHECKS=0")

for x in myresult:
    mycursor.execute("TRUNCATE {};".format(x[0]))

mycursor.execute("SET FOREIGN_KEY_CHECKS = 1;")