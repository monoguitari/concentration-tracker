from bs4 import BeautifulSoup
import requests

def get_page(url):
    response = requests.get(url)
    return response.text

page_to_scrape = requests.get('https://bulletin.brown.edu/the-college/concentrations/comp/')
soup = BeautifulSoup(page_to_scrape.content, 'html.parser')
headers = soup.find_all('span', class_='areaheader')
td = soup.find_all('td', attrs={'colspan': '2'})
# print(headers)
# for header in headers:
#     print(header.text)
table = soup.find_all('table', class_='sc_courselist')
for datum in table:
    print(datum.text)

def get_table():
    return table
'''
Findings:
data-sisprogram to see if ScB vs AB

'''
