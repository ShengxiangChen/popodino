PP.GameLayer = cc.Layer.extend({
    game: null,
    mouse: cc.p(0, 0),
    radian: 0.017453,
    isStoped: 0,
    tmpBubble: cc.p(0, 0),
    _rotation: 0,
    player: null,
    init: function () {
        this._super();
        window.layer = this;
        this.setTouchEnabled(true);

        this.noj = [];
        this.speed = 1116;
        this.diameter = 39;
        this.px = 5;
        this.py = 480 - 19;
        this.poc2 = 3;
        this.deathy = 400;
        this.allst = 30;
        this.wallc = 0;
        var blur_filter = [4, 4, 3];
        var blur_filter0 = [0, 0, 0];
        var filter_array = [];
        var filter_array0 = [];
        filter_array.push(blur_filter);
        filter_array0.push(blur_filter0);
        this.poc = parseInt((PP.lv - 1) / this.allst) + this.poc2;
        this.downc = 18 - PP.dlv2 * 2;
        this.hcount = 0;
        this.arp = [1, 1, 0, -1, -1, 0];
        this.arn1 = [-1, 0, 1, 0, -1, -1];
        this.arn0 = [0, 1, 1, 1, 0, -1];
        this.gag = [-30, 30, 90, 150, -150, -90];
        this.leftSider = this.px + this.diameter / 2;
        this.rightSider = this.px + this.diameter * 8 - this.diameter / 2;
        this.depth = 5000;
        this.udg = Math.sqrt(this.diameter * this.diameter - this.diameter / 2 * (this.diameter / 2));
        this.allBubbles = [];
        //this.undeadb();
        this.stg = PP.lv % this.allst;
        if (this.stg == 0) {
            this.stg = this.allst;
        }
        if (this.stg % 10 == 0) {
            this.stg = 0 | (Math.random() * 2 + 90);
            this.colorType = 7;
            this.bst = 1;
        }
        else {
            this.colorType = 0 | (Math.random() * 5 + 1);
            this.bst = 0;
        }
        this.allBubblesColorType = [];

        this.isStoped = this.u = this.vib = this.vk = 0;
        this.ga = 3;

        this.player = cc.Sprite.create("res/a2.png");
        this.player.setPosition(cc.p(160, 16));
        this.addChild(this.player);
        this.setting(this.stg);
        this.newBubble();
    },
    setGame: function (v) {
        this.game = v;
    },
    setting: function (typenum) {
        var level = PP.LEVEL["ty" + typenum];
        var nums = level.length;
        var arr = 8;
        var sx = this.px + this.diameter / 2;
        var sy = this.py - this.diameter / 2;
        var lines = 1;
        var ars = 0;
        for (var i = 0; i < nums; i++) {
            if (level[i] > 0) {
                var bubble = PP.Bubble.create(level[i]);
                bubble.setPosition(cc.p(sx, sy));
                this.addChild(bubble, this.depth, lines * 10 + ars);
                bubble.colorType = level[i];
                this.allBubbles.push(bubble);
                ++this.depth;
            }
            ++ars;
            sx = sx + this.diameter;
            if (arr == ars) {
                if (arr == 8) {
                    sx = this.px + this.diameter;
                    arr = 7;
                }
                else {
                    sx = this.px + this.diameter / 2;
                    arr = 8;
                }
                ars = 0;
                ++lines;
                sy = sy - this.udg;
            }
        }
    },
    gos: function () {
        //PP.hrr.i = 0;
        //PP.hrr.gotoAndStop(1);
        //_parent._parent.ssh.gotoAndPlay(2);
        this.shts = 0;
        this.isStoped = 1;
        this.xSpeed = Math.sin(this.radian * this.player.getRotation()) * this.speed;
        this.ySpeed = Math.cos(this.radian * this.player.getRotation()) * this.speed;
        this.allBubblesAmount = this.allBubbles.length;
        ++this.hcount;
    },
    dcup: function () {
        var _loc2 = 1;
        var ttem = this.downc - this.hcount;
        if (ttem < 4) {
            // this.god.vib = ttem;
            //this.god.ban = this.allBubbles.length;
        }
        if (this.downc == this.hcount) {
            this.alldown();
            this.hcount = 0;


        }
        if (this.scanOver()) {
            _loc2 = 0;
            /*_parent.hrr.i = 500;
             _parent._parent.ov.gotoAndPlay(2);*/
        }
        return _loc2;
    },
    undeadb: function () {
        var sx = this.px + this.diameter;
        var sy = this.py - (this.udg - this.diameter / 2);
        for (var i = 0; i < 7; i++) {
            var child = PP.Bubble.create();
            this.addChild(child, this.depth, parseInt(0 + "" + i));
            child.setPosition(cc.p(sx, sy));
            child.colorType = 9;
            this.allBubbles.push(child);
            ++this.depth;
            sx = sx + this.diameter;
        }
    },
    alldown: function () {
        /* ++this.wallc;
         var _loc3 = Math.random()*2;
         _parent.umb.boy.gotoAndPlay("dn" + _loc3);
         _parent.sen.gotoAndPlay("bad");
         _parent.umb._y = _parent.umb._y - 15;
         if (wallc == 6) {
         _parent.rbt.gotoAndStop(2);
         }
         _parent.wall._y = _parent.wall._y + udg;
         _parent.wall._x = 331;
         _parent.mit.gotoAndPlay(2);
         var allBubblesAmount = this.allBubbles.length;
         for (var i = 0; i < allBubblesAmount; i++) {
         this.allBubbles[i].bb._x = 0;
         this.allBubbles[i]._y = this[allBubbles[i]]._y + udg;
         }*/
    },
    search1: function (blna) {
        this.targetBubble = [blna];
        this.nuj = [];
        this.noj = [];
        this.res = [];
        var whi = 1;
        while (whi) {
            this.noj = [];
            for (var i = 0; i < this.targetBubble.length; i++) {
                var finds = 0;
                for (var j = 0; j < this.nuj.length; j++) {
                    if (this.targetBubble[i] == this.nuj[j]) {
                        finds = 1;
                    }
                }
                if (finds == 0) {
                    this.noj.push(this.targetBubble[i]);
                }
            }
            this.targetBubble = [];
            var tes = this.noj.length;
            for (var i = 0; i < tes; i++) {
                this.targetBubble[i] = this.noj[i];
            }
            if (tes == 0) {
                whi = 0;
                continue;
            }
            this.res = [];
            for (var i = 0; i < tes; i++) {
                var tag = this.targetBubble[i];
                this.nuj.push(tag);
                var np = Math.floor(tag / 10);
                var nn = tag % 10;
                var ch = np % 2;
                for (var j = 0; j < 6; j++) {
                    var nump = np + this.arp[j];
                    var numn = nn + this["arn" + ch][j];
                    var n = nump * 10 +numn;
                    var child = this.getChildByTag(n);
                    if (child && child.colorType < 10) {
                        this.res.push(n);
                    }
                }
            }
            this.res.sort();
            var ap = this.res.length;
            this.targetBubble = [];
            //var idx = -1;
            for (var i = 0; i < ap; i++) {
                this.targetBubble.push(this.res[i]);
                /*if (this.targetBubble[idx] != this.res[i]) {
                    ++idx;
                    this.targetBubble[idx] = this.res[i];
                }*/
            }
        }
    },
    search2: function (blna, key) {
        this.targetBubble = [blna];
        this.nuj = [];
        this.noj = [];
        this.res = [];

        var whi = 1;
        while (whi) {
            this.noj = [];
            for (var i = 0; i < this.targetBubble.length; i++) {
                var finds = 0;
                for (var j = 0; j < this.nuj.length; j++) {
                    if (this.targetBubble[i] == this.nuj[j]) {
                        finds = 1;
                    }
                }
                if (finds == 0) {
                    this.noj.push(this.targetBubble[i]);
                }
            }
            this.targetBubble = [];
            var tes = this.noj.length;
            for (i = 0; i < tes; i++) {
                this.targetBubble[i] = this.noj[i];
            }
            if (tes == 0) {
                whi = 0;
                continue;
            }
            this.res = [];
            for (var i = 0; i < tes; i++) {
                var tag = this.targetBubble[i];
                this.nuj.push(tag);
                var np = Math.floor(tag / 10);
                var nn = tag % 10;
                var ch = np % 2;
                for (var j = 0; j < 6; j++) {
                    var nump = np + this.arp[j];
                    var numn = nn + this["arn" + ch][j];
                    var n = nump * 10 + numn;
                    var child = this.getChildByTag(n);
                    if (child && child.colorType == key) {
                        this.res.push(n);
                    }
                }
            }
           /* if(this.res.length  == 0){
                whi = 0;
                continue;
            }*/
            this.res.sort();
            this.targetBubble = [];
           // var idx = -1;
            for (i = 0; i <  this.res.length; i++) {
                this.targetBubble.push(this.res[i]);
               /* if (this.targetBubble[idx] != this.res[i]) {
                    ++idx;
                    this.targetBubble[idx] = this.res[i];
                }*/
            }
        }
    },
    removeSameBubbles: function () {
        //_parent.remv.gotoAndPlay(2);
        if (this.nuj[0].colorType == 6) {
            //_parent.spes.gotoAndPlay(2);
            // _parent.sco = _parent.sco + 2000;
        }
        //_parent.sco = _parent.sco + _loc6 * 10;
        //_parent.numv(_parent.sco, "scom", 6);
        for (var i = 0; i < this.nuj.length; ++i) {
            /* this.attachMovie("ppo", "ppo" + depth, depth);
             this["ppo" + depth]._x = this[nuj[i]]._x;
             this["ppo" + depth]._y = this[nuj[i]]._y;
             ++depth;*/

            var bubbleLen = this.allBubbles.length;
            for (var j = 0; j < bubbleLen; j++) {
                var child = this.allBubbles[j];
                if (child) {
                    if (child.getTag() == parseInt(this.nuj[i])) {
                        child.removeFromParent(true);
                        this.allBubbles.splice(j, 1);
                        j = bubbleLen;
                    }
                }
            }
        }
    },
    inspace: function () {
        this.noj = [];
        for (i = 0; i < this.allBubbles.length; i++) {
            var finds = 0;
            for (var j = 0; j < this.nuj.length; j++) {
                if (this.allBubbles[i].getTag() == this.nuj[j]) {
                    finds = 1;
                }
            }
            if (finds == 0) {
                this.noj.push(this.allBubbles[i].getTag());
            }
        }
        var kk = this.noj.length;
        for (var i = 0; i < kk; i++) {
            var bubbleLen = this.allBubbles.length;
            for (var j = 0;j < bubbleLen;j++) {
                var child = this.allBubbles[j];
                if(child){
                    if (child.getTag() == this.noj[i]) {
                        child.removeFromParent(true);
                        this.allBubbles.splice(j, 1);
                        j = bubbleLen;
                    }
                }
            }
        }
        var spe = kk * 20;
        //score
        /* _parent.sco = _parent.sco + spe;
         _parent.numv(_parent.sco, "scom", 6);
         _parent.spe.sco = spe;
         _parent.spe.isStoped = 1;
         _parent.spe.i = 0;
         _parent.spe.gotoAndStop(2);*/
    },
    scanOver: function () {
        var _loc3 = 0;
        var _loc2 = this.allBubbles.length;
        for (var i = 0; i < _loc2; i++) {
            if (this.allBubbles[i].getPosition().y > this.deathy) {
                i = _loc2;
                _loc3 = 1;
            }
        }
        return (_loc3);
    },
    onTouchesBegan: function (touches) {
        this._super();
        this.mouse = touches[0].getLocation();
        if (/*this.shts == 1 && */(this.mouse.x > 15 && this.mouse.x < 315)) {
            var xdis = this.mouse.x - this.player.getPosition().x;
            var ydis = this.mouse.y - this.player.getPosition().y;
            var gagy = -(Math.atan2(ydis, xdis) / this.radian - 90);
            if (gagy < 80 && gagy > -80) {
                if (gagy != this.player.getRotation()) {
                    this.player.setRotation(gagy);
                }
            }
            this.gos();
        }
    },
    onTouchesMoved: function (touches) {
        this._super();
    },
    onTouchesEnded: function (touches) {
        this._super();
    },
    newBubble: function () {
        this.tmpBubble = PP.Bubble.create(this.colorType);
        this.tmpBubble.setPosition(this.player.getPosition());
        this.addChild(this.tmpBubble, this.depth);
        this.tmpBubble.colorType = this.colorType;

        var ext = 0 | (Math.random() * 50);
        if (ext == 35) {
            this.colorType = 6;
        }
        else if (ext < 5 || this.bst == 1) {
            this.colorType = 7;
        }
        else {
            this.allBubblesColorType = [];
            var alls = this.allBubbles.length;
            for (var i = 0; i < alls; i++) {
                var rem = this.allBubbles[i].colorType;
                if (rem < 6) {
                    this.allBubblesColorType.push(rem);
                }
            }
            var uem = 0 | (Math.random() * this.allBubblesColorType.length);
            this.colorType = this.allBubblesColorType[uem];
        }
        ++this.depth;
        //_parent.girl.girl.yebm.gotoAndStop(colorType);
        //_parent.girl.colorType = colorType;
    },
    update: function (dt) {
        if (this.isStoped == 1) {
            this.tmpBubble.setPosition(cc.pAdd(this.tmpBubble.getPosition(), cc.p(this.xSpeed * dt, this.ySpeed * dt)));
            for (var i = 0; i < this.allBubblesAmount; i++) {
                var tempBubble = this.allBubbles[i];
                var p = cc.pSub(this.tmpBubble.getPosition(), tempBubble.getPosition());
                var distance = cc.pLength(p);
                if (distance < this.diameter) {
                    var tag = tempBubble.getTag();
                    var np = Math.floor(tag / 10);
                    var nn = tag % 10;
                    var gus = 100;
                    var mmx = 0, mmy = 0;
                    var gubl = 0;
                    var ch = np % 2;
                    for (var j = 0; j < 6; j++) {
                        var nump = np + this.arp[j];
                        var numn = nn + this["arn" + ch][j];
                        var isExitBubble = this.getChildByTag(nump * 10 + numn);
                        if (isExitBubble == null) {
                            var radian = this.radian * this.gag[j];
                            var tx = tempBubble.getPosition().x + Math.sin(radian) * this.diameter;
                            var ty = tempBubble.getPosition().y - Math.cos(radian) * this.diameter;
                            p = cc.pSub(this.tmpBubble.getPosition(), cc.p(tx, ty));
                            distance = cc.pLength(p);
                            if (distance < gus) {
                                gus = distance;
                                mmx = tx;
                                mmy = ty;
                                gubl = nump * 10 +numn;
                            }
                        }
                    }

                    //this.tmpBubble.filters = _parent.filter_array0;
                    //_parent._parent.sit.gotoAndPlay(2);
                    /*_parent._parent.flas._x = this.tmpBubble._x = mmx;
                     _parent._parent.flas._y = this.tmpBubble._y = mmy;
                     _parent._parent.flas.gotoAndPlay(2);*/
                    this.tmpBubble.setPosition(cc.p(mmx, mmy));
                    this.tmpBubble.setTag(gubl);
                    if (this.tmpBubble.colorType < 7) {
                        this.allBubbles.push(this.tmpBubble);
                        this.search2(gubl, this.tmpBubble.colorType);
                    }
                    else {
                        this.nuj = [];
                    }
                    this.newBubble();
                    this.isStoped = 0;
                    i = this.allBubblesAmount;
                    if (this.nuj.length >= this.poc) {
                        //_parent._parent.umb.boy.gotoAndPlay("lve");
                        this.removeSameBubbles();
                        if(this.allBubbles.length > 0){
                            this.search1(this.allBubbles[0].getTag());
                        }
                        if (this.nuj.length == 7) {
                            //_parent._parent.cll.gotoAndPlay(2);
                            this.cler = 1;
                        }
                        if (this.nuj.length != this.allBubbles.length) {
                            //_parent._parent.sen.gotoAndPlay("good");
                           this.inspace();
                            //this.god.isStoped = 1;
                        }
                        else if (this.cler == 1) {
                            this.shts = 0;
                        }
                        else {
                            this.shts = this.dcup();
                        }
                    }
                    else if (this.getChildByTag(gubl).colorType == 7) {
                        var bomb = this.getChildByTag(gubl);
                        bomb.removeFromParent(true);
                        tag = gubl;
                        np = Math.floor(tag / 10);
                        nn = tag % 10;
                        ch = np % 2;
                        /* this.fire._x = child.getPosition().x;
                         this.fire._y = child.getPosition().y;*/
                        //this.fire.gotoAndPlay(2);
                        for (var k = 0; k < 6; k++) {
                            nump = np + this.arp[k];
                            numn = nn + this["arn" + ch][k];
                            var child = this.getChildByTag(nump * 10 + numn);
                            if (child && child.colorType < 9) {
                                child.removeFromParent(true);
                                for (var z = 0; z<this.allBubbles.length ; z++) {
                                    if (child == this.allBubbles[z]) {
                                        this.allBubbles.splice(z, 1);
                                    }
                                }
                            }
                        }
                        if(this.allBubbles.length > 0){
                            this.search1(this.allBubbles[0].getTag());
                        }
                        if (this.nuj.length == 7) {
                            //_parent._parent.cll.gotoAndPlay(2);
                            this.cler = 1;
                        }
                        if (this.nuj.length != this.allBubbles.length) {
                            this.inspace();
                            //this.god.isStoped = 1;
                        }
                        else if (this.cler == 1) {
                            this.shts = 0;
                        }
                        else {
                            this.shts = this.dcup();
                        }
                    }
                    else {
                        this.shts = this.dcup();
                    }
                }
            }
            if (this.tmpBubble.getPosition().x >= this.rightSider) {
                var bs = 0 | (Math.random() * 2) + 1;
                //_parent._parent["bun" + bs].gotoAndPlay(2);
                this.tmpBubble.setPositionX(this.rightSider - 0.5);
                this.xSpeed = this.xSpeed * -1;
            }
            if (this.tmpBubble.getPosition().x <= this.leftSider) {
                var bs = 0 | (Math.random() * 2) + 1;
                //_parent._parent["bun" + bs].gotoAndPlay(2);
                this.tmpBubble.setPositionX(this.leftSider + 0.5);
                this.xSpeed = this.xSpeed * -1;
            }


           /* ++this.u;
            this.gg = this.noj.length;
            var tmpChild;
            for (var i = 0; i < this.gg; i++) {
                tmpChild = this.getChildByTag(this.noj[i]);
                if(tmpChild){
                    tmpChild.setPositionY(tmpChild.getPositionY()+5 + this.u * 4)
                }
            }*/
           /* if (this.u == 25) {
                this.u = this.isStoped = 0;
                for (var i = 0; i < this.gg; i++) {
                    tmpChild = this.getChildByTag(this.noj[i]);
                    if(tmpChild){
                        tmpChild.removeFromParent(true);
                    }
                    *//*if (this.sht.cler == 1) {
                        this.shts = 0;
                        continue;
                    }
                    this.shts = this.sht.dcup();*//*
                }
            }*/
        }


        /* if (this.vib > 0) {
         ++this.vk;
         if (this.vk > vib) {
         this.vk = 0;
         this.ga = this.ga * -1;
         _parent._parent.wall._x = 331 + this.ga;
         for (var bb = 0; bb < this.ban; bb++) {
         this.allBubbles[bb].bb._x = this.ga;
         }
         }
         }*/
    }
});

PP.GameLayer.create = function () {
    var l = new PP.GameLayer();
    l.init();
    return l;
};