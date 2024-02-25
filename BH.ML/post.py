import requests
from bs4 import BeautifulSoup
import csv
from tqdm import tqdm
import time
# url="https://www.myjobs.com.bd/job-details/5309"
url="https://www.myjobs.com.bd/job-details/5282"
page = requests.get(url)
soup = BeautifulSoup(page.content, "html.parser")
# print(soup.prettify())

skills = soup.find_all('div', class_='ck-edit-desc')

title = soup.find('div', class_='summery-info')

# for skillName in skills:
#     print(skillName.get_text())

print(skills[0].get_text())
print(title.get_text())