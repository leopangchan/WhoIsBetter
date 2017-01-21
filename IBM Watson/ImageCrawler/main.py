import requests
import re
from bs4 import BeautifulSoup
def trade_spider(personsUserName, pathName):
    url = 'https://www.instagram.com/' + personsUserName + '/'
    sourceCode = requests.get(url)
    plain_text = sourceCode.text
    print(plain_text)
    soup = BeautifulSoup(plain_text)
    f = open(pathName, 'w')
    for link in soup.findAll('script', {'type': 'text/javascript'}):
        # href = link.get()
        while (1):
            href = re.search('display_src\"\:\ \"(.+?)\"', str(link))

            if href:
                found = href.group(1)
                print(found)
                f.write(found + '\n')
                newlink = re.search('display_src\"\:\ \"(.+$)', str(link))
                if newlink:
                    link = newlink.group(1)
                else:
                    break
            else:
                break

trade_spider('leopangchan', '/Users/khoanguyen1/Desktop/CPE/Side Projects/whoIsBetter/WhoIsBetter/IBM Watson/ImagesSetOne/ImagesetOne.txt')

