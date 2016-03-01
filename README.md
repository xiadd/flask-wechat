这是一个flask开发微信公众号的代码仓库
实现的功能是回复关键字得到网盘链接
使用mongodb存储

```python
from libs.weixin import weixin
wechat=weixin(<yourToken>)# 初始化
```
大部分功能还没有实现，access_token使用flask的文件缓存进行存储
