PP.UILayer = cc.Layer.extend({
    scoreLabel:null,
    levelLabel:null,
    score:0,
    level:0,
    init:function(){
        this._super();

        this.scoreLabel = cc.LabelTTF.create(this.score,  'Arial', 14, cc.size(54,18), cc.TEXT_ALIGNMENT_CENTER);
        this.scoreLabel.setPosition(cc.p(55,445));
        this.scoreLabel.setColor(cc.c3b(140,22,0));
        this.addChild(this.scoreLabel);

        this.levelLabel = cc.LabelTTF.create(this.level,  'Arial', 14, cc.size(54,18), cc.TEXT_ALIGNMENT_CENTER);
        this.levelLabel.setPosition(cc.p(130,445));
        this.levelLabel.setColor(cc.c3b(140,22,0));
        this.addChild(this.levelLabel);
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