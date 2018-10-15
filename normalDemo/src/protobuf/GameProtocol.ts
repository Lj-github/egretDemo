module gp{

     export function initAllMessage(protoPath:string,cb:Function,tar:any) {

        protobuf.load(protoPath, function (err, root) {
            if (err)
                throw err;
            // Obtain a message type
            // 不使用id  使用消息名字吧
           // var AwesomeMessage = root.lookupType("AwesomeMessage22"); // 需要package   和那个 消息名字 对应起来  就可以
            //所有可以压缩的 然后 就是  key value
            gt.setProp(gp,root.nested)
            cb.call(tar)
            // // Exemplary payload
            // var payload = {test: "test"};
            // // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
            // var errMsg = AwesomeMessage.verify(payload);
            // if (errMsg)
            //     throw Error(errMsg);
            // // Create a new message
            // var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
            // console.log('message', message)
            // // Encode a message to an Uint8Array (browser) or Buffer (node)
            // var buffer = AwesomeMessage.encode(message).finish();
            // // ... do something with buffer
            // console.log('buffer', buffer)  // 给服务器发送 这个
            // // Decode an Uint8Array (browser) or Buffer (node) to a message
            // var message = AwesomeMessage.decode(buffer); // 接受的是这个
            // // ... do something with message
            // console.log('message', message)
            // // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
            // // Maybe convert the message back to a plain object
            // var object = AwesomeMessage.toObject(message, {
            //     longs: String,
            //     enums: String,
            //     bytes: String,
            //     // see ConversionOptions
            // });
            // console.log('object', object)
        });

    }








}