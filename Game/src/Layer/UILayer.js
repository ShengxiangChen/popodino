PP.UILayer = cc.Layer.extend({
    scoreLabel:null,
    levelLabel:null,
    score:0,
    level:0,
    runningCat:null,
    sister:null,
    init:function(){
        this._super();

        this.scoreLabel = cc.LabelTTF.create(this.score,  'Arial', 14, cc.size(54,18), cc.TEXT_ALIGNMENT_CENTER);
        this.scoreLabel.setPosition(cc.pAdd(PP.VisibleRect.topLeft(), cc.p(55,-35)));
        this.scoreLabel.setColor(cc.c3b(140,22,0));
        this.addChild(this.scoreLabel);

        this.levelLabel = cc.LabelTTF.create(this.level,  'Arial', 14, cc.size(54,18), cc.TEXT_ALIGNMENT_CENTER);
        this.levelLabel.setPosition(cc.pAdd(PP.VisibleRect.topLeft(), cc.p(130,-35)));
        this.levelLabel.setColor(cc.c3b(140,22,0));
        this.addChild(this.levelLabel);

        var animFrames = [];
        var spriteFrameCache = cc.SpriteFrameCache.getInstance();
        for (var i = 1; i <= 6; i++) {
            var localAtlasSprite = spriteFrameCache.getSpriteFrame("runningCat0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        var coupleAnim = cc.Animation.create(animFrames, 0.2);
        var dancingCatAction = cc.RepeatForever.create(cc.Animate.create(coupleAnim));

        this.runningCat = cc.Sprite.createWithSpriteFrameName("runningCat01.png");
        this.addChild(this.runningCat, PP.zOrder.ui + 1);
        this.runningCat.setPosition(cc.pAdd(PP.VisibleRect.bottomLeft(),cc.p(105,22)));
        this.runningCat.setFlipX(true);
        this.runningCat.runAction(dancingCatAction);

        var flowerLeft = cc.Sprite.createWithSpriteFrameName("flower.png");
        flowerLeft.setPosition(cc.pAdd(PP.VisibleRect.bottomLeft(),cc.p(-30,-6)));
        flowerLeft.setAnchorPoint(PP.AnchorPointBottomLeft);
        this.addChild(flowerLeft, PP.zOrder.ui+1);

        var flowerRight = cc.Sprite.createWithSpriteFrameName("flower.png");
        flowerRight.setPosition(cc.pAdd(PP.VisibleRect.bottomRight(),cc.p(20,-10)));
        flowerRight.setAnchorPoint(PP.AnchorPointBottomRight);
        this.addChild(flowerRight, PP.zOrder.ui+1);

        var animationCache = cc.AnimationCache.getInstance();

        animFrames = [];
        for (var i = 1; i <= 2; i++) {
            var localAtlasSprite = spriteFrameCache.getSpriteFrame("cryingCat0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        var cryingAnim = cc.Animation.create(animFrames, 0.2);
        animationCache.addAnimation(cryingAnim,"catIsCrying");

        animFrames = [];
        for (var i = 3; i <= 8; i++) {
            var localAtlasSprite = spriteFrameCache.getSpriteFrame("cryingCat0" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        cryingAnim = cc.Animation.create(animFrames, 0.2);
        cryingAnim.setRestoreOriginalFrame(false);
        animationCache.addAnimation(cryingAnim,"catIsSpeechless");

        this.cryingCat = cc.Sprite.createWithSpriteFrameName("cryingCat01.png");
        this.addChild(this.cryingCat, PP.zOrder.ui + 1);
        this.cryingCat.setPosition(cc.pAdd(PP.VisibleRect.bottomLeft(),cc.p(224,30)));
        var act = cc.RepeatForever.create(cc.Animate.create(animationCache.getAnimation("catIsCrying")));
        this.cryingCat.runAction(act);

        this.sister = PP.Sister.create();
        this.sister.setAnchorPoint(PP.AnchorPointBottom);
        this.sister.setPosition(cc.pAdd(PP.VisibleRect.bottomLeft(),cc.p(70,0)));
        this.addChild(this.sister);

        //happy ending
    },
    setLevel:function(level){
        //this.levelLabel.setString(level);
    },
    addScore:function(score){
        this.score += score;
        this.scoreLabel.setString(this.score);
    }
});

PP.UILayer.create = function(){
    var b = new PP.UILayer();
    b.init();
    return b;
};