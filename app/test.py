import requests
from bs4 import BeautifulSoup


response = requests.get("https://bombsales.ru/brendovye-sumkiryukzakiklatchikoshelki/koshelki/koshelek-hermes-01/")
# print(response.text)
html = response.text
soup = BeautifulSoup( html, "html.parser" )
res = soup.find(lambda tag:tag.name == "span" and "1 799" in tag.text)
print(res)