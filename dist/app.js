(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("app", [], factory);
	else if(typeof exports === 'object')
		exports["app"] = factory();
	else
		root["app"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_helpers_helpers__ = __webpack_require__(1);




class SimpleShare {
    init() {
        this.crauler();
    }

    encode(string) {
        return encodeURI(string);
    }

    getSize(event) {

        let size = {};

        let currentTargetData = event.currentTarget.dataset;

        //Get window width
        let popupWidth = currentTargetData.dcpWidth;

        //Get window height
        let popupHeight = currentTargetData.dcpHeight;

        size.width = popupWidth;
        size.height = popupHeight;

        return size;
    }

    setPosition(event) {
        let coords = {};

        //Calculating window position
        let dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        let dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        let screenWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        let screenHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        //Get popup window size from data- attributes.
        let popupSize = this.getSize(event);

        //Calculate window top position
        coords.top = screenHeight / 2 - popupSize.height / 2 + dualScreenTop;

        //Calculate window left position
        coords.left = screenWidth / 2 - popupSize.width / 2 + dualScreenLeft;

        //Return object
        return coords;
    }

    getData(event) {
        let data = {};

        data.href = location.href;
        data.title = document.head.querySelector('meta[property="og:title"]').content;
        data.media = document.head.querySelector('meta[property="og:image"]').content;
        data.desc = document.head.querySelector('meta[property="og:description"]').content;

        return data;
    }

    setLinks(event) {
        let self = this;
        let links = {};

        let size = self.getSize(event);
        let coords = self.setPosition(event);
        let data = self.getData(event);

        console.log(size);
        console.log(coords);
        console.log(data);

        links.fb = `//facebook.com/sharer.php?u=${data.href}`;
        links.pt = `//pinterest.com/pin/create/button/?url=${data.href}&media=${data.media}&description=${data.desc}`;
        links.tw = `//twitter.com/intent/tweet?url=${data.href}&text=${data.title}`;
        links.gp = `//plus.google.com/share?url=${data.title}`;
        links.tr = `//tumblr.com/widgets/share/tool?canonicalUrl=${data.href}&title=${data.title}&caption=${data.desc}`;

        links.target = `_blank`;

        links.size = `width=${size.width},height=${size.height}, top=${coords.top},left=${coords.left}`;

        console.log(links);

        return links;
    }

    crauler() {

        let targets;
        let self = this;

        targets = document.querySelectorAll('[data-dcp-share]');

        for (let i = 0; i < targets.length; i++) {
            targets[i].addEventListener('click', function (event) {
                event.preventDefault();

                let provider = event.currentTarget.dataset.dcpShare;
                let link = self.setLinks(event);

                switch (provider) {
                    case 'facebook':
                        window.open(link.fb, link.target, link.size);
                        break;

                    case 'pinterest':
                        window.open(link.pt, link.target, link.size);
                        break;

                    case 'twitter':
                        window.open(link.tw, link.target, link.size);
                        break;

                    case 'googleplus':
                        window.open(link.gp, link.target, link.size);
                        break;

                    case 'tumblr':
                        window.open(link.tr, link.target, link.size);
                        break;

                    default:
                        console.log('Broken link');
                }
            });
        }
    }
}

Object(__WEBPACK_IMPORTED_MODULE_0_helpers_helpers__["a" /* ready */])(function () {
    new SimpleShare().init();
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ready; });


let ready = function (fn) {

    // Sanity check
    if (typeof fn !== 'function') return;

    // If document is already loaded, run method
    if (document.readyState === 'complete') {
        return fn();
    }

    // Otherwise, wait until document is loaded
    document.addEventListener('DOMContentLoaded', fn, false);
};



/***/ })
/******/ ]);
});
//# sourceMappingURL=app.js.map