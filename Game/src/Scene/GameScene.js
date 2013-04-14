PP.GameScene = cc.Scene.extend({
    gameLayer:null,
    bgLayer:null,
    init:function () {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(Bubble_plist);
        this.gameLayer = PP.GameLayer.create();
        this.gameLayer.setGame(this);
        this.addChild(this.gameLayer, 10);

        this.bgLayer = PP.BackgroundLayer.create();
        this.addChild(this.bgLayer, 0);
        //this.setting(this.stg);
        //this.newBubble();

        this.schedule(this.update);
    },
    update:function(dt){
        this.gameLayer.update(dt);
    }

});