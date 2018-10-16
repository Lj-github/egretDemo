
declare module gp{
    // 活动详情
     module NetMessageCmd {
         enum  values
        {
            AwesomeMessage = 1000,
            AwesomeMessage22 = 1002
        }

    }



    class _AwesomeMessage extends protobuf.Type {
        awesomeField?:string
    }
    var AwesomeMessage:_AwesomeMessage;
    class _AwesomeMessage22 extends protobuf.Type {
        test:string;
    }
    var AwesomeMessage22:_AwesomeMessage22;

}
