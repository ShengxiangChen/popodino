/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

PP.AnchorPointCenter = cc.p(0.5, 0.5);
PP.AnchorPointTop = cc.p(0.5, 1);
PP.AnchorPointTopRight = cc.p(1, 1);
PP.AnchorPointRight = cc.p(1, 0.5);
PP.AnchorPointBottomRight = cc.p(1, 0);
PP.AnchorPointBottom = cc.p(0.5, 0);
PP.AnchorPointBottomLeft = cc.p(0, 0);
PP.AnchorPointLeft = cc.p(0, 0.5);
PP.AnchorPointTopLeft = cc.p(0, 1);

PP.pt = {};
PP.rcVisible = cc.rect(0, 0, 0, 0);
PP.pt.Center = cc.p(0, 0);
PP.pt.Top = cc.p(0, 0);
PP.pt.TopRight = cc.p(0, 0);
PP.pt.Right = cc.p(0, 0);
PP.pt.BottomRight = cc.p(0, 0);
PP.pt.Bottom = cc.p(0, 0);
PP.pt.Left = cc.p(0, 0);
PP.pt.TopLeft = cc.p(0, 0);

var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();

        //cc.EGLView.getInstance().setDesignResolutionSize(480,320,cc.RESOLUTION_POLICY.SHOW_ALL);

        // enable High Resource Mode(2x, such as iphone4) and maintains low resource on other devices.
        //director.enableRetinaDisplay(true);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        //load resources
        cc.Loader.preload(g_mainmenu , function () {
            cc.Director.getInstance().replaceScene(new this.startScene());
        }, this);

        return true;
    }
});
var myApp = new cocos2dApp(PP.MainMenuScene);

PP.VisibleRect = {
    rect:function () {
        if (PP.rcVisible.size.width == 0) {
            var s = cc.Director.getInstance().getWinSize();
            PP.rcVisible = cc.rect(0, 0, s.width, s.height);
        }
        return PP.rcVisible;
    },
    center:function () {
        if (PP.pt.Center.x == 0) {
            var rc = this.rect();
            PP.pt.Center.x = rc.origin.x + rc.size.width / 2;
            PP.pt.Center.y = rc.origin.y + rc.size.height / 2;
        }
        return PP.pt.Center;
    },
    top:function () {
        if (PP.pt.Top.x == 0) {
            var rc = this.rect();
            PP.pt.Top.x = rc.origin.x + rc.size.width / 2;
            PP.pt.Top.y = rc.origin.y + rc.size.height;
        }
        return PP.pt.Top;
    },
    topRight:function () {
        if (PP.pt.TopRight.x == 0) {
            var rc = this.rect();
            PP.pt.TopRight.x = rc.origin.x + rc.size.width;
            PP.pt.TopRight.y = rc.origin.y + rc.size.height;
        }
        return PP.pt.TopRight;
    },
    right:function () {
        if (PP.pt.Right.x == 0) {
            var rc = this.rect();
            PP.pt.Right.x = rc.origin.x + rc.size.width;
            PP.pt.Right.y = rc.origin.y + rc.size.height / 2;
        }
        return PP.pt.Right;
    },
    bottomRight:function () {
        if (PP.pt.BottomRight.x == 0) {
            var rc = this.rect();
            PP.pt.BottomRight.x = rc.origin.x + rc.size.width;
            PP.pt.BottomRight.y = rc.origin.y;
        }
        return PP.pt.BottomRight;
    },
    bottom:function () {
        if (PP.pt.Bottom.x == 0) {
            var rc = this.rect();
            PP.pt.Bottom.x = rc.origin.x + rc.size.width / 2;
            PP.pt.Bottom.y = rc.origin.y;
        }
        return PP.pt.Bottom;
    },
    bottomLeft:function () {
        return this.rect().origin;
    },
    left:function () {
        if (PP.pt.Left.x == 0) {
            var rc = this.rect();
            PP.pt.Left.x = rc.origin.x;
            PP.pt.Left.y = rc.origin.y + rc.size.height / 2;
        }
        return PP.pt.Left;
    },
    topLeft:function () {
        if (PP.pt.TopLeft.x == 0) {
            var rc = this.rect();
            PP.pt.TopLeft.x = rc.origin.x;
            PP.pt.TopLeft.y = rc.origin.y + rc.size.height;
        }
        return PP.pt.TopLeft;
    }
};

PP.ScreenWidth = PP.VisibleRect.rect().size.width;
PP.ScreenHeight = PP.VisibleRect.rect().size.height;