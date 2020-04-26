(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SimpleShare"] = factory();
	else
		root["SimpleShare"] = factory();
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleShare", function() { return SimpleShare; });




class SimpleShare {
    constructor() {
        this.init();
    }

    init() {
        this.crauler();
    }

    encode(string) {
        return encodeURI(string);
    }

    getSize(event) {

        let size = {};

        let dataAttr = event.currentTarget.dataset;

        //Get window width
        let popupWidth = dataAttr.dcpWidth ? dataAttr.dcpWidth : '500';

        //Get window height
        let popupHeight = dataAttr.dcpHeight ? dataAttr.dcpHeight : '600';

        size.width  = popupWidth;
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
        coords.top = ((screenHeight / 2) - (popupSize.height / 2)) + dualScreenTop;

        //Calculate window left position
        coords.left = ((screenWidth / 2) - (popupSize.width / 2)) + dualScreenLeft;

        //Return object
        return coords;
    }

    getData() {
        let data = {};
        let self = this;

        data.url    = self.encode(location.href);
        data.title  = self.encode(document.head.querySelector('meta[property="og:title"]').content);
        data.media  = self.encode(document.head.querySelector('meta[property="og:image"]').content);
        data.desc   = self.encode(document.head.querySelector('meta[property="og:description"]').content);

        return data;
    }

    setLinks(event) {
        let self        = this;
        let links       = {};

        let size        = self.getSize(event);
        let coords      = self.setPosition(event);
        let data        = self.getData(event);

        links.facebook      = `https://facebook.com/sharer.php?u=${data.url}`;
        links.pinterest     = `https://pinterest.com/pin/create/button/?url=${data.url}&media=${data.media}&description=${data.title}`;
        links.twitter       = `https://twitter.com/intent/tweet?url=${data.url}&text=${data.title}`;
        links.gplus         = `https://plus.google.com/share?url=${data.url}`;
        links.tumblr        = `https://tumblr.com/widgets/share/tool?canonicalUrl=${data.url}&title=${data.title}&caption=${data.desc}`;
        links.linkedin      = `https://linkedin.com/shareArticle?url=${data.url}&title=${data.title}`;
        links.reddit        = `https://reddit.com/submit?url=${data.url}&title=${data.title}`;
        links.livejournal   = `https://www.livejournal.com/update.bml?subject=${data.title}&event=${data.url}`;
        links.telegram      = `https://telegram.me/share/url?url=${data.url}&text=${data.title}`;
        links.buffer        = `https://buffer.com/add?text=${data.title}&url=${data.url}`;
        links.digg          = `https://digg.com/submit?url=${data.url}&title=${data.title}`;
        links.stamble       = `https://www.stumbleupon.com/submit?url=${data.url}&title=${data.title}`;

        // links.delicious     = `//delicious.com/save?v=5&provider={provider}&noui&jump=close&url=${data.url}&title=${data.title}`;
        // links.blogger       = `//www.blogger.com/blog-this.g?u=${data.url}&n=${data.title}&t=${data.desc}`;
        // links.myspace       = `//myspace.com/post?u=${data.url}&t=${data.title}&c=${data.desc}`;
        // links.yahoo         = `//compose.mail.yahoo.com/?body=${data.url}`;
        // links.ffeed         = `//friendfeed.com/?url=${data.url}`;
        // links.newsvine      = `//www.newsvine.com/_tools/seed&save?u=${data.url}`;
        // links.getpocket     = `//getpocket.com/save?url=${data.url}`;
        // links.flipboard     = `//share.flipboard.com/bookmarklet/popout?v=2&title=${data.title}&url=${data.url}`;
        // links.instapaper    = `//www.instapaper.com/edit?url=${data.url}&title=${data.title}&description=${data.desc}`;
        // links.lineme        = `//lineit.line.me/share/ui?url=${data.url}`;
        // links.skype         = `//web.skype.com/share?url=${data.url}`;
        // links.viber         = `viber://forward?text=${data.url}`;
        // links.whatsapp      = `whatsapp://send?text=${data.url}`;


        links.target    = `_blank`;
        links.size      = `width=${size.width},height=${size.height}, top=${coords.top},left=${coords.left}`;

        return links;
    }

    crauler() {

        let targets;
        let self = this;

        targets = document.querySelectorAll('[data-dcp-share]');

        for (let i = 0; i < targets.length; i++) {
            targets[i].addEventListener('click', function (event) {
                event.preventDefault();

                let provider    = event.currentTarget.dataset.dcpShare;
                let link        = self.setLinks(event);

                switch (provider) {
                    case 'facebook':
                        window.open(link.facebook, link.target, link.size );
                        break;

                    case 'pinterest':
                        window.open(link.pinterest, link.target, link.size );
                        break;

                    case 'twitter':
                        window.open(link.twitter, link.target, link.size );
                        break;

                    case 'googleplus':
                        window.open(link.gplus, link.target, link.size );
                        break;

                    case 'tumblr':
                        window.open(link.tumblr, link.target, link.size );
                        break;

                    case 'linkedin':
                        window.open(link.linkedin, link.target, link.size );
                        break;

                    case 'reddit':
                        window.open(link.reddit, link.target, link.size );
                        break;

                    case 'livejournal':
                        window.open(link.livejournal, link.target, link.size );
                        break;                    //

                    case 'telegram':
                        window.open(link.telegram, link.target, link.size );
                        break;

                    case 'buffer':
                        window.open(link.buffer, link.target, link.size );
                        break;

                    case 'digg':
                        window.open(link.digg, link.target, link.size );
                        break;


                    case 'stamble':
                        window.open(link.stamble, link.target, link.size );
                        break;
                    //
                    // case 'delicious':
                    //     window.open(link.delicious, link.target, link.size );
                    //     break;
                    //
                    // case 'blogger':
                    //     window.open(link.blogger, link.target, link.size );
                    //     break;
                    //

                    //
                    // case 'myspace':
                    //     window.open(link.myspace, link.target, link.size );
                    //     break;
                    //
                    // case 'yahoo':
                    //     window.open(link.yahoo, link.target, link.size );
                    //     break;
                    //
                    // case 'friendfeed':
                    //     window.open(link.ffeed, link.target, link.size );
                    //     break;
                    //
                    // case 'newsvine':
                    //     window.open(link.newsvine, link.target, link.size );
                    //     break;
                    //
                    // case 'getpocket':
                    //     window.open(link.getpocket, link.target, link.size );
                    //     break;
                    //
                    // case 'flipboard':
                    //     window.open(link.flipboard, link.target, link.size );
                    //     break;
                    //
                    // case 'instapaper':
                    //     window.open(link.instapaper, link.target, link.size );
                    //     break;
                    //
                    // case 'lineme':
                    //     window.open(link.lineme, link.target, link.size );
                    //     break;
                    //
                    // case 'skype':
                    //     window.open(link.skype, link.target, link.size );
                    //     break;
                    //
                    // case 'whatsapp':
                    //     window.open(link.whatsapp, link.target, link.size );
                    //     break;
                    //

                    default:
                        console.log('Broken link');
                }
            })
        }
    }
}


/***/ })
/******/ ]);
});