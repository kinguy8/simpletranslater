import requests
from api.settings import *


def get_translate_text(word, source, translated):
    auth = requests.post(URL_AUTH, headers=headers_auth)
    
    if auth.status_code == 200:
        token = auth.text
        headers_translate = {
                'Authorization': 'Bearer ' + token
            }
        params = {
                'text': word,
                'srcLang': source,
                'dstLang': translated
            }
        r = requests.get(URL_TRANSLATE, headers=headers_translate, params=params)
        res = r.json()
        try:
            return res['Translation']['Translation']
        except:
            print('Не найдено варианта для перевода')
            
