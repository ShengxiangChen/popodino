PP.GameScene = cc.Scene.extend({
    gameLayer:null,
    init:function () {
        this._super();






        this.gameLayer = PP.GameLayer.create();
        this.gameLayer.setGame(this);
        this.addChild(this.gameLayer);

        //this.sett(this.stg);
        //this.newbl();

        this.schedule(this.update);
    },
    update:function(dt){
        this.gameLayer.update(dt);
    }

});