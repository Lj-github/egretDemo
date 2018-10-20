var gp;
(function (gp) {
    function initAllMessage(protoPath, cb, tar) {
        protobuf.load(protoPath, function (err, root) {
            if (err)
                throw err;
            //gt.setProp(gp,root.nested)
            console.log(root);
            var _loop_1 = function (ket) {
                var key = ket;
                if (root.nested[key] instanceof protobuf.Type) {
                    pb[ket] = root.lookupType(ket);
                    gp[ket] = function () {
                        return { "msdID": root["MSG_HEADER"][key] };
                        //return {}
                    };
                }
                else if (root.nested[key] instanceof protobuf.Enum) {
                    pb[ket] = root.lookupEnum(ket);
                }
            };
            for (var ket in root.nested) {
                _loop_1(ket);
            }
            cb.call(tar);
        });
    }
    gp.initAllMessage = initAllMessage;
})(gp || (gp = {}));
