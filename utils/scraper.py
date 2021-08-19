import requests
from bs4 import BeautifulSoup
import re
import json

news = {}

def getNews(strDate):
	base_site = f'https://www.inquirer.net/article-index/?d={strDate}'

	headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
	response = requests.get(base_site, headers=headers)
	html = response.content

	soup = BeautifulSoup(html, "lxml")

	div_tag = soup.find('div', id='index-wrap')
	ul_tags = div_tag.find_all('ul')


	li_tags = []
	for ul in ul_tags:	
		li_tags.extend(ul.find_all('li'))

	newsList = []
	for li in li_tags:
		title = li.find('a').get('title')
		link = li.find('a').get('href')
		match = re.search("COVID|covid|cases|vaccines|vaccination", title)
		if(match):
			# print(title)
			# print(link)
			newsList.append({
				"news_title": title,
				"news_link": link,
				"news_source": "Inquirer"
			})

	news[strDate] = newsList

# Main function 
day = 1
startDate = f'2020-12-{day}'

while day < 32:
	strDate = f'2020-12-{day}'
	if(len(str(day)) == 1):
		strDate = f'2020-12-0{day}'
	getNews(strDate)
	day = day + 1

endDate = f'2020-12-{day-1}'
# Write as json file
with open(f'news_events_{startDate}_{endDate}.json', 'w') as json_file:
	json.dump(news, json_file)