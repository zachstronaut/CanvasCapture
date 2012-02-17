/**
 * CanvasCapture - An HTML5 Canvas screen capture tool. Record animations from HTML5 Canvas in realtime.
 * https://github.com/zachstronaut/CanvasCapture
 *
 * 2012-02-17
 * Alpha release to GitHub. Needs documentation and better examples.
 *
 * Zachary Johnson
 * Zachstronaut LLC
 * http://www.zachstronaut.com/
 * MIT License
 */
(function () {
    var CanvasCapture = function (_options) {
        var _outCtx = null,
            _outX = 0,
            _outY = 0,
            _outWidthReal = 0,
            _outHeightReal = 0,
            _timer = null,
            _defaultOptions = {
                inCanvasEl: null,
                outCanvasEl: null,
                inX: 0,
                inY: 0,
                inWidth: 0,
                inHeight: 0,
                outWidth: 200,
                outHeight: 150,
                duration: 5000,
                fps: 15,
                rollingInterval: true,
                debug: false
            };
        
        // TODO: this shouldn't be public.... if somebody tried to change something like width/height once we start running that could be problemmatic
        this.options = {};

        this.init = function () {
            var k;
            
            console.log(1);
            
            for (k in _defaultOptions) {
                this.options[k] = _defaultOptions[k];
            }
            
            for (k in _options) {
                this.options[k] = _options[k];
            }
            
            if (!this.options.inCanvasEl) {
                // TODO: report error
                return;
            }
            
            this.options.inWidth = this.options.inCanvasEl.getAttribute('width');
            this.options.inHeight = this.options.inCanvasEl.getAttribute('height');
            
            // TODO: validate numerical options
            
            // If source aspect ratio is bigger, output height will have to be smaller than default...
            // Calculate with destination width * source ratio
            if (this.options.inWidth/this.options.inHeight >= this.options.outWidth/this.options.outHeight) {
                _outWidthReal = this.options.outWidth;
                _outHeightReal = this.options.outWidth / (this.options.inWidth/this.options.inHeight);
            
            // If source aspect ratio is smaller, output width will have to be smaller than default...
            // Calculate with destination height * source ratio
            } else {
                _outWidthReal = this.options.outHeight * (this.options.inWidth/this.options.inHeight);
                _outHeightReal = this.options.outHeight;
            }
            
            // TODO: validate (sanity check) duration and FPS
            
            if (!this.options.outCanvasEl || typeof this.options.outCanvasEl.getContext === 'undefined') {
                this.options.outCanvasEl = document.createElement('canvas');
                this.options.outCanvasEl.setAttribute('width', this.options.outWidth);
                this.options.outCanvasEl.setAttribute('height', this.getOutCanvasHeight());
            }
            
            if (this.options.debug) {
                document.body.appendChild(this.options.outCanvasEl);
            }
            
            _outCtx = this.options.outCanvasEl.getContext('2d');
            
            console.log(2);
        };
        
        this.getOutCanvasHeight = function () {
            return this.options.outHeight * Math.ceil(this.options.duration / 1000 * this.options.fps);
        };
        
        this.start = function () {
            clearTimeout(_timer);
            
            this.capture();
            
            var self = this;
            
            // TODO: record actual time difference between frames and correct timeout delay
            _timer = setTimeout(function () {self.start();}, 1000 / this.options.fps);
        };
        
        this.stop = function () {
            clearTimeout(_timer);
            
            if (this.options.debug) {
                var anchor = document.createElement('a');
                anchor.setAttribute('href', this.getImageURL());
                anchor.innerHTML = 'download';
                document.body.appendChild(anchor);
            }
        };
        
        this.getImageURL = function () {
            return this.options.outCanvasEl.toDataURL();
        }
        
        this.capture = function () {
            _outCtx.drawImage(this.options.inCanvasEl, _outX, _outY, _outWidthReal, _outHeightReal);
            _outY += this.options.outHeight;
            
            if (_outY >= this.getOutCanvasHeight()) {
                if (this.options.rollingInterval) {
                    _outY = 0;
                    
                } else {
                    this.stop();
                }
            }
        };
        
        this.init();
    }
    
    window.CanvasCapture = CanvasCapture;
    
    if (typeof window.captureReady === 'function') {
        window.captureReady();
    }
}());
