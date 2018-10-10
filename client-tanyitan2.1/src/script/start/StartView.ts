
import { ui } from "../../ui/layaMaxUI";
import RuleView from "./RuleView";
import SignView from "./SignView";
import TouchEff from "../TouchEff";
export default class StartView extends  Laya.Sprite{
    public constructor(parent) {
        super();
        this.thisDisplay = new ui.start.StartViewSkinUI();
        this.addChild(this.thisDisplay);
        this._Mparent = parent;
        console.log("添加显示start");
    }
    private thisDisplay: ui.start.StartViewSkinUI;
    private _Mparent:any;
    private ruleView;
    private signView;

    private ballNum=10;

    private startInfo: any; //首页相关信息
    //private myConncet: iugame.MyConnect; 
    
    onEnable(): void {
        console.log("onEnable start");
        this.fitSceen();
        this.startAni();
        //点击提示文字，开始游戏
        TouchEff.segEff(this.thisDisplay.btn_share);
        TouchEff.segEff(this.thisDisplay.btn_rule);
        TouchEff.segEff(this.thisDisplay.btn_start);
        TouchEff.segEff(this.thisDisplay.btn_lottery);
        this.thisDisplay.btn_rule.on(Laya.Event.CLICK, this, this.openRule);
        this.thisDisplay.btn_start.on(Laya.Event.CLICK, this, this.openGame);
        this.thisDisplay.btn_share.on(Laya.Event.CLICK, this, this.gotoShare);
        this.thisDisplay.btn_lottery.on(Laya.Event.CLICK, this, this.openLottery);
        this.openSign();
        this.updateData();
    }
    /**屏幕适配 */
    private fitSceen() {
        
        // console.log("长宽比" + GameData.Screen_H_W_Ratio);
        // if (GameData.Screen_H_W_Ratio < 1.4) {
        //     this.thisDisplay.box_head.y = -10;
        //     this.thisDisplay.box_bottom.y = -180;
            
        // } else if (GameData.Screen_H_W_Ratio < 1.5) {
        //     this.thisDisplay.box_head.y = -10;
        //     this.thisDisplay.box_bottom.y = -160;
        // } else if (GameData.Screen_H_W_Ratio < 1.6) {
        //     this.thisDisplay.box_head.y = -5;
        //     this.thisDisplay.box_bottom.y = -140;

        // } else if (GameData.Screen_H_W_Ratio < 1.7) {
        //     this.thisDisplay.box_bottom.y = -100;
        // }
    }
    private timeLine: Laya.TimeLine;

    /**开场动画 */
    private startAni() {
        this.thisDisplay.lab_addScore.visible = false;
        //this.anPivot(this.thisDisplay.img_title);
        //this.thisDisplay.btn_goldweek.rotation=0;
        // this.timeLine = new Laya.TimeLine();
        // this.timeLine
        //     .addLabel("rabbite11", 0).to(this.thisDisplay.img_box, { rotation:5 }, 50, Laya.Ease.backOut, 2000)
        //     .addLabel("rabbite11", 0).to(this.thisDisplay.img_box, { rotation:-5 }, 100, Laya.Ease.backOut, 0)
        //     .addLabel("rabbite11", 0).to(this.thisDisplay.img_box, { rotation:5 }, 100, Laya.Ease.backOut, 0)
        //     .addLabel("rabbite11", 0).to(this.thisDisplay.img_box, { rotation:-5 }, 100, Laya.Ease.backOut, 0)
        //     .addLabel("rabbite11", 0).to(this.thisDisplay.img_box, { rotation:-0 }, 50, Laya.Ease.backOut, 0)
        //     .addLabel("rabbite11", 0).to(this.thisDisplay.img_box, { scaleX: 1.5, scaleY: 1.5 }, 200, Laya.Ease.backOut, 300)
        //     .addLabel("rabbite12", 0).to(this.thisDisplay.img_box, { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.backIn, 500)
        // this.timeLine.play(0, true);

        // // this.thisDisplay.flag.play();
        // this.thisDisplay.flag1.play();
        // this.thisDisplay.flag2.play();

        // this.thisDisplay.img_stairs.y = 1707;
        // this.thisDisplay.img_cloud.scale(0, 0);
        // this.thisDisplay.img_tower.scale(0, 0);
        // this.thisDisplay.img_title.scale(0, 0);
        // this.thisDisplay.img_climb.scale(0, 0);
        // this.thisDisplay.btn_climb.scale(0, 0);
        // this.thisDisplay.btn_share.scale(0, 0);

    
        // Laya.Tween.to(this.thisDisplay.img_cloud, { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.backOut, null, 200);
        // Laya.Tween.to(this.thisDisplay.img_tower, { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.backOut, null, 600);
        // Laya.Tween.to(this.thisDisplay.img_title, { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.backOut, null, 800);
        // Laya.Tween.to(this.thisDisplay.btn_climb, { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.backOut, null, 900);
        // Laya.Tween.to(this.thisDisplay.img_climb, { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.backOut, null, 950);
        // Laya.Tween.to(this.thisDisplay.btn_share, { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.backOut, null, 1000);
    }

