# CanvasCapture

An HTML5 Canvas screen capture tool written in JavaScript. Record animations from HTML5 Canvas in realtime. Create videos of HTML5 video games and demos. Here is an example of the [captured video being played back](http://www.zachstronaut.com/lab/proto-strip/proto-strip.html).

## Example Usage

    var cc = new CanvasCapture({
        debug: true,
        fps: 8,
        inCanvasEl: document.getElementsByTagName('canvas')[0]
    });
    cc.start();
    
    // ...and then when you are done...
    cc.stop();

## Change Log

**2012-02-17**

* Alpha release to GitHub. Needs documentation and better examples.

---

## More About This Project ##

This project was created by Zachary Johnson. You can find him on Twitter [@zacharyjohnson](http://twitter.com/zacharyjohnson) and also at [zachstronaut.com](http://www.zachstronaut.com/).

This code is released under an MIT style license.  See `LICENSE.txt`.
