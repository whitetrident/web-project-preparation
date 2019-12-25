# -*- coding: utf-8 -*-
"""博客构建配置文件
"""

# For Maverick
site_prefix = "/"
source_dir = "../src/"
build_dir = "../dist/"
index_page_size = 10
archives_page_size = 20
enable_jsdelivr = {
    "enabled": False,
    "repo": "whitetrident/web-project-preparation@gh-pages"
}

# 站点设置
site_name = "前端项目的准备工作"
site_logo = "${static_prefix}logo.png"
site_build_date = "2019-12-18T16:51+08:00"
author = "whitetrident"
email = "hi@imalan.cn"
author_homepage = ""
description = "记下个人爬坑经历"
key_words = ['常用工具', '移动端常见bug以及一些小技巧', '移动端项目一些api的封装', '移动端项目一些api的封装', '越坑越强 vue过坑', '自动给js、css增加版本号', 'css-hack', 'css初始化', 'images-convert-min']
language = 'zh-CN'
external_links = [
    {
        "name": "web-project-preparation",
        "url": "https://github.com/whitetrident/web-project-preparation",
        "brief": "前端项目的准备工作"
    }
]
nav = [
    {
        "name": "首页",
        "url": "${site_prefix}",
        "target": "_self"
    },
    {
        "name": "归档",
        "url": "${site_prefix}archives/",
        "target": "_self"
    },
    {
        "name": "关于",
        "url": "${site_prefix}about/",
        "target": "_self"
    }
]

social_links = [
    {
        "name": "GitHub",
        "url": "https://github.com/whitetrident",
        "icon": "gi gi-github"
    }
]

head_addon = r'''
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
'''

footer_addon = ''

body_addon = ''
