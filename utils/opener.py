day = 1

strDate = f'2021-08-{day}'

while day < 15:
	strDate = f'2021-08-{day}'
	if(len(str(day)) == 1):
		strDate = f'2021-08-0{day}'
	print(strDate)
	day = day + 1