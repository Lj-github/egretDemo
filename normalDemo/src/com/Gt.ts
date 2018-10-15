module gt{
    export const lan_cn = "ch"// 当前先写为中文
    export const lan_en = "en"// 当前先写为中文
    const lan = lan_en
    const isDebug = true

    export let SocketClient:SocketClient
    export let size = {
       // Number(document.getElementsByClassName("egret-player")[0].getAttribute("data-content-width")) ,
       // Number(document.getElementsByClassName("egret-player")[0].getAttribute("data-content-height"))
    }
    export function getLocalContex(id:number):string {
        if (!LC[id] ){
            console.error("没有定义 id = " + id + " 的文字")
            return
        }
        return LC[id][lan]
    }
     export function log(...params) {
        if (isDebug ) {
            return
        } else {
            console.log.apply(console, arguments)
        }
    }
    export enum Color {
        GREEN = 0x24d12c,
        GRAY = 0x949494,
        RED = 0xf4271d,
        WHITE = 0xfffff4,
        GRAY1 = 0x5e5e5e,
        PURPLE = 0xd51ff6,
        PURPLE1 = 0xE300BC,
        ORANGE = 0xf55709,
        BLUE = 0x82c3ff,
        BLACK = 0x153d44,
        BROWN_DEEP = 0x5C3723,
        BROWN_SHALLOW = 0x5B4221,
        YEL_SHALLOW = 0xFEF0C3,
        YELLOW = 0xf9ee12,
      }

    /**
     * 判断是否安装 MetaMask   通过他的 js 文件 判断
     */

    export const metaMaskUrl = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
    export function isInstallMetaMask() {
      // 检查web3是否已经注入到(Mist/MetaMask)
      if (typeof window["web3"]!== 'undefined') {
            // 使用 Mist/MetaMask 的提供者
           // web3js = new Web3(web3.currentProvider);
      } else {
            alert("没有安装 MetaMask")
      }

      // // 现在你可以启动你的应用并自由访问 Web3.js:
      // startApp()

     }
     export function setProp(tgt, props) {
        if (!tgt || !props) {
            return
        }
        for (let key in props) {
            tgt[key] = props[key]
        }
    }
    export function arrayWeighting(arr: Array<any>) {
        let hasMap = {}
        let list1 = []
        arr.forEach((item) => {
            if (!hasMap[item]) {
                list1.push(item)
                hasMap[item] = true
            }
        })
        return list1
    }

    export function isHttps() {
        return  window.location.href.indexOf('https://') == 0
    }





}