PP.BackgroundLayer = cc.Layer.extend({
    wall:null,
    wallBeginPos:null,
    init:function(){
        this._super();
        this.wallBeginPos = cc.pAdd(PP.VisibleRect.top(),cc.p(0,-52));

        var bg = cc.Sprite.createWithSpriteFrameName("bg.jpg");
        bg.setAnchorPoint(PP.AnchorPointBottom);
        bg.setPosition(PP.VisibleRect.bottom());
        this.addChild(bg, PP.zOrder.bg);

        var border = cc.Sprite.createWithSpriteFrameName("border.png");
        border.setAnchorPoint(PP.AnchorPointBottom);
        border.setPosition(PP.VisibleRect.bottom());
        this.addChild(border, PP.zOrder.top);

        this.wall = cc.Sprite.createWithSpriteFrameName("wall.png");
        this.wall.setAnchorPoint(PP.AnchorPointBottom);
        this.wall.setPosition(this.wallBeginPos);
        this.addChild(this.wall, PP.zOrder.ui);
    },
    wallGoDown:function(posY){
        var pos = cc.pSub(this.wall.getPosition(),cc.p(0,posY));
        this.wall.setPosition(pos);
    },
    resetWall:function(){
        this.wall.setPosition(this.wallBeginPos);
    }
});

PP.BackgroundLayer.create = function(){
    var b = new PP.BackgroundLayer();
    b.init();
    return b;
};