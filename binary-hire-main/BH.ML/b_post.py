from pyresparser import ResumeParser
import requests
import re
from bs4 import BeautifulSoup
from tqdm import tqdm
import json
import sys
import logging
def process_input(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    # print(soup.prettify())

    skills = soup.find_all('div', class_='ck-edit-desc')

    summery = soup.find('div', class_='summery-info')

    job_details_info = soup.find('div', class_='job-details-info')

    content_div = job_details_info.find('div', class_='content')
    title = content_div.find('h4', class_='title')

    # for skillName in skills:
    #     print(skillName.get_text())


    post = summery.get_text()

    data = ResumeParser(skills[0].get_text(),True).get_extracted_data()
    cleaned_text = ' '.join(post.split('\n'))
    cleaned_text = re.sub(r':\s+', ': ', cleaned_text)

    # Convert cleaned text to dictionary
    job_details = {}
    job_details["Title"] = title.get_text()
    job_details["Description"] = skills[0].get_text()
    for pair in cleaned_text.split('  '):
        if ':' in pair:
            key, value = map(str.strip, pair.split(':', 1))
            key = ''.join(key.split(' '))
            job_details[key] = value

    job_details["Skills"] = data["skills"]
    experience_text = job_details.get("Experience", "")
    experience_match = re.match(r"Required (\d+) to (\d+) Year\(s\)", experience_text)

    if experience_match:
        min_experience, max_experience = map(int, experience_match.groups())
        job_details["MinExperience"] = min_experience
        job_details["MaxExperience"] = max_experience
        del job_details["Experience"]
    print(json.dumps(job_details))
    sys.stdout.flush()

if len(sys.argv) > 1:
    input_from_csharp = sys.argv[1]
    process_input(input_from_csharp)
else:
    print("No input provided from C#.")