from lxml.html.clean import Cleaner
import lxml.html
import re

cleaner = Cleaner(javascript=True, style=True)

def remove_markup(content):
    if content:
        try:
            html_elements = lxml.html.document_fromstring(cleaner.clean_html(content))
            text = " ".join(t.strip() for t in html_elements.xpath('//text()'))
            #text = re.sub("(?i)<[.]+>", " ", text).strip()
            return text
        except:
            print("Can't clean up:", content)
    return content

