PP.GameScene = cc.Scene.extend({
    gameLayer:null,
    bgLayer:null,
    uiLayer:null,
    init:function () {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(Bubble_plist);
        this.gameLayer = PP.GameLayer.create();
        this.gameLayer.setGame(this);
        this.addChild(this.gameLayer, 10);

        this.bgLayer = PP.BackgroundLayer.create();
        this.addChild(this.bgLayer, 0);

        this.uiLayer = PP.UILayer.create();
        this.addChild(this.uiLayer, 11);

        this.schedule(this.update);
    },
    getGameLayer:function(){
        return this.gameLayer;
    },
    getUILayer:function(){
        return this.uiLayer;
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
    scene.init();
    return scene;
};