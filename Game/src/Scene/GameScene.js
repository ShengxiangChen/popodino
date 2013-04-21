PP.GameScene = cc.Scene.extend({
    gameLayer:null,
    bgLayer:null,
    uiLayer:null,
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
    },
    onEnter:function(){
        this._super();
        this.schedule(this.update);
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
        this.gameLayer.setting();
    },
    update:function(dt){
        this.gameLayer.update(dt);
    }

});

PP.GameScene.create = function(){
    var scene = new PP.GameScene();
    return scene;
};