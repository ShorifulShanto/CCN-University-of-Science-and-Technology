import urllib.request
import re
import json

url = "https://drive.google.com/drive/folders/1L1dhFtmSFY6CJSWSqQB2AXe0J0hayDnx"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
html = urllib.request.urlopen(req).read().decode("utf-8", errors="ignore")

print("HTML length:", len(html))

# Look for drive items data structures
# In drive folder page, initial data is often stored in AF_initDataCallback
callbacks = re.findall(r"AF_initDataCallback\((\{.*?\})\);", html, re.DOTALL)
print("Callbacks count:", len(callbacks))

# Search for Class 6, Class 7, Class 8, Class 9-10 in text
lines = re.findall(r'.{0,100}Class.{0,100}', html)
for l in lines[:15]:
    print("LINE:", l)
