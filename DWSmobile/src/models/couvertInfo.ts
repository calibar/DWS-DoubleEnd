export class CouvertInfoModel {
    public Uploader:string;
    public LowLon:number;
    public LowLat:number;
    public LowPic: string;
    public HighLon:number;
    public HighLat:number;
    public HighPic: string;
    public Phototime: string;
    public Description: string;
    public Orientation: string;
    
	constructor(){
        this.Uploader="";
        this.LowLon=null;
        this.LowLat=null;
        this.HighLon=null;
        this.HighLat=null;
        this.Phototime="";
        this.LowPic="";
        this.HighPic="";
        this.Description="";
        this.Orientation="";
    }
}
