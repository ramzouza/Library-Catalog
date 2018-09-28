
class Admin(User):

	def __init__(self,id, password,isActive, firstName, lastName,physicalAddress, email, phoneNumber):
		User.__intit__(self,id, password,isActive, firstName, lastName,physicalAddress, email, phoneNumber)
	
	