import urllib.request
import json

api = ''

def get_repository(query):
    api_key = api
    url = '' + api_key
    locality = query.replace(' ', '%20')
    final_url = url + "&locality=" + locality + "&category=restaurant"
    response = urllib.request.urlopen(final_url).read()
    json_obj = str(response, 'utf-8')
    data = json.loads(json_obj)

    for item in data['objects']:
        print item['name'], item['phone']

    return data
