PP.MainMenuScene = cc.Scene.extend({
    mainLayer:null,
    init:function () {
        this._super();
        window.scene  = this;
        cc.SpriteFrameCache.getInstance().addSpriteFrames(MainMenu_plist);

        this.mainLayer = PP.MainMenuLayer.create();
        this.addChild(this.mainLayer);
    }
});