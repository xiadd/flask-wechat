# coding:utf-8
from flask import request,make_response
import hashlib
import time
import xml.etree.ElementTree as ET
import json
import requests

class weixin():
    def __init__(self,token):
        self.token=token
        self.appId='yourappid'
        self.appSecret='yourappsecret'

    def auth(self):
        query=request.args
        signature = query.get('signature', '')
        timestamp = query.get('timestamp', '')
        nonce = query.get('nonce', '')
        echostr = query.get('echostr', '')
        s = [timestamp, nonce, self.token]
        s.sort()
        s = ''.join(s)
        if ( hashlib.sha1(s).hexdigest() == signature ):
            return make_response(echostr)

    def get_access_token(self):
        token_url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s'
        access_token=json.loads(requests.get(token_url % (self.appId,self.appSecret)).text)['access_token']
        return access_token

    def passive_reply(self,reply_content):
        xml_reply = ET.fromstring(request.data)
        to_user_name=xml_reply.find('ToUserName').text
        from_user_name=xml_reply.find('FromUserName').text

        reply = "<xml><ToUserName><![CDATA[%s]]></ToUserName><FromUserName><![CDATA[%s]]></FromUserName><CreateTime>%s</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[%s]]></Content><FuncFlag>0</FuncFlag></xml>"

        response = make_response( reply % (from_user_name, to_user_name, str(int(time.time())), reply_content ) )
        return response

    def get_info_details(self,detail):
        xml_reply = ET.fromstring(request.data)
        if xml_reply.find('Event').text=='subscribe':

        details={'openId':xml_reply.find('FromUserName').text,'content':xml_reply.find('Content').text}
        return details.get(detail)

    def custome_menu(self,token,menu):
        request_url='https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s'
        r=requests.post(request_url%token,json=menu)

    def get_user_info(self,token,id):
        request_url='https://api.weixin.qq.com/cgi-bin/user/info?access_token=%s&openid=%s&lang=zh_CN'
        r=requests.post(request_url %(token,id))
        return json.loads(r.text)

    def get_batch_users_info(self,data):
        pass#TODO

    def subscribe_event(self,reply_content):
        pass
