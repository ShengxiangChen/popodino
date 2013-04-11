PP.GameScene = cc.Scene.extend({
    lock:false,
    addBubble:false,
    W:320,
    R:16,
    size:null,
    maxh:null,
    maxX:null,
    maxY:null,
    sl:null,
    st:null,
    bubbles:[],
    cache:null,
    grid:[],
    timer:null,
    GameOver:true,
    colors:["red", "blue", "pink"],
    sum:0,
    stage:1,
    iAngle:-Math.PI / 2,
    Yd:Math.floor(Math.sqrt(3) * this.RR),
    intervals:["", 10, 12, 16, 22, 30],
    init:function () {
        this._super();
        this.size = this.R * 2;
        this.maxh = 480 - this.R * 3;
        this.maxX = this.W - this.size;
        this.maxY = this.maxh - this.size;
        this.sl = this.W / 2 - this.R;
        this.st = this.maxh + this.R / 2;

        this.rows = parseInt(this.maxh / this.size);
        this.cols = parseInt(this.W / this.size)

        for (var i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (var j = 0; j < this.cols; j++) {
                var bubble = PP.Bubble.create(PP.BubbleType.Bule);
                //this.addChild(bubble);
                this.bubbles.push(bubble);
                this.grid[i][j] = [];
            }
        }
        this.schedule(this.update);
        //$cache = PP.bubbles.slice(0);
    },
    isEmpty:function () {
        for (var i = 0; i < this.cols; i++) {
            if (this.grid[0][i].length) return false;
        }
        return true;
    },
    Vserch:function (cl, b) {
        var ct = 0, y = this.rows - 1, x = parseInt(cl / this.size), expand = cl % this.size > 0, hit = false;
        var $$ = function (pos) {
            var len = pos.length, g, arr = [];
            if (len) {
                for (var i = 0; i < len; i++) {
                    g = pos[i];
                    if (g.b != b && Math.abs(g.l - cl) < this.size) {
                        arr.push({l:g.l, t:g.t});
                    }
                }
                if (arr.length) {
                    if (arr.length > 1) arr.sort(function (a, b) {
                        return b.t - a.t;
                    });
                    ct = arr[0].t + this.Yd;
                    if (cl == arr[0].l) cl = cl - R;
                    hit = true;
                }
            }
        };
        while (!hit && y >= 0) {
            $$(this.grid[y][x]);
            if (!hit && expand) $$(this.grid[y][x + 1]);
            y--;
        }
        if (!hit && cl % this.size > 0) cl = cl - this.R;
        return cc.p(cl,ct);
    },
    record:function (bubble, cl, ct) {
        var x = parseInt(cl / this.size), y = parseInt(ct / this.size);
        this.grid[y][x].push({b:bubble, l:cl, t:ct});
        if (cl % this.size > 0) this.grid[y][x + 1].push({b:bubble, l:cl, t:ct});
        if (ct % this.size > 0 && ct < this.maxY) {
            this.grid[y + 1][x].push({b:bubble, l:cl, t:ct});
            if (cl % this.size > 0) this.grid[y + 1][x + 1].push({b:bubble, l:cl, t:ct});
        }
    },
    addBatch:function () {
        var n = this.isEmpty() ? this.cols : this.cols - 1;
        var s = n == this.cols ? 0 : this.R, b, pos, cl, ct, len = this.colors.length;
        this.lock = true;
        for (var i = 0; i < n; i++) {
            pos = this.Vserch(s, b);
            b = this.bubbles.shift();
            if(b){
                //this.record(b, pos.x, pos.y);
                this.addChild(b);
                console.log(pos);
                b.setPosition(pos);
                //b.className = this.colors[Math.floor(Math.random() * len)];
            }
           /* if (ct > this.maxY) {
                return this.gameover();
            }*/
            s += this.size;
        }
        this.lock = false;
    },
    update:function () {
        if (this.lock) {
            this.addBubble = true;
        }
        else {
            this.addBatch();
        }
    }
});