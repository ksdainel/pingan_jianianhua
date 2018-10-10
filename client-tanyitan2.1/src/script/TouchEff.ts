export default class TouchEff{
    static scaleTime:number = 50;
    
    static segEff(tar){
        //设置组件的中心点
        var target:Laya.Button = tar;
        // target.anchorX = target.anchorY = 0.5;
        //添加鼠标按下事件侦听。按时时缩小按钮。
        target.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmal);
        //添加鼠标抬起事件侦听。抬起时还原按钮。
        target.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
        //添加鼠标离开事件侦听。离开时还原按钮。
        target.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
    }

    static scaleBig(e):void{
        var target = e.target;
        //变大还原的缓动效果
        Laya.Tween.to(target, {scaleX:1,scaleY:1},this.scaleTime);
    }
    static scaleSmal(e):void{
        var target = e.target;
        //缩小至0.8的缓动效果
        Laya.Tween.to(target,{scaleX:0.95,scaleY:0.95},this.scaleTime);
    }
}