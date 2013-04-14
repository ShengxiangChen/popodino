PP.BackgroundLayer = cc.Layer.extend({
    init:function(){
        this._super();

        var bg = cc.Sprite.create(GameBackground);
        bg.setAnchorPoint(cc.p(0.5, 0));
        bg.setPosition(cc.p(160,0));
        this.addChild(bg);
    }
});

PP.BackgroundLayer.create = function(){
    var b = new PP.BackgroundLayer();
    b.init();
    return b;
};