    /**更新数据 */
    private updateData(){
        var timeLine = new Laya.TimeLine();
        timeLine
            .addLabel("rabbite11", 0).to(this.thisDisplay.lab_ballNum, {scaleX:1.3,scaleY:1.3}, 200, Laya.Ease.backOut, 0)
            .addLabel("rabbite11", 0).to(this.thisDisplay.lab_ballNum, {scaleX:1,scaleY:1}, 200, Laya.Ease.backOut, 0);
        timeLine.play(0, false);
        this.thisDisplay.lab_ballNum.text = this.ballNum+"";
    }

    private openRule(){
        console.log("点击规则按钮");
        this.ruleView = new RuleView(this);
        this.addChild(this.ruleView);
    }

    private openSign(){
        console.log("sing");
        this.signView = new SignView(this);
        this.addChild(this.signView);
        
    }

    private openGame(){
        this._Mparent.openGame(this.ballNum);
    }

    private openLottery(){
        this._Mparent.openLottery();
    }

    private gotoShare(){
        console.log("分享");
        this.thisDisplay.lab_addScore.visible = true;
        // this.thisDisplay.lab_addScore.scale(3,3);
        // Laya.Tween.to(this.thisDisplay.lab_addScore,{scaleX:0,scaleY:0},200,null,Laya.Handler.create(this,this.addBall));
        var timeLine = new Laya.TimeLine();
        timeLine
            .addLabel("rabbite11", 0).to(this.thisDisplay.lab_addScore, {scaleX:5,scaleY:5,alpha:0.8}, 200, Laya.Ease.backOut, 0)
            .addLabel("rabbite11", 0).to(this.thisDisplay.lab_addScore, {scaleX:0.5,scaleY:0.5}, 200, Laya.Ease.backOut, 200);
        timeLine.play(0, false);
        timeLine.on(Laya.Event.COMPLETE,this,this.addBall);
    }

