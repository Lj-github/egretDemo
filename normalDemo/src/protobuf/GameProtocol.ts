module gp {
    export function initAllMessage(protoPath: string, cb: Function, tar: any) {

        protobuf.load(protoPath, function (err, root) {
            if (err)
                throw err;
            //gt.setProp(gp,root.nested)
            for (let ket in root.nested) {
                let key: any = ket
                if (root.nested[key] instanceof protobuf.Type) {
                    gp[ket] = root.lookupType(ket)
                } else if (root.nested[key] instanceof protobuf.Enum) {
                    gp[ket] = root.lookupEnum(ket)
                }
            }
            cb.call(tar)
        });

    }
}