PP.MainMenuLayer = cc.Layer.extend({
    flyingCat01:null,
    flyingCat02:null,
    flyingCat03:null,
    dancingCat:null,
    runningCat:null,
    couple:null,
    balloon:null,
    heart:null,
    menuItemStartGame:null,
    menuItemOption:null,
    dancingNow:false,
    init:function () {
        this._super();
        this.setMouseEnabled(true);
        this.setTouchEnabled(true);

        var bg = cc.Sprite.create(MainMenuBg);
        bg.setPosition(PP.VisibleRect.center());
        this.addChild(bg, PP.zOrder.bg);

        var logo = cc.Sprite.createWithSpriteFrameName("logo.png");
        logo.setAnchorPoint(PP.AnchorPointTopLeft);
        logo.setPosition(PP.VisibleRect.topLeft());
        this.addChild(logo, PP.zOrder.ui);

        this.flyingCat01 = cc.Sprite.createWithSpriteFrameName("cat01.png");
        this.flyingCat01.setPosition(cc.pAdd(PP.VisibleRect.topLeft(), cc.p(50, -185)));
        this.addChild(this.flyingCat01, PP.zOrder.ui);

        this.flyingCat02 = cc.Sprite.createWithSpriteFrameName("cat02.png");
        this.flyingCat02.setPosition(cc.pAdd(PP.VisibleRect.topRight(), cc.p(-35, -55)));
        this.addChild(this.flyingCat02, PP.zOrder.ui);

        this.flyingCat03 = cc.Sprite.createWithSpriteFrameName("cat03.png");
        this.flyingCat03.setPosition(cc.pAdd(PP.VisibleRect.bottomRight(), cc.p(-16, 97)));
        this.addChild(this.flyingCat03, PP.zOrder.ui);

        this.couple = cc.Sprite.createWithSpriteFrameName("couple01.png");
        this.couple.setAnchorPoint(PP.AnchorPointBottom);
        this.couple.setPosition(cc.pAdd(PP.VisibleRect.bottom(), cc.p(60, 30)));
        this.addChild(this.couple, PP.zOrder.unit + 1);

        this.heart = cc.Sprite.createWithSpriteFrameName("heart.png");
        this.heart.setPosition(cc.pAdd(this.couple.getPosition(), cc.p(-10, 75)));
        this.heart.setVisible(false);
        this.heart.setScale(0.5);
        this.addChild(this.heart, PP.zOrder.unit);

        var coupleSize = this.couple.getContentSize();
        var couplePos = cc.pAdd(this.couple.getPosition(), cc.pAdd(cc.p(coupleSize.width / 2, coupleSize.height), cc.p(-20, -10)));
        this.balloon = cc.Sprite.createWithSpriteFrameName("balloon.png");
        this.balloon.setAnchorPoint(cc.p(0.65, 0.1));
        this.balloon.setPosition(couplePos);
        this.balloon.setRotation(-10);
        this.addChild(this.balloon, PP.zOrder.unit + 2);

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
        this.addChild(menu, PP.zOrder.ui + 1);

        this.menuItemStartGame.setPosition(cc.pAdd(PP.VisibleRect.bottomLeft(), cc.p(75, 217)));
        this.menuItemOption.setPosition(cc.pAdd(PP.VisibleRect.bottomLeft(), cc.p(75, 138)));

        this.menuItemStartGame.dancingNow = false;
        this.menuItemStartGame.dancingNow = false;


        var animFrames = [];
        var spriteFrameCache = cc.SpriteFrameCache.getInstance();
        for (var i = 1; i < 3; i++) {
            var localAtlasSprite = spriteFrameCache.getSpriteFrame("dancingCat0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        var coupleAnim = cc.Animation.create(animFrames, 0.1);
        var dancingCatAction = cc.RepeatForever.create(cc.Animate.create(coupleAnim));

        this.dancingCat = cc.Sprite.createWithSpriteFrameName("dancingCat01.png");
        this.addChild(this.dancingCat, PP.zOrder.ui + 1);
        this.dancingCat.setVisible(false);
        this.dancingCat.runAction(dancingCatAction);
        this.dancingCat.pauseSchedulerAndActions();

        animFrames = [];
         spriteFrameCache = cc.SpriteFrameCache.getInstance();
        for (var i = 1; i <= 6; i++) {
            var localAtlasSprite = spriteFrameCache.getSpriteFrame("runningCat0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
         coupleAnim = cc.Animation.create(animFrames, 0.2);
         dancingCatAction = cc.RepeatForever.create(cc.Animate.create(coupleAnim));

        this.runningCat = cc.Sprite.createWithSpriteFrameName("runningCat01.png");
        this.addChild(this.runningCat, PP.zOrder.ui + 1);
        this.runningCat.setPosition(cc.pAdd(PP.VisibleRect.bottomLeft(),cc.p(50,60)));
        this.runningCat.setFlipX(true);
        this.runningCat.runAction(dancingCatAction);
    },
    onEnter:function () {
        this._super();
        var localRepeatForeverRotate = cc.RepeatForever.create(cc.Sequence.create(cc.RotateTo.create(0.8, 3), cc.RotateTo.create(0.8, -3)));
        this.balloon.runAction(localRepeatForeverRotate);

        for (var i = 1; i <= 3; i++) {
            var y = 0 | (3 + 5 * Math.random());
            var time = 0.3 + Math.random();
            var localRepeatScale = cc.RepeatForever.create(cc.Sequence.create(
                cc.MoveBy.create(time, cc.p(0, y)),
                cc.MoveBy.create(time, cc.p(0, -y)),
                cc.MoveBy.create(time, cc.p(0, y)),
                cc.MoveBy.create(time, cc.p(0, -y)),
                cc.ScaleTo.create(time, 1.1),
                cc.ScaleTo.create(time, 1)
            ));
            this["flyingCat0" + i].runAction(localRepeatScale);
        }

        var animFrames = [];
        var spriteFrameCache = cc.SpriteFrameCache.getInstance();
        for (var i = 1; i < 6; i++) {
            var localAtlasSprite = spriteFrameCache.getSpriteFrame("couple0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        var coupleAnim = cc.Animation.create(animFrames, 0.3);
        var coupleAction = cc.RepeatForever.create(cc.Animate.create(coupleAnim));
        this.couple.runAction(coupleAction);

        var pos = this.heart.getPosition();
        var func = function (sender) {
            sender.setPosition(pos);
            sender.setScale(0.5);
            sender.setVisible(false);
        };
        var heartAction = cc.RepeatForever.create(cc.Sequence.create(
            cc.CallFunc.create(this.heart.setVisible, this.heart, true),
            cc.Spawn.create(cc.MoveBy.create(0.3, cc.p(0, 50)), cc.ScaleTo.create(1, 1)),
            cc.ScaleTo.create(0.2, 0.9),
            cc.ScaleTo.create(0.2, 1),
            cc.ScaleTo.create(0.2, 0.9),
            cc.ScaleTo.create(0.2, 1),
            cc.CallFunc.create(func, this.heart),
            cc.DelayTime.create(1)
        ));
        this.heart.runAction(heartAction);
    },
    menuStartGame:function () {
        cc.Loader.preload(g_maingame, function () {
            var gameScene = PP.GameScene.create();
            cc.Director.getInstance().replaceScene(gameScene);
        }, this);
    },
    menuOption:function () {
        cc.log("go option!")
    },
    onTouchesBegan:function (touches) {
        this._super();
        var pos = touches[0].getLocation();
        this.letsDane(pos);
    },
    onTouchesMoved:function (touches) {
        this._super();
        var pos = touches[0].getLocation();
        this.letsDane(pos);
    },
    onMouseMoved:function (event) {
        this._super();
        var pos = event.getLocation();
        this.letsDane(pos);
    },
    letsDane:function(pos){
        var contains01 = cc.rectContainsPoint(this.menuItemStartGame.getBoundingBox(), pos);
        if (contains01 && !this.menuItemStartGame.dancingNow) {
            this.menuItemStartGame.selected();
            this.dancingCat.setVisible(true);
            this.dancingCat.setPosition(cc.pAdd(this.menuItemStartGame.getPosition(), cc.p(30, 38)));
            this.dancingCat.resumeSchedulerAndActions();
            this.menuItemStartGame.dancingNow = true;
        }
        else if (!contains01 && this.menuItemStartGame.dancingNow) {
            this.menuItemStartGame.unselected();
            this.dancingCat.setVisible(false);
            this.dancingCat.pauseSchedulerAndActions();
            this.menuItemStartGame.dancingNow = false;
        }

        var contains02 = cc.rectContainsPoint(this.menuItemOption.getBoundingBox(), pos);
        if (contains02 && !this.menuItemOption.dancingNow) {
            this.menuItemOption.selected();
            this.dancingCat.setVisible(true);
            this.dancingCat.setPosition(cc.pAdd(this.menuItemOption.getPosition(), cc.p(30, 32)));
            this.dancingCat.resumeSchedulerAndActions();
            this.menuItemOption.dancingNow = true;
        }
        else if (!contains02 && this.menuItemOption.dancingNow) {
            this.menuItemOption.unselected();
            this.dancingCat.setVisible(false);
            this.dancingCat.pauseSchedulerAndActions();
            this.menuItemOption.dancingNow = false;
        }
    }
});

PP.MainMenuLayer.create = function () {
    var layer = new PP.MainMenuLayer();
    layer.init();
    return layer;
};