#!/usr/bin/python

import sys
import requests
import re
from bs4 import BeautifulSoup
def getURL(personsUserName, pathName):
    url = 'https://www.instagram.com/' + personsUserName + '/'
    sourceCode = requests.get(url)
    plain_text = sourceCode.text
    soup = BeautifulSoup(plain_text)
    f = open(pathName, 'w')
    for link in soup.findAll('script', {'type': 'text/javascript'}):
        # href = link.get()
        while (1):
            href = re.search('display_src\"\:\ \"(.+?)\?ig', str(link))

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

def main(argv1, argv2):
    print( "I'm proessing "+ argv1 + "to dir" + argv2 + "in python")
    getURL(argv1, argv2)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
