var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Chain {
    constructor(context) {
        this.link = null;
        this.context = context;
    }
    add(request, callback = () => null) {
        const priv = this.link;
        this.link = new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                yield priv;
                yield new Promise(request)
                    // Can had callback params, why not
                    .then(() => {
                    callback();
                    resolve(null);
                })
                    .catch(() => {
                    console.error('Missing resolve in the request function.');
                    callback();
                    reject();
                });
            });
        });
        return this.context;
    }
}
