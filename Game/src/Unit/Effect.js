//Effect
PP.Effect = cc.Sprite.extend({
    init:function(){
        this._super();

    },
    initWithManager:function(manager, gameLayer, frameName, anim){
        if (this.bHasBeenInited) {
            return;
        }
        this.mgr = manager;
        this.gameLayer = gameLayer;
        this.retain();
        if (anim) {
            this.anim = anim;
        }
    }
});

//BombEffect
PP.BombEffect = cc.Sprite.extend({
    init:function(){
        this._super();

    },
    initWithManager:function(){

    }
});

PP.BombEffect.create = function(){
    var be = new PP.BombEffect();
    be.init();
    return be;
};

//EffectManager
PP.EffectManager = cc.Class.extend({
    frameName:null,
    colAnim:null,
    anim:null,
    quque:null,
    ctor:function(){
        this._super();
        this.quque = [];
    },
    getNextEntity:function(){

    }
});

//BombEffectManager
PP.BombEffectManager = PP.EffectManager.extend({
    getNextEntity:function(){
        var effectEntity;
        if(this.quque.length > 0){
            effectEntity = this.quque.shift();
        }
        else{
            effectEntity = new PP.BombEffect();
            effectEntity.initWithSpriteFrameName(this.frameName);
        }
        effectEntity.initWithManager(this,this.gameLayer,this.frameName,this.anim);

        return effectEntity;
    },
    initWithGameLayer:function(gameLayer){
        this._super(gameLayer);
        this.frameName = "coin01_0000.png";

        var animFrames = [];
        var spriteFrameCache = cc.SpriteFrameCache.getInstance();

        for (var i = 0; i < 5; i++) {
            var localAtlasSprite = spriteFrameCache.getSpriteFrame("coin01_000" + i + ".png");
            animFrames.push(localAtlasSprite);
        }
        this.colAnim = cc.Animation.create(animFrames, 0.08);
        this.anim = cc.Animate.create(this.colAnim);
        this.anim.retain();
    }
});

PP.FlashEffectManager = PP.EffectManager.extend({
    getNextEntity:function(){

    }
});