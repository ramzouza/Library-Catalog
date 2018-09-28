def makeMsg(msg="", status=500, obj=[]):
	import requests
	codeStr = requests.status_codes._codes[status]
	return {"message": str(msg), "status": codeStr[0].upper(), "code": status, "data": obj} , status
