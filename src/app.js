'use strict';

export {SimpleShare}

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

        links.facebook      = `//facebook.com/sharer.php?u=${data.url}`;
        links.pinterest     = `//pinterest.com/pin/create/button/?url=${data.url}&media=${data.media}&description=${data.title}`;
        links.twitter       = `//twitter.com/intent/tweet?url=${data.url}&text=${data.title}`;
        links.gplus         = `//plus.google.com/share?url=${data.url}`;
        links.tumblr        = `//tumblr.com/widgets/share/tool?canonicalUrl=${data.url}&title=${data.title}&caption=${data.desc}`;
        links.linkedin      = `//linkedin.com/shareArticle?url=${data.url}&title=${data.title}`;
        // links.buffer        = `//buffer.com/add?text=${data.title}&url=${data.url}`;
        // links.digg          = `//digg.com/submit?url=${data.url}&title=${data.title}`;
        // links.reddit        = `//reddit.com/submit?url=${data.url}&title=${data.title}`;
        // links.stamble       = `//www.stumbleupon.com/submit?url=${data.url}&title=${data.title}`;
        // links.delicious     = `//delicious.com/save?v=5&provider={provider}&noui&jump=close&url=${data.url}&title=${data.title}`;
        // links.blogger       = `//www.blogger.com/blog-this.g?u=${data.url}&n=${data.title}&t=${data.desc}`;
        // links.lj            = `//www.livejournal.com/update.bml?subject=${data.title}&event=${data.url}`;
        // links.myspace       = `//myspace.com/post?u=${data.url}&t=${data.title}&c=${data.desc}`;
        // links.yahoo         = `//compose.mail.yahoo.com/?body=${data.url}`;
        // links.ffeed         = `//friendfeed.com/?url=${data.url}`;
        // links.newsvine      = `//www.newsvine.com/_tools/seed&save?u=${data.url}`;
        // links.evernote      = `//www.evernote.com/clip.action?url=${data.url}`;
        // links.getpocket     = `//getpocket.com/save?url=${data.url}`;
        // links.flipboard     = `//share.flipboard.com/bookmarklet/popout?v=2&title=${data.title}&url=${data.url}`;
        // links.instapaper    = `//www.instapaper.com/edit?url=${data.url}&title=${data.title}&description=${data.desc}`;
        // links.lineme        = `//lineit.line.me/share/ui?url=${data.url}`;
        // links.skype         = `//web.skype.com/share?url=${data.url}`;
        // links.viber         = `viber://forward?text=${data.url}`;
        // links.whatsapp      = `whatsapp://send?text=${data.url}`;
        // links.telegram      = `//telegram.me/share/url?url=${data.url}&text=${data.title}`;


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
                    //
                    // case 'buffer':
                    //     window.open(link.buffer, link.target, link.size );
                    //     break;
                    //
                    // case 'digg':
                    //     window.open(link.digg, link.target, link.size );
                    //     break;
                    //
                    // case 'reddit':
                    //     window.open(link.reddit, link.target, link.size );
                    //     break;
                    //
                    // case 'stamble':
                    //     window.open(link.stamble, link.target, link.size );
                    //     break;
                    //
                    // case 'delicious':
                    //     window.open(link.delicious, link.target, link.size );
                    //     break;
                    //
                    // case 'blogger':
                    //     window.open(link.blogger, link.target, link.size );
                    //     break;
                    //
                    // case 'livejournal':
                    //     window.open(link.lj, link.target, link.size );
                    //     break;
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
                    // case 'evernote':
                    //     window.open(link.evernote, link.target, link.size );
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
                    // case 'telegram':
                    //     window.open(link.telegram, link.target, link.size );
                    //     break;

                    default:
                        console.log('Broken link');
                }
            })
        }
    }
}

// function ready() {
//     new SimpleShare().init();
// }
//
// document.addEventListener('DOMContentLoaded', ready);


