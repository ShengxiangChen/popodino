PP.GameLayer = cc.Layer.extend({
    game:null,
    mouse:cc.p(0, 0),
    radia:0.017453,
    st:0,
    tem:cc.p(0, 0),
    _rotation:0,
    player:null,
    init:function () {
        this._super();

        this.setTouchEnabled(true);

        this.spd = 1116;
        this.jir = 39;
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
        this.arp = [-1, -1, 0, 1, 1, 0];
        this.arn1 = [-1, 0, 1, 0, -1, -1];
        this.arn0 = [0, 1, 1, 1, 0, -1];
        this.gag = [-30, 30, 90, 150, -150, -90];
        this.hitl = this.px + this.jir / 2;
        this.hitr = this.px + this.jir * 8 - this.jir / 2;
        this.dep = 5000;
        this.udg = Math.sqrt(this.jir * this.jir - this.jir / 2 * (this.jir / 2));
        this.allb = [];
        //this.undeadb();
        this.stg = PP.lv % this.allst;
        if (this.stg == 0) {
            this.stg = this.allst;
        }
        if (this.stg % 10 == 0) {
            this.stg = 0 | (Math.random() * 2 + 90);
            this.yeb = 7;
            this.bst = 1;
        }
        else {
            this.yeb = 0 | (Math.random() * 5 + 1);
            this.bst = 0;
        }
        this.allsoc = [];

        /* this.st = this.u = this.vib = this.vk = 0;
         this.ga = 3;
         if (this.st == 1) {
         ++this.u;
         this.gg = this.noj.length;
         for (var i = 0; i < this.gg; i++) {
         this.noj[i]._y = this.noj[i]._y + (5 + this.u * 4);
         }
         if (this.u == 25) {
         this.u = this.st = 0;
         for (var i = 0; i < this.gg; i++) {
         this.noj[i].removeMovieClip();
         if (this.sht.cler == 1) {
         this.shts = 0;
         continue;
         }
         this.shts = this.sht.dcup();
         }
         }
         }
         if (this.vib > 0) {
         ++this.vk;
         if (this.vk > vib) {
         this.vk = 0;
         this.ga = this.ga * -1;
         _parent._parent.wall._x = 331 + this.ga;
         for (var bb = 0; bb < this.ban; bb++) {
         this.allb[bb].bb._x = this.ga;
         }
         }
         }*/

        this.player = cc.Sprite.create("res/a2.png");
        this.player.setPosition(cc.p(160, 16));
        this.addChild(this.player);
        this.sett(this.stg);
        this.newbl();
    },
    setGame:function (v) {
        this.game = v;
    },
    sett:function (typenum) {
        var level = PP.LEVEL["ty" + typenum];
        var nums = level.length;
        var arr = 8;
        var sx = this.px + this.jir / 2;
        var sy = this.py - this.jir / 2;
        var lines = 1;
        var ars = 0;
        for (var i = 0; i < nums; i++) {
            if (level[i] > 0) {
                var b = PP.Bubble.create(level[i]);
                b.setPosition(cc.p(sx, sy));
                this.addChild(b, this.dep, parseInt(lines + "" + ars));
                b.my = level[i];
                this.allb.push(b);
                ++this.dep;
            }
            ++ars;
            sx = sx + this.jir;
            if (arr == ars) {
                if (arr == 8) {
                    sx = this.px + this.jir;
                    arr = 7;
                }
                else {
                    sx = this.px + this.jir / 2;
                    arr = 8;
                }
                ars = 0;
                ++lines;
                sy = sy - this.udg;
            }
        }
    },
    gos:function () {
        //PP.hrr.i = 0;
        //PP.hrr.gotoAndStop(1);
        //_parent._parent.ssh.gotoAndPlay(2);
        this.shts = 0;
        this.st = 1;
        this.xp = Math.sin(this.radia * this.player.getRotation()) * this.spd;
        this.yp = Math.cos(this.radia * this.player.getRotation()) * this.spd;
        this.alls = this.allb.length;
        ++this.hcount;
    },
    dcup:function () {
        var _loc2 = 1;
        ttem = this.downc - this.hcount;
        if (ttem < 4) {
            this.god.vib = ttem;
            this.god.ban = this.allb.length;
        }
        if (this.downc == this.hcount) {
            this.alldown();
            this.hcount = 0;
        }
        if (this.scanover()) {
            _loc2 = 0;
            /*_parent.hrr.i = 500;
             _parent._parent.ov.gotoAndPlay(2);*/
        }
        return (_loc2);
    },
    undeadb:function () {
        sx = px + jir;
        sy = py - (udg - jir / 2);
        for (i = 0; i < 7; i++) {
            this.attachMovie("b0", "p0n" + i, dep);
            this["p0n" + i]._x = sx;
            this["p0n" + i]._y = sy;
            this["p0n" + i].my = 9;
            allb.push("p0n" + i);
            ++dep;
            sx = sx + jir;
        }
    },
    alldown:function () {
        ++wallc;
        var _loc3 = random(2);
        _parent.umb.boy.gotoAndPlay("dn" + _loc3);
        _parent.sen.gotoAndPlay("bad");
        _parent.umb._y = _parent.umb._y - 15;
        if (wallc == 6) {
            _parent.rbt.gotoAndStop(2);
        }
        _parent.wall._y = _parent.wall._y + udg;
        _parent.wall._x = 331;
        _parent.mit.gotoAndPlay(2);
        alls = allb.length;
        for (i = 0; i < alls; i++) {
            this[allb[i]].bb._x = 0;
            this[allb[i]]._y = this[allb[i]]._y + udg;
        }
    },
    serch1:function (blna) {
        this.ye = [];
        this.nuj = [];
        this.noj = [];
        this.res = [];
        var whi = 1;
        while (whi) {
            var ij1 = this.ye.length;
            var ij2 = this.nuj.length;
            this.noj = [];
            for (var i = 0; i < ij1; i++) {
                var finds = 0;
                for (var ii = 0; ii < ij2; ii++) {
                    if (this.ye[i] == this.nuj[ii]) {
                        finds = 1;
                    }
                }
                if (finds == 0) {
                    this.noj.push(ye[i]);
                }
            }
            this.ye = [];
            var tes = noj.length;
            for (var i = 0; i < tes; i++) {
                this.ye[i] = this.noj[i];
            }
            if (tes == 0) {
                whi = 0;
                continue;
            }
            this.res = [];
            for (var i = 0; i < tes; i++) {
                this.nuj.push(this.ye[i]);
                var mus = this.ye[i].length;
                var mus2 = mus - 3;
                var np = this.ye[i].substr(1, mus2);
                var nn = this.ye[i].substr(-1, 1);
                var ch = Number(np) % 2;
                for (ii = 0; ii < 6; ii++) {
                    var nump = Number(np) + arp[ii];
                    var numn = Number(nn) + this["arn" + ch][ii];
                    if (Number(this["p" + nump + "n" + numn].my) < 10) {
                        this.res.push("p" + nump + "n" + numn);
                    }
                }
            }
            this.res.sort();
            var ap = this.res.length;
            this.ye = [];
            var idx = -1;
            for (var i = 0; i < ap; i++) {
                if (this.ye[idx] != this.res[i]) {
                    ++idx;
                    this.ye[idx] = this.res[i];
                }
            }
        }
    },
    serch2:function (blna, key) {
        this.ye = [];
        this.nuj = [];
        this.noj = [];
        this.res = [];
        var whi = 1;
        while (whi) {
            var ij1 = this.ye.length;
            var ij2 = this.nuj.length;
            this.noj = [];
            for (var i = 0; i < ij1; i++) {
                var finds = 0;
                for (var ii = 0; ii < ij2; ii++) {
                    if (this.ye[i] == this.nuj[ii]) {
                        finds = 1;
                    }
                }
                if (finds == 0) {
                    this.noj.push(this.ye[i]);
                }
            }
            this.ye = [];
            var tes = this.noj.length;
            for (i = 0; i < tes; i++) {
                this.ye[i] = this.noj[i];
            }
            if (tes == 0) {
                whi = 0;
                continue;
            }
            this.res = [];
            for (var i = 0; i < tes; i++) {
                this.nuj.push(this.ye[i]);
                var mus = this.ye[i].length;
                var mus2 = mus - 3;
                var np = this.ye[i].substr(1, mus2);
                var nn = this.ye[i].substr(-1, 1);
                var ch = Number(np) % 2;
                for (var ii = 0; ii < 6; ii++) {
                    var nump = Number(np) + this.arp[ii];
                    var numn = Number(nn) + this["arn" + ch][ii];
                    if (Number(this["p" + nump + "n" + numn].my) == key) {
                        this.res.push(parseInt(nump + "" + numn));
                    }
                }
            }
            this.res.sort();
            var ap = this.res.length;
            this.ye = [];
            var idx = -1;
            for (i = 0; i < ap; i++) {
                if (this.ye[idx] != this.res[i]) {
                    ++idx;
                    this.ye[idx] = this.res[i];
                }
            }
        }
    },
    samerem:function () {
        _parent.remv.gotoAndPlay(2);
        var _loc6 = nuj.length;
        if (this[nuj[0]].my == 6) {
            _parent.spes.gotoAndPlay(2);
            _parent.sco = _parent.sco + 2000;
        }
        _parent.sco = _parent.sco + _loc6 * 10;
        _parent.numv(_parent.sco, "scom", 6);
        for (var _loc4 = 0; _loc4 < _loc6; ++_loc4) {
            this.attachMovie("ppo", "ppo" + dep, dep);
            this["ppo" + dep]._x = this[nuj[_loc4]]._x;
            this["ppo" + dep]._y = this[nuj[_loc4]]._y;
            ++dep;
            this[nuj[_loc4]].removeMovieClip();
            var _loc5 = allb.length;
            for (var _loc3 = 0; _loc3 < _loc5; ++_loc3) {
                if (allb[_loc3] == nuj[_loc4]) {
                    allb.splice(_loc3, 1);
                    _loc3 = _loc5;
                }
            }
        }
    },
    inspace:function () {
        var ij1 = this.allb.length;
        var ij2 = this.nuj.length;
        this.noj = new Array();
        for (i = 0; i < ij1; i++) {
            finds = 0;
            for (ii = 0; ii < ij2; ii++) {
                if (allb[i] == nuj[ii]) {
                    finds = 1;
                }
            }
            if (finds == 0) {
                noj.push(allb[i]);
            }
        }
        kk = noj.length;
        for (i = 0; i < kk; i++) {
            kj = allb.length;
            for (ii = 0; ii < kj; ii++) {
                if (allb[ii] == noj[i]) {
                    allb.splice(ii, 1);
                    ii = kj;
                }
            }
        }
        spe = kk * 20;
        _parent.sco = _parent.sco + spe;
        _parent.numv(_parent.sco, "scom", 6);
        _parent.spe.sco = spe;
        _parent.spe.st = 1;
        _parent.spe.i = 0;
        _parent.spe.gotoAndStop(2);
    },
    scanover:function () {
        var _loc3 = 0;
        var _loc2 = allb.length;
        for (i = 0; i < _loc2; i++) {
            if (this[allb[i]]._y > deathy) {
                i = _loc2;
                _loc3 = 1;
            }
        }
        return (_loc3);
    },
    onTouchesBegan:function (touches) {
        this._super();
        this.mouse = touches[0].getLocation();
        if (/*this.shts == 1 && */(this.mouse.x > 15 && this.mouse.x < 315)) {
            var xdis = this.mouse.x - this.player.getPosition().x;
            var ydis = this.mouse.y - this.player.getPosition().y;
            var gagy = -(Math.atan2(ydis, xdis) / this.radia - 90);
            if (gagy < 80 && gagy > -80) {
                if (gagy != this.player.getRotation()) {
                    this.player.setRotation(gagy);
                }
            }
            this.gos();
        }
    },
    onTouchesMoved:function (touches) {
        this._super();
    },
    onTouchesEnded:function (touches) {
        this._super();
    },
    newbl:function () {
        var randomBubble = 0 | (Math.random() * 7);
        this.tem = PP.Bubble.create(randomBubble);
        this.tem.setPosition(this.player.getPosition());
        this.addChild(this.tem, this.dep, this.yeb);
        this.tem.my = this.yeb;

        var ext = 0 | (Math.random() * 50);
        if (ext == 35) {
            this.yeb = 6;
        }
        else if (ext < 5 || this.bst == 1) {
            this.yeb = 7;
        }
        else {
            this.allsoc = [];
            var alls = this.allb.length;
            for (var i = 0; i < alls; i++) {
                var rem = this.allb[i].my;
                if (rem < 6) {
                    this.allsoc.push(rem);
                }
            }
            var uem = 0 | (Math.random() * this.allsoc.length);
            this.yeb = this.allsoc[uem];
        }
        ++this.dep;
        //_parent.girl.girl.yebm.gotoAndStop(yeb);
        //_parent.girl.yeb = yeb;
    },
    update:function (dt) {
        if (this.st == 1) {
            this.tem.setPosition(cc.pAdd(this.tem.getPosition(), cc.p(this.xp * dt, this.yp * dt)));
            for (var i = 0; i < this.alls; i++) {
                var tempBubble = this.allb[i];
                var myx = this.tem.getPosition().x;
                var myy = this.tem.getPosition().y;
                var tx = tempBubble.getPosition().x;
                var ty = tempBubble.getPosition().y;
                var s1 = myx - tx;
                var s2 = myy - ty;
                var sect = Math.sqrt(s1 * s1 + s2 * s2);
                if (sect < this.jir) {
                    var mun = this.allb[i].getTag() + "";
                    var mus = mun.length;
                    var mus2 = mus - 1;
                    var np = mun.substr(1, mus2);
                    var nn = mun.substr(-1, 1);
                    var gus = 100;
                    var mmx = 0, mmy = 0;
                    var gubl = "";
                    var ch = Number(np) % 2;
                    for (var ii = 0; ii < 6; ii++) {
                        var nump = Number(np) + this.arp[ii];
                        var numn = Number(nn) + this["arn" + ch][ii];
                        var tmp = this.getChildByTag(parseInt(nump + "" + numn));
                        if (tmp && tmp.my != null) {
                            var radi = 0.017453 * this.gag[ii];
                            tx = tempBubble.getPosition().x + Math.sin(radi) * this.jir;
                            ty = tempBubble.getPosition().y + Math.cos(radi) * -1 * this.jir;
                            s1 = myx - tx;
                            s2 = myy - ty;
                            sect = Math.sqrt(s1 * s1 + s2 * s2);
                            if (sect < gus) {
                                gus = sect;
                                mmx = tx;
                                mmy = ty;
                                gubl = 0 | (nump + "" + numn);
                            }
                        }
                    }
                    //this.tem.filters = _parent.filter_array0;
                    //_parent._parent.sit.gotoAndPlay(2);
                    /*_parent._parent.flas._x = this.tem._x = mmx;
                     _parent._parent.flas._y = this.tem._y = mmy;
                     _parent._parent.flas.gotoAndPlay(2);*/
                    this.tem.setPosition(cc.p(mmx, mmy));
                    this.tem.setTag(gubl);
                    if (this.tem.my < 7) {
                        this.allb.push(this.tem);
                        this.serch2(gubl, this.tem.my);
                    }
                    else {
                        this.nuj = [];
                    }
                    this.newbl();
                    this.st = 0;
                    i = this.alls;
                    if (this.nuj.length >= this.poc) {
                        //_parent._parent.umb.boy.gotoAndPlay("lve");
                        this.samerem();
                        this.serch1("00");
                        if (this.nuj.length == 7) {
                            //_parent._parent.cll.gotoAndPlay(2);
                            this.cler = 1;
                        }
                        if (this.nuj.length != this.allb.length) {
                            //_parent._parent.sen.gotoAndPlay("good");
                            this.inspace();
                            this.god.st = 1;
                        }
                        else if (this.cler == 1) {
                            this.shts = 0;
                        }
                        else {
                            this.shts = this.dcup();
                        }
                    }
                    else if (this.getChildByTag(gubl).my == 7) {
                        //var child = this.getChildByTag(gubl);
                        mun = gubl + "";
                        mus = mun.length;
                        mus2 = mus - 3;
                        np = mun.substr(1, mus2);
                        nn = mun.substr(-1, 1);
                        ch = Number(np) % 2;
                        /* this.fire._x = child.getPosition().x;
                         this.fire._y = child.getPosition().y;*/
                        //this.fire.gotoAndPlay(2);
                        //_parent[gubl].removeMovieClip();
                        for (var ii = 0; ii < 6; ii++) {
                            nump = Number(np) + this.arp[ii];
                            numn = Number(nn) + this["arn" + ch][ii];
                            var child = this.getChildByTag(gubl);
                            if (child.my < 9) {
                                child.removeFromParent(true);
                                for (var z = 0; z < this.allb.length; z++) {
                                    if (this.allb[z].getTag() == parseInt(nump + "" + numn)) {
                                        this.allb.splice(z, 1);
                                    }
                                }
                            }
                        }
                        this.serch1("00");
                        if (this.nuj.length == 7) {
                            //_parent._parent.cll.gotoAndPlay(2);
                            this.cler = 1;
                        }
                        if (this.nuj.length != this.allb.length) {
                            this.inspace();
                            this.god.st = 1;
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
                    continue;
                }
            }
            if (this.tem.getPosition().x >= this.hitr) {
                var bs = 0 | (Math.random() * 2) + 1;
                //_parent._parent["bun" + bs].gotoAndPlay(2);
                this.tem.setPositionX(this.hitr - 0.5);
                this.xp = this.xp * -1;
            }
            if (this.tem.getPosition().x <= this.hitl) {
                var bs = 0 | (Math.random() * 2) + 1;
                //_parent._parent["bun" + bs].gotoAndPlay(2);
                this.tem.setPositionX(this.hitl + 0.5);
                this.xp = this.xp * -1;
            }
        }
    }
});

PP.GameLayer.create = function () {
    var l = new PP.GameLayer();
    l.init();
    return l;
};