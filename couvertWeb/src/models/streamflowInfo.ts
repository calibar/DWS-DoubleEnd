export class StreamflowInfoModel {
    public Uploader:string;
    public Lon:number;
    public Lat:number;
    public Pic: string;
    public Phototime: string;
    public Description: string;
    public Orientation: string;
    public Area: string;
    public Level: string;
    
	constructor(){
        this.Uploader="";
        this.Lon=null;
        this.Lat=null;
        this.Phototime="";
        this.Pic="";
        this.Description="";
        this.Orientation="";
        this.Area="";
        this.Level="";
    }
}