export default  class GameData{
    public static Screen_H_W_Ratio: number = 1.7;
    public static gameState:number=0;//游戏状态
    public static gameInfo:any;
    public static recvMsgId =0;
    public static gamecomda="";
    public static init(){
      //  console.log("初始游戏数据");
       
    }
    public static getFruitSceneSize(){
        var ww = Laya.stage.designWidth;
        var hh = Laya.stage.designHeight;
        var size={
            width: ww,
            height:hh
        };
        return size;
    }
}
