import pymysql
connection = pymysql.connect(host='18.221.83.136',user='soen343',passwd='ribalestbeau',db='mysql',port=3306)
cursor = connection.cursor()
sql=("")
cursor.execute(sql)
connection.commit()
data=cursor.fetchall()
print(data)
