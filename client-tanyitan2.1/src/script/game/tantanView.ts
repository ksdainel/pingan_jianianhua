import { ui } from "../../ui/layaMaxUI";
import GameControl from "../GameControl"
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class tantanView extends ui.game.GameViewSkinUI {
    /**设置单例的引用方式，方便其他类引用 */
    /**当前游戏积分字段 */
    private _score: number;
    /**游戏控制脚本引用，避免每次获取组件带来不必要的性能开销 */
    private _control: GameControl;

    private Mparent:any;

    constructor(parent) {
        super();
        //关闭多点触控，否则就无敌了
        Laya.MouseManager.multiTouchEnabled = false;
        this.Mparent = parent;
        this._control = this.getComponent(GameControl);
    }

    onEnable(): void {
        console.log("onEnable tantan")
        //点击提示文字，开始游戏
       // this.sp_yindao.on(Laya.Event.CLICK, this, this.onTipClick);
        this.sp_pause.on(Laya.Event.CLICK, this, this.pauseGame);
        this.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
        this.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
        //this.on(Laya.Event.MOUSE_OVER, this, this.onTouchUp);
        //this.on(Laya.Event.MOUSE_OUT, this, this.onTouchUp);
    }
   

    onTipClick(e: Laya.Event): void {
        console.log("点击开始游戏");
        this.sp_yindao.visible = false;
        this._score = 0;
        this.scoreLbl.text = "";
        //this._control.startGame();
    }
    /**初始化 */
    initGame(ballNum){
        this.touchT=0;
        this.isInTouch = false;
        this.isTouchEnd = false;
        this.ganSpeed = 0;
        this._control.initGame(ballNum);
        this.sp_ganBall.visible = true;
        
    }
    
    private touchT=0;
    private isInTouch = false;
    private isTouchEnd = false;
    private ganSpeed = 0;
    private onTouchDown(){
        console.log("按下"+this.isInTouch+this.isTouchEnd);
        if(this.isInTouch||this.isTouchEnd){
            return;
        }

        this.isInTouch = true;
        console.log("按下");
        this.sp_yindao.visible = false;
        this.touchT = Date.now();

        this.ganSpeed=1;
        Laya.timer.loop(30,this,this.onUpdate);
    }

    private onTouchUp(){
        if(this.isTouchEnd){
            return;
        }
        console.log("抬起");
        this.isInTouch = false;
        this.isTouchEnd = true;
        var now =  Date.now();
        var timeDeff = now - this.touchT;
        this.ganSpeed=0;
        Laya.timer.clear(this,this.onUpdate);
        Laya.Tween.to(this.sp_gan,{y:948},80,null,Laya.Handler.create(this,this.starrtShot));
    }

    private onUpdate(): void {
        //每间隔一段时间创建一个盒子
        console.log("更新");
        if(this.isInTouch){
            if(this.sp_gan.y<1000){
                this.sp_gan.y+=this.ganSpeed;
            }
        }
    }
    private starrtShot(){
        this.sp_ganBall.visible = false;
       this._control.startGame();
    }

  

    /**停止游戏 */
    stopGame(): void {
        console.log("结束游戏");
        // this.tipLbll.visible = true;
        // this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
        this._control.stopGame();
    }

    pauseGame(){
        console.log("暂停游戏");
        this.Mparent.openPause();
        // Laya["Physics"] && Laya["Physics"].I.stop();
        this._control.pause();
    }
    rePause(){
        // Laya["Physics"] && Laya["Physics"].enable();
        console.log("继续游戏");
        // Laya["Physics"] && Laya["Physics"].I.start({gravity:10});
        this._control.repause();
    }
}