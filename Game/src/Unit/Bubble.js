PP.Bubble = cc.Sprite.extend({
    ctor:function(){
        this._super();
    },
    initWithType:function(type){
        var filename;
        switch (type){
            case PP.BubbleType.Bule:
                filename = Ball.Blue;
                break;
            case PP.BubbleType.Cyan:
                filename = Ball.Cyan;
                break;
            case PP.BubbleType.Green:
                filename = Ball.Green;
                break;
            case PP.BubbleType.Pink:
                filename = Ball.Pink;
                break;
            case PP.BubbleType.Purple:
                filename = Ball.Purple;
                break;
            case PP.BubbleType.Red:
                filename = Ball.Red;
                break;
            case PP.BubbleType.Yellow:
                filename = Ball.Yellow;
                break;
        }
        this.initWithFile(filename);
    }
});

PP.Bubble.create = function(type){
    var b = new PP.Bubble();
    b.initWithType(type);
    return b;
};