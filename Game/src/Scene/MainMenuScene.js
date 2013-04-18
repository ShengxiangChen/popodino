PP.MainMenuScene = cc.Scene.extend({
    mainLayer:null,
    init:function () {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(MainMenu_plist);

        this.mainLayer = PP.MainMenuLayer.create();
        this.addChild(this.mainLayer);
    }
});