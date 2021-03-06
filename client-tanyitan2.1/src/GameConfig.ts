/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameUI from "./script/GameUI"
import GameControl from "./script/GameControl"
import StartView from "./script/start/StartView"
import DropBox from "./script/DropBox"
import Bullet from "./script/Bullet"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=640;
    static height:number=1136;
    static scaleMode:string="fixedwidth";
    static screenMode:string="none";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="start/StartViewSkin.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=false;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("script/GameUI.ts",GameUI);
        reg("script/GameControl.ts",GameControl);
        reg("script/start/StartView",StartView);
        reg("script/DropBox.ts",DropBox);
        reg("script/Bullet.ts",Bullet);
    }
}
GameConfig.init();