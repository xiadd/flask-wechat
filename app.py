from flask import Flask,request,session
from werkzeug.contrib.cache import SimpleCache
from libs.weixin import weixin
from pyquery import PyQuery as pq
from datetime import timedelta
from pymongo import MongoClient
import requests
import random
import os

client = MongoClient()
app=Flask(__name__)

cache = SimpleCache()
collection = client.movie.movie



wechat=weixin('qbtest')
access_token=wechat.get_access_token()
cache.set('access_token',access_token,7200)

@app.route('/wechat',methods=['GET','POST'])
def index():
    if cache.get('access_token') is None:
        cache.set('access_token',wechat.get_access_token(),7200)

    print cache.get('access_token')

    if request.method=='GET':
        return wechat.auth()
    else:
        reply=wechat.get_info_details('content')
        search_result=collection.find_one({'name':reply})
        if search_result is not None:
            return wechat.passive_reply(search_result['url'][random.randint(0,9)])

        query_site='http://www.wangpansou.cn/s.php?wp=0&op=&ty=gn&op=gn&q=%s'
        r=requests.get(query_site % reply).text
        query_result=pq(r)
        format_result=query_result('.cse-search-result_content_item_top_a')
        result_link=[]
        for i in format_result:
            new_item=pq(i).attr('href')
            result_link.append(new_item)
        collection.insert_one({'name':reply,'url':result_link})
        return wechat.passive_reply(result_link[random.randint(0,9)])

if __name__ == '__main__':
    app.run(debug=True,port=3000)
