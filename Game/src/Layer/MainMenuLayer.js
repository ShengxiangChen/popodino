PP.MainMenuLayer = cc.Layer.extend({
    flyingCat01:null,
    flyingCat02:null,
    flyingCat03:null,
    dancingCat:null,
    couple:null,
    balloon:null,
    menuItemStartGame:null,
    menuItemOption:null,
    init:function(){
        this._super();

        var bg = cc.Sprite.create(MainMenuBg);
        bg.setPosition(PP.VisibleRect.center());
        this.addChild(bg,PP.zOrder.bg);

        var logo = cc.Sprite.createWithSpriteFrameName("logo.png");
        logo.setAnchorPoint(PP.AnchorPointTopLeft);
        logo.setPosition(PP.VisibleRect.topLeft());
        this.addChild(logo,PP.zOrder.ui);

        this.flyingCat01 = cc.Sprite.createWithSpriteFrameName("cat01.png");
        this.flyingCat01.setPosition(cc.pAdd(PP.VisibleRect.topLeft(),cc.p(50,-185)));
        this.addChild(this.flyingCat01,PP.zOrder.ui);

        this.flyingCat02 = cc.Sprite.createWithSpriteFrameName("cat02.png");
        this.flyingCat02.setPosition(cc.pAdd(PP.VisibleRect.topRight(),cc.p(-35,-55)));
        this.addChild(this.flyingCat02,PP.zOrder.ui);

        this.flyingCat03 = cc.Sprite.createWithSpriteFrameName("cat03.png");
        this.flyingCat03.setPosition(cc.pAdd(PP.VisibleRect.bottomRight(),cc.p(-16,97)));
        this.addChild(this.flyingCat03,PP.zOrder.ui);

        this.couple = cc.Sprite.createWithSpriteFrameName("couple01.png");
        this.couple.setAnchorPoint(PP.AnchorPointBottom);
        this.couple.setPosition(cc.pAdd(PP.VisibleRect.bottom(),cc.p(60,30)));
        this.addChild(this.couple,PP.zOrder.ui);

        var coupleSize = this.couple.getContentSize();
        var couplePos = cc.pAdd(this.couple.getPosition(), cc.p(coupleSize.width/2,coupleSize.height));
        this.balloon  = cc.Sprite.createWithSpriteFrameName("balloon.png");
        this.balloon.setAnchorPoint(cc.p(0.75,0.1));
        this.balloon.setPosition(couplePos);
        this.addChild(this.balloon,PP.zOrder.ui);

        this.menuItemStartGame = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("start_normal.png"),
            cc.Sprite.createWithSpriteFrameName("start_active.png"),
            this.menuStartGame, this
        );

        this.menuItemOption = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("option_normal.png"),
            cc.Sprite.createWithSpriteFrameName("option_active.png"),
            this.menuOption, this
        );

        var menu = cc.Menu.create(this.menuItemStartGame, this.menuItemOption);
        menu.setAnchorPoint(PP.AnchorPointBottomLeft);
        menu.setPosition(PP.VisibleRect.bottomLeft());
        this.addChild(menu,PP.zOrder.ui+1);

        this.menuItemStartGame.setPosition(cc.pAdd(PP.VisibleRect.bottomLeft(),cc.p(75,217)));
        this.menuItemOption.setPosition(cc.pAdd(PP.VisibleRect.bottomLeft(),cc.p(75,138)));
    },
    menuStartGame:function(){

    },
    menuOption:function(){

    }
});

PP.MainMenuLayer.create = function(){
    var b = new PP.MainMenuLayer();
    b.init();
    return b;
};