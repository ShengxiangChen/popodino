PP.Bubble = cc.Sprite.extend({
    initWithType:function(colorType){
        var filename;
        switch (colorType){
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
    },
    setColorType:function(colorType){
        this.initWithType(colorType);
    }
});

PP.Bubble.create = function(type){
    var b = new PP.Bubble();
    b.initWithType(type);
    return b;
};