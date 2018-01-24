'use strict';

class SimpleShare {
    init() {
        this.crauler()
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

        data.href   = location.href;
        data.title  = document.head.querySelector('meta[property="og:title"]').content;
        data.media  = document.head.querySelector('meta[property="og:image"]').content;
        data.desc   = document.head.querySelector('meta[property="og:description"]').content;

        return data;
    }

    setLinks(event) {
        let self        = this;
        let links       = {};

        let size        = self.getSize(event);
        let coords      = self.setPosition(event);
        let data        = self.getData(event);

        links.fb = `//facebook.com/sharer.php?u=${data.href}`;
        links.pt = `//pinterest.com/pin/create/button/?url=${data.href}&media=${data.media}&description=${data.desc}`;
        links.tw = `//twitter.com/intent/tweet?url=${data.href}&text=${data.title}`;
        links.gp = `//plus.google.com/share?url=${data.title}`;
        links.tr = `//tumblr.com/widgets/share/tool?canonicalUrl=${data.href}&title=${data.title}&caption=${data.desc}`;

        links.target = `_blank`;

        links.size = `width=${size.width},height=${size.height}, top=${coords.top},left=${coords.left}`;

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
                        window.open(link.fb, link.target, link.size );
                        break;

                    case 'pinterest':
                        window.open(link.pt, link.target, link.size );
                        break;

                    case 'twitter':
                        window.open(link.tw, link.target, link.size );
                        break;

                    case 'googleplus':
                        window.open(link.gp, link.target, link.size );
                        break;

                    case 'tumblr':
                        window.open(link.tr, link.target, link.size );
                        break;

                    default:
                        console.log('Broken link');
                }
            })
        }
    }
}

export {SimpleShare};

function ready() {
    new SimpleShare().init();
}

document.addEventListener('DOMContentLoaded', ready);
