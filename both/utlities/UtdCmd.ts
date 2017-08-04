/**
 * Created by Owner on 12/10/2016.
 */
export class UtdCmd {

    private utdRawTrim: string;
    private publicInd: boolean;

    /**
     * may be trimmed or not coming in
     * may has command
     * @param utdRaw
     */
    constructor(
        utdRaw: string,
        publicInd: boolean
    ) {
        //super();
        if (!utdRaw) {
            throw new Error("!utdRaw");
        }
        this.utdRawTrim = utdRaw.trim();
        this.publicInd = publicInd;
    }

    public getUtdRawTrim() {return this.utdRawTrim;}
    public getPublicInd() {return this.publicInd;}
}
