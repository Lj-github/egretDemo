# -*- coding: utf-8 -*-
# @Time    : 2018/10/19 下午8:03
import os

import shutil


def mkdir(path):
    path = path.strip()
    path = path.rstrip("\\")
    isExists = os.path.exists(path)
    if not isExists:
        os.makedirs(path)
        return True
    else:
        return False


def copyfile(srcfile, dstfile):
    if not os.path.isfile(srcfile):
        print("%s not exist!" % (srcfile))
    else:
        fpath, fname = os.path.split(dstfile)
        if not os.path.exists(fpath):
            '''创建路径'''
            mkdir(fpath)
        '''复制文件'''
        shutil.copyfile(srcfile, dstfile)
        print("copy %s -> %s" % (srcfile, dstfile))

    # gameprotocol.d.ts  添加
    # import  $protobuf = protobuf
    # declare module gp{
    # 最后一行
    # }



copyfile("/Users/admin/Documents/ljworkspace/local/java/serverDemo/tools/GameProtocol.d.ts",
         "/Users/admin/Documents/ljworkspace/local/cocos/workPro/cocosjsDemo/egretDemo/normalDemo/libs/GameProtocol.d.ts")
copyfile("/Users/admin/Documents/ljworkspace/local/java/serverDemo/proto/GameProtocol.proto",
         "/Users/admin/Documents/ljworkspace/local/cocos/workPro/cocosjsDemo/egretDemo/normalDemo/resource/proto/GameProtocol.proto")

filee = os.path.realpath(__file__)
fpath,fname = os.path.split(filee)

GameProtocoldtsFile = "/Users/admin/Documents/ljworkspace/local/cocos/workPro/cocosjsDemo/egretDemo/normalDemo/libs/GameProtocol.d.ts"
#os.system("sed -i '' '1d' " + GameProtocoldtsFile)
#st = "sed '' '1 i\import$protobuf=protobuf\n\declaremodulegp{\n' " + GameProtocoldtsFile
st = "sed -i '' '1i ddd' " + GameProtocoldtsFile
print(st)
os.system(st)
os.system('echo "}" >> '+ GameProtocoldtsFile)

