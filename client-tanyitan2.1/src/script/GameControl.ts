
import DropBox from "./DropBox";
import Bullet from "./Bullet";
/**
 * 游戏控制脚本。定义了几个dropBox，bullet，createBoxInterval等变量，能够在IDE显示及设置该变量
 * 更多类型定义，请参考官方文档
 */
export default class GameControl extends Laya.Script {
    /** @prop {name:dropBox,tips:"掉落容器预制体对象",type:Prefab}*/
    dropBox: Laya.Prefab;
    /** @prop {name:dropBox2,tips:"掉落容器预制体对象",type:Prefab}*/
    dropBox2: Laya.Prefab;
    /** @prop {name:dropBox3,tips:"掉落容器预制体对象",type:Prefab}*/
    dropBox3: Laya.Prefab;
    /** @prop {name:bullet,tips:"子弹预制体对象",type:Prefab}*/
    bullet: Laya.Prefab;
    /** @prop {name:createBoxInterval,tips:"间隔多少毫秒创建一个下跌的容器",type:int,default:1000}*/
    createBoxInterval: number = 1000;
    /**开始时间*/
    private _time: number = 0;
    /**是否已经开始游戏 */
    private _started: boolean = false;
    /**子弹和盒子所在的容器对象 */
    private _gameBox: Laya.Sprite;

    private boxNum=0;

    private boxArr=[];

    private ballArr=[];

    private balllNum=10;

    private currectNumber =0;

    private prefabBox=["dropBox","dropBox2","dropBox3"];

    private posArr=[[100,410],[280,410],[480,410],[100,588],[280,588],[480,588],[100,725],[280,725],[480,725],[100,890],[280,890],[480,890]];
    private posArrWait=[];

    constructor() { super(); }

    onAwake(): void {
        console.log("onEnable onAwake gameControl");
        this._time = Date.now();
        this._gameBox = this.owner.getChildByName("gameBox") as Laya.Sprite;
        //this.createBox();
        this.startCreatBox();
    }

    initGame(balllNum){
        console.log("initGame"+ balllNum);
        this.balllNum = balllNum;
        this.currectNumber = 0;
        this._started = false;
        this.enabled = false;
    }

    startCreatBox(){
        console.log("startCreatBox");
        if(this.boxArr.length>0){
            for(var i=this.boxArr.length-1;i>=0;i--){
                var box = this.boxArr[i];
                box.removeSelf();
            }
            this.boxArr=[];
            this.boxNum=0;
        }
        this.posArrWait =  this.posArr.concat();
        for(var i = 0; i<12;i++){
            this.createBox();
        }
    }

    onUpdate(): void {
        //每间隔一段时间创建一个盒子
        let now = Date.now();
        if (now - this._time > this.createBoxInterval) {
            this._time = now;
            if(this.boxNum>10){
                return;
            }
            //this.createBox();
        }
    }

    createBox(): void {
        //使用对象池创建盒子
        console.log("产生一个盒子")
        this.boxNum++;
        var boxData = this.prefabBox[Math.floor(Math.random()*this.prefabBox.length)];
        var poolName:string = boxData;
        var boxEntiy: Laya.Prefab= this[poolName];
        let box: Laya.Sprite = Laya.Pool.getItemByCreateFun(poolName, boxEntiy.create, boxEntiy);
        var pos = this.posArrWait.shift();
        var _x =pos[0];
        var _y = pos[1];
        var sc = Math.random()*4+0.6;
        // box.scale(sc,sc);
        //box.pos(Math.random() * (Laya.stage.width - 100),(Math.random()*400+400 ));
        box.pos(_x,_y);
        this._gameBox.addChild(box);
        this.boxArr.push(box);
    }

    onStageClick(e: Laya.Event): void {
        //停止事件冒泡，提高性能，当然也可以不要
        //e.stopPropagation();
        //舞台被点击后，使用对象池创建子弹
        // let flyer: Laya.Sprite = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
        // flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        // this._gameBox.addChild(flyer);
         console.log("点击了一下",Laya.stage.mouseX, Laya.stage.mouseY);
        
    }

    private creatBall(){
        console.log("产生一个球"+this.currectNumber);
        if(this.currectNumber>=this.balllNum) return;
        let flyer: Laya.Sprite = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
        flyer.pos(594,927);
        flyer.rotation=0;
        this._gameBox.addChild(flyer);
        this.ballArr.push(flyer);
        var rig: Laya.RigidBody = flyer.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: 0 });
            rig.type = "kinematic";
        // Laya.Tween.to(flyer,{y:200},200,null,Laya.Handler.create(this,function(){
        //     var rig: Laya.RigidBody = flyer.getComponent(Laya.RigidBody);
        //     rig.setVelocity({ x: 0, y: -50 });
        // }));
        var timeLine = new Laya.TimeLine();
        timeLine
            .addLabel("rabbite11", 0).to(flyer, { x:576,y:250 }, 100, null, 0)
            .addLabel("rabbite12", 1).to(flyer, { x:550,y:157 }, 50, null, 0)
            .addLabel("rabbite13", 2).to(flyer, { x:500,y:97 }, 50, null, 0)
            .addLabel("rabbite14", 3).to(flyer, { x:370,y:53 }, 50, null, 0);
        timeLine.on(Laya.Event.COMPLETE,this,this.shot,[flyer]);
        timeLine.play(0, false);
        this.currectNumber++;
        Laya.timer.once(100,this,this.creatBall);
    }
    private shot(flyer){
        // var flyer = flyerA[0];
        var rig: Laya.RigidBody = flyer.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: -30, y: -5 });
            rig.type = "dynamic";
    }

    private TweenComplete(){

    }

    pause(){
        for(var i=0;i<this.ballArr.length;i++){
            var flyer = this.ballArr[i];
            var rig: Laya.RigidBody = flyer.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: 0 });
            rig.type = "static";
        }
    }
    repause(){
        for(var i=0;i<this.ballArr.length;i++){
            var flyer = this.ballArr[i];
            var rig: Laya.RigidBody = flyer.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: 0 });
            rig.type = "dynamic";
        }
    }

    /**开始游戏，通过激活本脚本方式开始游戏*/
    startGame(): void {
        if (!this._started) {
            this._started = true;
            this.enabled = true;
            Laya.timer.once(100,this,this.creatBall);
        }
    }

    /**结束游戏，通过非激活本脚本停止游戏 */
    stopGame(): void {
        console.log("stop control");
        this._started = false;
        this.enabled = false;
        this.createBoxInterval = 1000;
        this._gameBox.removeChildren();
    }
}