PP.Sister = cc.Sprite.extend({
    bubble:null,
    hands:null,
    init: function () {
        this._super();
        this.initWithSpriteFrameName("sister_stand01.png");

        this.animationCache = cc.AnimationCache.getInstance();
        var spriteFrameCache = cc.SpriteFrameCache.getInstance();

        var animFrames = [],localAtlasSprite;
        for (var i = 1; i <= 2; i++) {
             localAtlasSprite = spriteFrameCache.getSpriteFrame("sister_stand0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        var sisterAnim = cc.Animation.create(animFrames, 0.3);
        sisterAnim.setRestoreOriginalFrame(false);
        this.animationCache.addAnimation(sisterAnim,"sister_stand");

        animFrames = [];
        for (var i = 1; i <= 8; i++) {
            localAtlasSprite = spriteFrameCache.getSpriteFrame("sister_shock0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        sisterAnim = cc.Animation.create(animFrames, 0.3);
        sisterAnim.setRestoreOriginalFrame(false);
        this.animationCache.addAnimation(sisterAnim,"sister_shock");

        animFrames = [];
        for (var i = 1; i <= 2; i++) {
            localAtlasSprite = spriteFrameCache.getSpriteFrame("sister_crying0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        sisterAnim = cc.Animation.create(animFrames, 0.3);
        sisterAnim.setRestoreOriginalFrame(false);
        this.animationCache.addAnimation(sisterAnim,"sister_crying");

        //hands
        animFrames = [];
        for (var i = 1; i <= 2; i++) {
            localAtlasSprite = spriteFrameCache.getSpriteFrame("sister_hands0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        sisterAnim = cc.Animation.create(animFrames, 0.3);
        var handsAction = cc.RepeatForever.create(cc.Animate.create(sisterAnim));

        this.hands =  cc.Sprite.createWithSpriteFrameName("sister_hands01.png");
        this.hands.setPosition(cc.p(85,43));
        this.addChild(this.hands,100);
        this.hands.runAction(handsAction);

        this.bubble = PP.Bubble.create(1);
        this.bubble.setPosition(cc.p(85,43));
        this.addChild(this.bubble,99);

        this.stand();
    },
    stand:function(){
        this.stopAllActions();
        var act = cc.RepeatForever.create(cc.Animate.create(this.animationCache.getAnimation("sister_stand")));
        this.runAction(act);
    },
    cry:function(){
        this.stopAllActions();
        var act = cc.RepeatForever.create(cc.Animate.create(this.animationCache.getAnimation("sister_crying")));
        this.runAction(act);
    },
    shock:function(){
        this.stopAllActions();
        var act = cc.Animate.create(this.animationCache.getAnimation("sister_shock"));
        this.runAction(act);
    },
    setBubbleType:function(type){
        this.bubble.setColorType(type);
    }
});

PP.Sister.create = function(){
    var sister = new PP.Sister();
    sister.init();
    return sister;
};