$(document).ready(function() {
    window.veil = (function() {
        var content = '.veil-content';
        var defaultArticle = '.veil-article';

        return function(setting) {
            var article = setting.article||defaultArticle;
            var characters = setting.characters;
            var openLinkText = setting.openLinkText;
            var closeLinkText = setting.closeLinkText;

            initialization(article, content, characters);

            function initialization(article, content, characters) {
                var veilBlock = $(content, article);
                if(veilBlock.length) {
                    for(var i = 0; veilBlock.length > i; i++) {
                        if($(veilBlock[i]).text().length > characters) {
                            veilGo($(veilBlock[i]));
                        }
                    }
                }
            }

            function veilGo(veilBlock) {
                var textBlock = veilBlock.text();
                var htmlBlock = veilBlock.html();
                parseHtmlBlock(htmlBlock);
            }

            function parseHtmlBlock(htmlBlock) {
                var htmlArray = [];
                var textArray = [];
                var start = 0;
                for(var count = 0; htmlBlock.length > count; count++) {
                    if(htmlBlock.slice(count, count+1) === '<') {
                        start = count;
                    }
                    if(htmlBlock.slice(count, count+1) === '>') {
                        htmlArray.push(htmlBlock.slice(start, count+1));
                    }
                }
                console.log(htmlArray);
            }

            //function getWord(textBlock) {
            //    var count = characters+1;
            //    var start = characters;
            //    var stop, word;
            //    while(textBlock.slice(start, count) != ' ') {
            //        start++;
            //        count++;
            //    }
            //    stop = count;
            //    count = characters;
            //    start = characters-1;
            //    while(textBlock.slice(start, count) != ' ') {
            //        start--;
            //        count--;
            //    }
            //    word = textBlock.slice(start, stop);
            //
            //    return word;
            //}

            //function setPointer(textBlock) {
            //    var count = characters+1;
            //    var start = characters;
            //    var pointer, text;
            //    while(textBlock.slice(start, count) != ' ') {
            //        start++;
            //        count++;
            //    }
            //    pointer = count;
            //
            //    return textBlock.slice(0,pointer) + ' <VeilPointer> ' + textBlock.slice(pointer);
            //
            //}

        }

    })();

});