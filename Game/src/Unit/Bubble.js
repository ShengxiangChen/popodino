PP.Bubble = cc.Sprite.extend({
    ctor:function(){
        this._super();
    },
    initWithType:function(type){
        var filename;
        switch (type){
            case PP.BubbleType.Bule:
                filename = "blue.png";
                break;
            case PP.BubbleType.White:
                filename = "white.png";
                break;
            case PP.BubbleType.Green:
                filename = "green.png";
                break;
            case PP.BubbleType.Orange:
                filename = "orange.png";
                break;
            case PP.BubbleType.Purple:
                filename = "purple.png";
                break;
            case PP.BubbleType.Yellow:
                filename = "yellow.png";
                break;
            case PP.BubbleType.Bomb:
                filename = "bomb.png";
                break;
        }
        this.initWithSpriteFrameName(filename);
    }
});

PP.Bubble.create = function(type){
    var b = new PP.Bubble();
    b.initWithType(type);
    return b;
};