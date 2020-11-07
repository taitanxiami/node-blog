#!/bin/sh
cd /Users/shenguanghui/Documents/code/node-blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo '' > access.log
    