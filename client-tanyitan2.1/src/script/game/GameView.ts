import { ui } from "../../ui/layaMaxUI";
import PauseView from "./PauseView";
import OverView from "./OverView";
import tantanView from "./tantanView";
export default class GameView extends  Laya.Sprite{
    /**设置单例的引用方式，方便其他类引用 */
    static instance: GameView;
    /**当前游戏积分字段 */
    private _score: number=0;
    /**游戏控制脚本引用，避免每次获取组件带来不必要的性能开销 */
    private _tantanView:any;
    private _pauseView:any;
    private _overView:any;
    private Mparent:any;

    private balllNum=10;

    private dropNum =0;

    constructor(parent) {
        super();
        //关闭多点触控，否则就无敌了
        this.Mparent = parent;
        GameView.instance = this;
        
    }

    onEnable(): void {
        //点击提示文字，开始游戏
        console.log("打开游戏");
        
    }
      /**增加分数 */
      addScore(value: number = 1): void {
        this._score += value;
        this._tantanView.scoreLbl.changeText("" + this._score);
        //随着分数越高，难度增大
       // if (this._control.createBoxInterval > 600 && this._score % 20 == 0) this._control.createBoxInterval -= 20;
    }

    onStartGame(ballNum){
        this.balllNum = ballNum;
        this.dropNum = 0;
        this.openTanTan();
        this.initGame();
    }

    /**球掉落 */
    dropBall(){
        console.log("掉落"+this.dropNum+"==="+this.balllNum);
        this.dropNum++;
        if(this.dropNum>=this.balllNum){
            this.openOver(this._score);
        }
    }

    openTanTan(){
        this._score=0;
        this._tantanView = new tantanView(this);
        this.addChild(this._tantanView);
        // this._tantanView._control.startCreatBox();
    }

    openPause(){
        this._pauseView = new PauseView(this);
        this.addChild(this._pauseView);
    }

    rePause(){
        this._tantanView.rePause();
    }

    openOver(score){
        console.log("open over"+score);
        this._overView = new OverView(this);
        this.addChild(this._overView);
        this._overView.openUI(score);
    }
    /**初始化 */
    private initGame(){
        this._tantanView.initGame(this.balllNum);
        this.dropNum=0;
        this._score=0;
        this._tantanView.scoreLbl.changeText("" + this._score);
    }

    /**重新开始 */
    retry(){
        // this._tantanView.destroy();
        // this._tantanView = null;
        // this.openTanTan();
        this.initGame();
        this._tantanView._control.startCreatBox();
    }
}