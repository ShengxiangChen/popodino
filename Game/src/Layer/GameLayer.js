PP.GameLayer = cc.Layer.extend({
    game: null,
    mouse: cc.p(0, 0),
    radian: 0.017453,
    tmpBubble: cc.p(0, 0),
    turret: null,
    container: null,
    speed: 900,
    diameter: 34,
    px: 24,
    py: 428,
    poc2: 3,
    deathy: 80,
    allst: 30,
    wallPosY: 0,
    hitCount: 0,
    depth: 5000,
    yGap: null,
    xGap1: null,
    xGap0: null,
    arrDistance: null,
    leftSider: 0,
    rightSider: 0,
    allBubbles: null,
    gapDistance: 0,
    dontNeedToDeleted: null,
    needToBeDeleted: null,
    res: null,
    originBubbles: null,
    allBubblesColorType: null,
    xDvalue: 3,
    stoped: 0,
    u: 0,
    dvalueHitCount: 0,
    currentDt: 0,
    downCount: 0,
    poc: 0,
    curLevel: 0,
    bst: 0,
    shts:1,
    ctor: function () {
        this._super();
        this.yGap = [1, 1, 0, -1, -1, 0];
        this.xGap1 = [-1, 0, 1, 0, -1, -1];
        this.xGap0 = [0, 1, 1, 1, 0, -1];
        this.arrDistance = [-30, 30, 90, 150, -150, -90];
        this.leftSider = this.px + this.diameter / 2;
        this.rightSider = this.px + this.diameter * 8 - this.diameter / 2;
        this.gapDistance = Math.sqrt(this.diameter * this.diameter - this.diameter / 2 * (this.diameter / 2));
        this.allBubbles = [];
        this.dontNeedToDeleted = [];
        this.allBubblesColorType = [];
    },
    init: function () {
        this._super();
        window.layer = this;
        var t = sys.platform;
        var os = sys.os;
        this.setTouchEnabled(true);
        /*if(t = 'browser'){
         this.setMouseEnabled(true);
         }
         else{
         this.setTouchEnabled(true);
         }*/


        if (cc.renderMode = cc.WEBGL) {
            this.container = cc.SpriteBatchNode.create(Bubble_png);
            this.addChild(this.container, 100);
        }
        else {
            this.container = this;
        }

        this.undeadBubbles();

        this.turret = cc.Sprite.create(Turret);
        this.turret.setAnchorPoint(cc.p(0.5, 0.31));
        this.turret.setPosition(cc.pAdd(PP.VisibleRect.bottom(), cc.p(0, 46)));
        this.addChild(this.turret, 11);

        var pad = cc.Sprite.create(Pad);
        pad.setPosition(cc.pAdd(PP.VisibleRect.bottom(), cc.p(0, 16)));
        this.addChild(pad, 10);
    },
    onEnter: function () {
        this._super();
        this.initGameData();
        this.gameSetting();
        this.newBubble();
    },
    initGameData: function () {
        this.poc = parseInt((PP.lv - 1) / this.allst) + this.poc2;
        this.downCount = 18 - PP.dlv2 * 2;
        this.curLevel = PP.lv % this.allst;
        if (this.curLevel == 0) {
            this.curLevel = this.allst;
        }
        if (this.curLevel % 10 == 0) {
            this.curLevel = 0 | (Math.random() * 2 + 90);
            this.colorType = 7;
            this.bst = 1;
        }
        else {
            this.colorType = 0 | (Math.random() * 5 + 1);
            this.bst = 0;
        }
        this.game.getBgLayer().resetWall();
    },
    setGame: function (v) {
        this.game = v;
    },
    gameSetting: function () {
        var level = PP.LEVEL["ty" + this.curLevel];
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
                this.container.addChild(bubble, this.depth, lines * 10 + ars);
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
                sy = sy - this.gapDistance;
            }
        }
    },
    gos: function () {
        //PP.hrr.i = 0;
        //PP.hrr.gotoAndStop(1);
        //_parent._parent.ssh.gotoAndPlay(2);
        this.shts = 0;
        this.stoped = 1;
        this.xSpeed = Math.sin(this.radian * this.turret.getRotation()) * this.speed;
        this.ySpeed = Math.cos(this.radian * this.turret.getRotation()) * this.speed;
        this.allBubblesAmount = this.allBubbles.length;
        ++this.hitCount;
    },
    setGameState: function () {
        var dc = 1;
        var ttem = this.downCount - this.hitCount;
        if (ttem < 4) {
            this.dvalueHitCount = ttem;
        }
        if (this.downCount <= this.hitCount) {
            this.allGoDown();
            this.hitCount = 0;
        }
        if (this.checkGameOver()) {
            cc.log("Game Over");
            dc = 0;
            /*_parent.hrr.i = 500;
             _parent._parent.ov.gotoAndPlay(2);*/
        }
        return dc;
    },
    undeadBubbles: function () {
        var sx = this.px + this.diameter;
        var sy = this.py + (this.gapDistance - this.diameter / 2);
        for (var i = 1; i < 8; i++) {
            var child = PP.Bubble.create(1);
            this.container.addChild(child, this.depth, i);
            child.setPosition(cc.p(sx, sy));
            child.setVisible(false);
            child.colorType = 9;
            this.allBubbles.push(child);
            ++this.depth;
            sx = sx + this.diameter;
        }
    },
    allGoDown: function () {
        ++this.wallPosY;
        //var _loc3 = Math.random()*2;
        //_parent.umb.boy.gotoAndPlay("dn" + _loc3);
        //_parent.sen.gotoAndPlay("bad");
        //_parent.umb._y = _parent.umb._y - 15;
        /* if (this.wallPosY == 6) {
         _parent.rbt.gotoAndStop(2);
         }*/
        this.game.getBgLayer().wallGoDown(this.gapDistance);
        //this.mit.gotoAndPlay(2);
        var bubble;
        for (var i = 0; i < this.allBubbles.length; i++) {
            bubble = this.allBubbles[i];
            bubble.setPosition(cc.pSub(bubble.getPosition(), cc.p(0, this.gapDistance)));
        }
    },
    searchPath1: function (blna) {
        var originBubbles = [blna];
        var remainingBubbles = [];
        this.needToBeDeleted = [];
        this.dontNeedToDeleted = [];

        var whi = 1;
        while (whi) {
            this.dontNeedToDeleted = [];
            for (var i = 0; i < originBubbles.length; i++) {
                var finds = 0;
                for (var j = 0; j < this.needToBeDeleted.length; j++) {
                    if (originBubbles[i] == this.needToBeDeleted[j]) {
                        finds = 1;
                    }
                }
                if (finds == 0) {
                    this.dontNeedToDeleted.push(originBubbles[i]);
                }
            }
            originBubbles = [];
            var tes = this.dontNeedToDeleted.length;
            for (var i = 0; i < tes; i++) {
                originBubbles[i] = this.dontNeedToDeleted[i];
            }
            if (tes == 0) {
                whi = 0;
                continue;
            }
            remainingBubbles = [];
            for (var i = 0; i < tes; i++) {
                var tag = originBubbles[i];
                this.needToBeDeleted.push(tag);
                var np = Math.floor(tag / 10);
                var nn = tag % 10;
                var ch = np % 2;
                for (var j = 0; j < 6; j++) {
                    var nump = np + this.yGap[j];
                    var numn = nn + this["xGap" + ch][j];
                    var n = nump * 10 + numn;
                    if (n != -1) {
                        var child = this.container.getChildByTag(n);
                        if (child && child.colorType < 10) {
                            remainingBubbles.push(n);
                        }
                    }
                }
            }
            remainingBubbles.sort();
            var ap = remainingBubbles.length;
            originBubbles = [];
            for (var i = 0; i < ap; i++) {
                originBubbles.push(remainingBubbles[i]);
            }
        }
    },
    searchPath2: function (blna, key) {
        var originBubbles = [blna];
        var remainingBubbles = [];
        this.needToBeDeleted = [];
        this.dontNeedToDeleted = [];

        var whi = 1;
        while (whi) {
            this.dontNeedToDeleted = [];
            for (var i = 0; i < originBubbles.length; i++) {
                var finds = 0;
                for (var j = 0; j < this.needToBeDeleted.length; j++) {
                    if (originBubbles[i] == this.needToBeDeleted[j]) {
                        finds = 1;
                    }
                }
                if (finds == 0) {
                    this.dontNeedToDeleted.push(originBubbles[i]);
                }
            }
            originBubbles = [];
            var tes = this.dontNeedToDeleted.length;
            for (i = 0; i < tes; i++) {
                originBubbles[i] = this.dontNeedToDeleted[i];
            }
            if (tes == 0) {
                whi = 0;
                continue;
            }
            remainingBubbles = [];
            for (var i = 0; i < tes; i++) {
                var tag = originBubbles[i];
                this.needToBeDeleted.push(tag);
                var np = Math.floor(tag / 10);
                var nn = tag % 10;
                var ch = np % 2;
                for (var j = 0; j < 6; j++) {
                    var nump = np + this.yGap[j];
                    var numn = nn + this["xGap" + ch][j];
                    var n = nump * 10 + numn;
                    if (n != -1) {
                        var child = this.container.getChildByTag(n);
                        if (child && child.colorType == key) {
                            remainingBubbles.push(n);
                        }
                    }
                }
            }
            remainingBubbles.sort();
            originBubbles = [];
            for (i = 0; i < remainingBubbles.length; i++) {
                originBubbles.push(remainingBubbles[i]);
            }
        }
    },
    removeSameBubbles: function () {
        //_parent.remv.gotoAndPlay(2);
        var sco = this.needToBeDeleted.length;
        if (this.needToBeDeleted[0].colorType == 6) {
            //_parent.spes.gotoAndPlay(2);
            this.game.getUILayer().addScore(2000);
        }
        this.game.getUILayer().addScore(sco * 10);
        //_parent.numv(_parent.sco, "scom", 6);
        for (var i = 0; i < this.needToBeDeleted.length; ++i) {
            var bubbleLen = this.allBubbles.length;
            for (var j = 0; j < bubbleLen; j++) {
                var child = this.allBubbles[j];
                if (child && child.getTag() == this.needToBeDeleted[i]) {
                    child.removeFromParent(true);
                    this.allBubbles.splice(j, 1);
                    j = bubbleLen;
                }
            }
        }
    },
    removeBubblesInSpace: function () {
        this.dontNeedToDeleted = [];
        for (i = 0; i < this.allBubbles.length; i++) {
            var finds = 0;
            for (var j = 0; j < this.needToBeDeleted.length; j++) {
                if (this.allBubbles[i].getTag() == this.needToBeDeleted[j]) {
                    finds = 1;
                }
            }
            if (finds == 0) {
                this.dontNeedToDeleted.push(this.allBubbles[i].getTag());
            }
        }
        var kk = this.dontNeedToDeleted.length;
        var spawn = cc.Spawn.create(cc.MoveBy.create(0.3,cc.p(0,-50)),cc.FadeOut.create(0.3)),seq;

        for (var i = 0; i < kk; i++) {
            var bubbleLen = this.allBubbles.length;
            for (var j = 0; j < bubbleLen; j++) {
                var child = this.allBubbles[j];
                if (child && child.colorType < 9 && child.getTag() == this.dontNeedToDeleted[i]) {
                    seq = cc.Sequence.create(spawn.copy(), cc.CallFunc.create(child.removeFromParent,child,true));
                    child.runAction(seq);
                    //child.removeFromParent(true);
                    this.allBubbles.splice(j, 1);
                    j = bubbleLen;
                }
            }
        }
        var spe = kk * 20;
        //score
        this.game.getUILayer().addScore(spe);
        //this.numv(this.game.getUILayer().score, 6);
        /* _parent.sco = _parent.sco + spe;
         _parent.numv(_parent.sco, "scom", 6);
         _parent.spe.sco = spe;
         _parent.spe.stoped = 1;
         _parent.spe.i = 0;
         _parent.spe.gotoAndStop(2);*/
    },
    numv: function (ints, legs) {
        var _loc3 = 1;
        for (var i = 0; i < legs; i++) {
            var _loc2 = parseInt(ints / _loc3) % 10 + 1;
            console.log(_loc2)
            //this[tgt]["b" + i].gotoAndStop(_loc2);
            _loc3 = _loc3 * 10;
        }
    },
    checkGameOver: function () {
        var isGameOver = false;
        var len = this.allBubbles.length;
        for (var i = 0; i < len; i++) {
            if (this.allBubbles[i].getPosition().y < this.deathy) {
                i = len;
                isGameOver = true;
            }
        }
        return isGameOver;
    },
    onTouchesBegan: function (touches) {
        this._super();
        this.rotateWeapon(touches[0].getLocation());
    },
    onTouchesMoved: function (touches) {
        this._super();
        this.rotateWeapon(touches[0].getLocation());
    },
    onTouchesEnded: function (touches) {
        this._super();
        this.shoot();
    },
    onMouseDown: function (event) {
        this._super();
        this.rotateWeapon(event.getLocation());
    },
    onMouseMoved: function (event) {
        this._super();
        this.rotateWeapon(event.getLocation());
    },
    onMouseDragged: function (event) {
        this._super();
        this.rotateWeapon(event.getLocation());
    },
    onMouseUp: function (event) {
        this._super();
        this.shoot();
    },
    shoot: function () {
        var startGO = !this.game.waitingForGetSet;
        if (this.shts == 1 &&  startGO && (this.mouse.x > 15 && this.mouse.x < 315)) {
            this.gos();
        }
    },
    rotateWeapon: function (pos) {
        this.mouse = pos;
        var xdis = this.mouse.x - this.turret.getPosition().x;
        var ydis = this.mouse.y - this.turret.getPosition().y;
        var gagy = -(Math.atan2(ydis, xdis) / this.radian - 90);
        if (gagy < 80 && gagy > -80) {
            if (gagy != this.turret.getRotation()) {
                this.turret.setRotation(gagy);
            }
        }
    },
    newBubble: function () {
        this.tmpBubble = PP.Bubble.create(this.colorType);
        this.tmpBubble.setPosition(this.turret.getPosition());
        this.container.addChild(this.tmpBubble, this.depth);
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
            for (var i = 0; i < this.allBubbles.length; i++) {
                var rem = this.allBubbles[i].colorType;
                if (rem < 6) {
                    this.allBubblesColorType.push(rem);
                }
            }
            var uem = 0 | (Math.random() * this.allBubblesColorType.length);
            this.colorType = this.allBubblesColorType[uem];
        }
        ++this.depth;
        this.game.getUILayer().sister.setBubbleType(this.colorType);
    },
    update: function (dt) {
        if (this.stoped == 1) {
            this.tmpBubble.setPosition(cc.pAdd(this.tmpBubble.getPosition(), cc.p(this.xSpeed * dt, this.ySpeed * dt)));
            for (var i = 0; i < this.allBubbles.length; i++) {
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
                        var nump = np + this.yGap[j];
                        var numn = nn + this["xGap" + ch][j];
                        var isExitBubble = this.container.getChildByTag(nump * 10 + numn);
                        if (isExitBubble == null) {
                            var radian = this.radian * this.arrDistance[j];
                            var tx = tempBubble.getPosition().x + Math.sin(radian) * this.diameter;
                            var ty = tempBubble.getPosition().y - Math.cos(radian) * this.diameter;
                            p = cc.pSub(this.tmpBubble.getPosition(), cc.p(tx, ty));
                            distance = cc.pLength(p);
                            if (distance < gus) {
                                gus = distance;
                                mmx = tx;
                                mmy = ty;
                                gubl = nump * 10 + numn;
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
                        this.searchPath2(gubl, this.tmpBubble.colorType);
                    }
                    else {
                        this.needToBeDeleted = [];
                    }
                    this.newBubble();
                    this.stoped = 0;
                    i = this.allBubbles.length;
                    if (this.needToBeDeleted.length >= this.poc) {
                        //_parent._parent.umb.boy.gotoAndPlay("lve");
                        this.removeSameBubbles();
                        this.searchPath1(0);
                        if (this.needToBeDeleted.length == 7) {
                            //_parent._parent.cll.gotoAndPlay(2);
                            this.cleared = 1;
                        }
                        if (this.needToBeDeleted.length != this.allBubbles.length) {
                            //_parent._parent.sen.gotoAndPlay("good");
                            this.removeBubblesInSpace();
                            //this.stoped = 1;
                        }

                        if (this.cleared == 1) {
                            this.shts = 0;
                        }
                        else {
                            this.shts = this.setGameState();
                        }
                    }
                    else if (this.container.getChildByTag(gubl).colorType == 7) {
                        var bomb = this.container.getChildByTag(gubl);
                        bomb.removeFromParent(true);
                        tag = gubl;
                        np = Math.floor(tag / 10);
                        nn = tag % 10;
                        ch = np % 2;
                        /* this.fire._x = child.getPosition().x;
                         this.fire._y = child.getPosition().y;*/
                        //this.fire.gotoAndPlay(2);
                        for (var k = 0; k < 6; k++) {
                            nump = np + this.yGap[k];
                            numn = nn + this["xGap" + ch][k];
                            var child = this.container.getChildByTag(nump * 10 + numn);
                            if (child && child.colorType < 9) {
                                child.removeFromParent(true);
                                for (var z = 0; z < this.allBubbles.length; z++) {
                                    if (child == this.allBubbles[z]) {
                                        this.allBubbles.splice(z, 1);
                                    }
                                }
                            }
                        }
                        this.searchPath1(0);
                        if (this.needToBeDeleted.length == 7) {
                            //_parent._parent.cll.gotoAndPlay(2);
                            this.cleared = 1;
                        }
                        if (this.needToBeDeleted.length != this.allBubbles.length) {
                            this.removeBubblesInSpace();
                            //this.stoped = 1;
                        }

                        if (this.cleared == 1) {
                            this.shts = 0;
                        }
                        else {
                            this.shts = this.setGameState();
                        }
                    }
                    else {
                        this.shts = this.setGameState();
                    }
                }
            }
            var posX = this.tmpBubble.getPosition().x;
            if (posX >= this.rightSider) {
                this.tmpBubble.setPositionX(this.rightSider - 0.5);
                this.xSpeed = this.xSpeed * -1;
            }
            else if (posX <= this.leftSider) {
                this.tmpBubble.setPositionX(this.leftSider + 0.5);
                this.xSpeed = this.xSpeed * -1;
            }

            if (this.allBubbles.length == 7) {
                cc.log("Game Start");
                this.game.levelUp();
            }
        }

        //shake the fucking bubbles
        this.shakeBubbles(dt);
    },

    shakeBubbles: function (dt) {
        if (this.dvalueHitCount > 0) {
            this.currentDt += dt;
            if (this.currentDt > 0.1) {
                this.currentDt = 0;
                this.xDvalue = this.xDvalue * -1;
                var bubble;
                for (var i = 0; i < this.allBubbles.length; i++) {
                    bubble = this.allBubbles[i];
                    bubble.setPosition(cc.pAdd(cc.p(this.xDvalue, 0), bubble.getPosition()));
                }
            }
        }
    }
});

PP.GameLayer.create = function () {
    var l = new PP.GameLayer();
    l.init();
    return l;
};