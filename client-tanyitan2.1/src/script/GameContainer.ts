import GameControl from "./GameControl";
import StartView from "./start/StartView";
import LotteryView from "./lottery/LotteryView";
import GameView from "./game/GameView";
import GameData from "./GameData";

var _gameData = GameData;
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameContainer extends Laya.Sprite {
    /**设置单例的引用方式，方便其他类引用 */
    // static instance: GameUI;
    /**当前游戏积分字段 */
    private _score: number;
    /**游戏控制脚本引用，避免每次获取组件带来不必要的性能开销 */
    private _control: GameControl;

    private _startView:StartView;

    private _lotteryView:LotteryView;

    private _gameView:GameView;


    constructor() {
        super();
        //GameUI.instance = this;
        //关闭多点触控，否则就无敌了
        Laya.MouseManager.multiTouchEnabled = false;

        console.log("gameScence");
    }

    onEnable(): void {
        console.log("onEnable");
        if(window.document.body.clientHeight>window.document.body.clientWidth){
            _gameData.Screen_H_W_Ratio = window.document.body.clientHeight/window.document.body.clientWidth;
        }else{
            _gameData.Screen_H_W_Ratio = window.document.body.clientWidth/window.document.body.clientHeight;
        }
        console.log("屏幕长宽比："+_gameData.Screen_H_W_Ratio );

        
        // this._control = this.getComponent(GameControl);
        
        //点击提示文字，开始游戏
       
        this.openStart();
        //this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
    }

    onTipClick(e: Laya.Event): void {
        // this.tipLbll.visible = false;
        // this._score = 0;
        // this.scoreLbl.text = "";
        // this._control.startGame();
    }

    /**增加分数 */
    addScore(value: number = 1): void {
        // this._score += value;
        // this.scoreLbl.changeText("分数：" + this._score);
        // //随着分数越高，难度增大
        // if (this._control.createBoxInterval > 600 && this._score % 20 == 0) this._control.createBoxInterval -= 20;
    }

    /**停止游戏 */
    stopGame(): void {
        // this.tipLbll.visible = true;
        // this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
        // this._control.stopGame();
    }
    openStart(){
        this._startView = new StartView(this);
        this.addChild(this._startView);
    }

    openGame(ballNum){
        this._startView.destroy();
        this._gameView = new GameView(this);
        this.addChild(this._gameView);
        this._gameView.onStartGame(ballNum);
    }

    openLottery(){
        this._lotteryView = new LotteryView(this);
        this.addChild(this._lotteryView);
    }
}