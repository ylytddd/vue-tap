;(function () {

	var units = (function () {
		var me = {
			sx: 0,
			sy: 0,
			dx: 0,
			dy: 0
		}
		
		me.touchStart = function (e) {
			this.sx = e.touches[0].pageX;
			this.sy = e.touches[0].pageY;
		};
		me.touchEnd = function (e, cb) {
			this.dx = Math.abs(e.changedTouches[0].pageX - this.sx);
			this.dy = Math.abs(e.changedTouches[0].pageY - this.sy);

			if(this.dx < 10 && this.dy < 10) {
				cb();
			}			
		};
		 // 用于判断tap是否可以被触发， 提示切换到手机模式
		me.isPhone = function () {
			if(navigator.userAgent.indexOf('Mobile') == -1) {
				console.warn('You need to switch to the device mode,otherwise you will not be able to trigger the tap event')
			}
		};
		me.isPhone();

		return me;
	})();


	function install(Vue) {
		Vue.directive('tap', {
			bind: function () {
				var self = this;
				this.cb = function(){};
				this.handlers = {
					start: function (e) {
						units.touchStart(e);
					}, 
					end: function (e) {
						units.touchEnd(e, self.cb);
					}
				}
				this.el.addEventListener('touchstart', this.handlers.start , false)
				this.el.addEventListener('touchend', this.handlers.end , false)
			},
			update: function (fn) {
				if(!fn) {
					return console.warn('tap event need a callback')
				}else if(typeof fn !== 'function') {
					return console.warn('the callback must be a function')
				} 
				this.cb = fn;
			},
			unbind: function () {
				this.el.removeEventListener('touchstart', this.handlers.start);
				this.el.removeEventListener('touchend', this.handlers.end);
			}
		})
	}

	if (typeof exports == "object") {
	  	module.exports = install
	} else if (typeof define == "function" && define.amd) {
	  	define([], function(){ return install })
	} else if (window.Vue) {
	  	window.vueTap = install
	  	Vue.use(install)
	}
})()