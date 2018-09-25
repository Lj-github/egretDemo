// TypeScript file
declare module pako{
    function inflate(a):any;
}

interface Math {
    uuid(numA):string;
}


interface String {
    repeat(a:number):string;
    startsWith(a:string,b:number):boolean
    endsWith(a:string,b:number):boolean
    contains(a:string,b:number):boolean
    toArray():Array<any>;
    format(...args):string
    parseUrl():any;
    contains():number;
    reverse():string;
}

interface Window{
    XMLHttpRequest:any;
    ActiveXObject:any;
}