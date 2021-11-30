from ping3 import ping

def lamphost(host):
	resp = ping(host)

	if resp == False:
		return False
	else:
		return True