    private addBall(){
        this.thisDisplay.lab_addScore.visible = false;
        this.ballNum+=5;
        this.updateData();
    }

//     //=============调用接口====================
//     private login() {
//         console.log("login");
// // succ	Boolean	是		调用是否成功	
// // err	String	否	255	错误信息	succ=false时，有出错信息
// // ball_count	Integer	否	10	球的数量	
// // isFirstLogin	Boolean	是		是否首次登陆	isFirstLogin

//         if (!this.myConncet) {
//             this.myConncet = new iugame.MyConnect();
//         }
//         this.myConncet.login(App.CommonlyData.openId, this.querBack, this);
//     }
//     private querBack(err, res) {
//         console.log("querBack" + err);
//         console.log(res);
//         if (err) {
//             // console.log(err);
//             //alert("请检查您的网络是否通畅");
//             App.ViewManager.open(ViewConst.plan_warm,"请检查您的网络是否通畅");
//             var msg = "请检查您的网络是否通畅";
//            // App.ViewManager.open(ViewConst.Plan_message, "", msg);
//             return;
//         }
//         if (res.haha) {
//             //alert("签名验证失败");
//             return;
//         }
//         if (!res.succ) {
//             // console.log(err);
//             //alert("登陆失败，服务器维护中。。。");
//             var msg = "登陆失败,服务器维护中。。。";
//             //App.ViewManager.open(ViewConst.Plan_message, "", msg);
//             return;
//         } else {
//             //返回成功，且有效
//             this.startInfo = res;
//             this.updateStartUi(res)
//         }
//     }
//     //=============调用接口====================
//     //更新页面的放到
//     private updateStartUi(res) {
//         var self = this;
//        this.thisDisplay.lab_ballCount.text = "今日保卫球："+res.ball_count;
//     }
//     //
//     private startGame(){
//         App.SoundManager.playSound("sound/butom.mp3");
//         App.SceneManager.runScene(SceneConsts.Game);
//     }

//     //打开游戏说明
//     private openRul() {
//         App.SoundManager.playSound("sound/butom.mp3");

//         App.ViewManager.open(ViewConst.Start_instrunt);
//     }
//     //打开我的礼包
//     private openGift() {
//         App.SoundManager.playSound("sound/butom.mp3");
        
//         var url="";
//         window.location.href = url;
//         }

//         // 去抽奖
//     private gotoLottery() {
//         App.SoundManager.playSound("sound/butom.mp3");

//         var url="";
//         window.location.href = url;

//     }
    


//     //分享==========
//     private gotoShare() {
//         App.SoundManager.playSound("sound/butom.mp3");
//         // if (this.startInfo.oday_shared_flag) {
//         //     console.log("今日已经分享过了");
//         //     return;
//         // }
        
//         //this.thisDisplay.btn_share.mouseEnabled = false;
//         var oo = LocationProperty.getPara("aloneg")
//         if (oo) {
//             this.shareBack({ ret: "0" });
//         } else {
//             // PALifeOpen.share(param,this.shareBack,this.shareErr);
//             this.doShare(this.shareBack, this.shareErr, this);
//         }
//     }
//     private doShare(succ, fail, obj) {
//         console.log("开始分享");
//         var title = App.CommonlyData.gameConfig.SHARETITLE;
//         var cont = App.CommonlyData.gameConfig.SHARECONT;
//         var surl = App.CommonlyData.gameConfig.SHAREURL;
//         var simg = App.CommonlyData.gameConfig.SHAREIMG;
//         var param = {
//             title: title, // 分享标题
//             content: cont, // 分享内容描述
//             extention: surl,//  分享的链接地址
//             imageUrl: simg, //  分享显示的图片
//             shareTypes: "WXHY|WXPYQ|XLWB|DX" //  分享渠道
//             // 以 "|" 为分隔符。 WXHY: 微信好友 ;WXPYQ: 微信朋友圈 ;XLWB: 新浪微博 ;DX: 短信。
//         }
//         var oo = LocationProperty.getPara("aloneg")
//         if (oo) {
//             this.shareBack({ ret: "0" });
//         } else {
//             PALifeOpen.share(param, function (rsp) {
//                 // console.log(rsp);
//                 succ.call(obj, rsp);
//                 //  成功返回：
//                 // rsp = {
//                 // "ret": "0",
//                 // "msg": " 分享成功 ",
//                 // "data": {
//                 // "type":"WXHY"
//                 // "detail":" 分享成功 "
//                 // }
//                 // }
//                 //  取消分享返回：
//                 // rsp = {
//                 // "ret":"-1",
//                 // "msg": " 取消分享 ",
//                 // "data": {
//                 // "type":"WXHY"
//                 // "detail":" 取消分享 "
//                 // }
//                 // }
//                 //  分享失败返回：
//                 // rsp = {
//                 // "ret":"-2",
//                 // "msg": " 分享失败 ",
//                 // "data": {
//                 // "type":"WXHY"
//                 // "detail":" 您未安装微信 "
//                 // }
//                 // }
//                 //  点击 “ 分享弹出框 ” 中的 “ 取消 ” 返回：
//                 // rsp = {
//                 // "ret":"-1",
//                 // "msg": " 取消分享 ",
//                 // "data": {
//                 // "type":""
//                 // "detail":" 取消分享 "
//                 // }
//                 // }
//             }, function error(e) {
//                 console.error(e);
//                 fail.call(obj, e);
//             });
//         }
//     }
//     private shareBack(rsp) {
//         console.log("shareBack");
//         console.log(JSON.stringify(rsp));
//         if (rsp.ret == "0" || rsp.ret == 0) {
//             // alert("分享成功");

//             this.shareNet();  //分享成功，继续攀登
//         } else {
//             console.log("分享失败");
//             App.ViewManager.open(ViewConst.plan_warm, "分享失败");

//         }
//     }
//     private shareErr(e) {
//         //alert("分享接口调用失败");
//         App.ViewManager.open(ViewConst.plan_warm, "分享接口调用失败");
//     }

//     private shareNet() {
//         // console.log("点击了");
//         if (this.startInfo.today_shared_flag) {
//             return;
//         }
//         this.myConncet.share(App.CommonlyData.openId, this.shareNetBack, this);
//     }

//     private shareNetBack(err, res) {
//         console.log("shareNetBack");
//         console.log(err);
//         console.log(res);
//         // today_climbed_flag	Boolean			今日是否攀登过
//         // climb_mileages	Integer			攀登获得的里程数
//         // total_mileages	Integer			全部里程
//         // gained_medal_flag	Boolean			是否获得勋章
//         // gained_medal_id	Integer			获得勋章编号
//         // gained_medal_define_id	Integer			获得勋章类型id
//         // gained_medal_define_name	String			获得勋章名称
//         // next_medal_define_id	Integer			下一勋章类型
//         // next_medal_define_name	String		255	下一勋章名称
//         // next_medal_need_mileages	Integer			距离下一勋章里程数
//         if (err) {
//             //alert("分享失败");
//             App.ViewManager.open(ViewConst.plan_warm,"分享失败");
//             return;
//         }
//         if (res.haha) {
//             //alert("签名验证失败");
//             App.ViewManager.open(ViewConst.plan_warm,"签名验证失败");
//             return;
//         }
//         if (!res.succ) {
//             //alert("分享失败啦");
//             App.ViewManager.open(ViewConst.plan_warm,"分享失败啦");
//             return;
//         } else {
//             //console.log("beginGame Back");
//             //console.log(res);
//             // App.ViewManager.open(ViewConst.Start_climb,res);
//             this.startInfo.today_shared_flag = true; //已攀登过了
//             this.startInfo.total_mileages = res.total_mileages;
//             this.startInfo.today_climb_mileages += res.share_gain_mileages;
//             this.startInfo.next_medal_need_mileages = res.next_medal_need_mileages;
//             this.startInfo.today_shared_flag = true;  //今日分享过了
//             this.startInfo.next_medal_define_name = res.next_medal_define_name;
//         }
//     }
}

