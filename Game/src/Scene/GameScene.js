PP.GameScene = cc.Scene.extend({
    gameLayer:null,
    bgLayer:null,
    uiLayer:null,
    go:null,
    waitingForGetSet:null,
    init:function () {
        this._super();
        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames(Bubble_plist);
        cache.addSpriteFrames(UI_plist);
        cache.addSpriteFrames(Bg_plist);

        this.gameLayer = PP.GameLayer.create();
        this.gameLayer.setGame(this);
        this.addChild(this.gameLayer, 10);

        this.uiLayer = PP.UILayer.create();
        this.addChild(this.uiLayer, 11);

        this.bgLayer = PP.BackgroundLayer.create();
        this.addChild(this.bgLayer, 0);

        this.initGameData();
        this.initStartAnimation();
    },
    initGameData:function(){
        this.waitingForGetSet = true;
    },
    onEnter:function(){
        this._super();
        this.schedule(this.update);
    },
    initStartAnimation:function(){
        this.go = cc.Sprite.createWithSpriteFrameName("start.png");
        this.go.setPosition(PP.VisibleRect.center());
        this.go.setScale(0);
        this.addChild(this.go, PP.zOrder.top);
    },
    getGameLayer:function(){
        return this.gameLayer;
    },
    getUILayer:function(){
        return this.uiLayer;
    },
    getBgLayer:function(){
        return this.bgLayer;
    },
    levelUp:function(){
        ++PP.lv;
        ++PP.lvdlv;
        if (PP.lvdlv == 5) {
            PP.lvdlv = 0;
            ++PP.lvdlv2;
            PP.lvlvho = 1;
            if (PP.lvdlv2 > 5) {
                PP.lvdlv2 = 5;
            }
        }

        this.gameLayer.initGameData();
        this.gameLayer.gameSetting();
    },
    triggerGetSetGo:function(){
        if (this.waitingForGetSet) {
            this.waitingForGetSet = false;
            //csx cc.log("Starting Game - triggerGetSetGo Starting getSetGo");
            this.startGo();
        }
    },
    startGo:function(){
        var easeElasticOut1 = cc.EaseElasticOut.create(cc.ScaleTo.create(0.75, 1));
        var easeExponentialIn1 = cc.EaseExponentialIn.create(cc.ScaleTo.create(0.5, 2));
        var scaleTo1 = cc.ScaleTo.create(0, 0);
        var fadeOut = cc.FadeOut.create(0.5);
        var fadeIn = cc.FadeIn.create(0);
        var seq = cc.Sequence.create(easeElasticOut1, easeExponentialIn1, scaleTo1, cc.DelayTime.create(0.5), fadeOut, fadeIn);

        this.go.runAction(seq);
    },
    update:function(dt){
        this.triggerGetSetGo();
        this.gameLayer.update(dt);
    }

});

PP.GameScene.create = function(){
    var scene = new PP.GameScene();
    return scene;
};