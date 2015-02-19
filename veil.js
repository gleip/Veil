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

            function initialization(article, content) {
                var veilBlock = $(content, article);
                if(veilBlock.length) {
                    for(var i = 0; veilBlock.length > i; i++) {
                        parseHtmlBlock($(veilBlock[i]).html());
                        }
                    }
                }

            function parseHtmlBlock(htmlBlock) {
                var htmlArray = [];
                var textArray = [];
                var result = "";
                var startTag = 0, startText = 0;
                for(var count = 0; htmlBlock.length > count; count++) {
                    if(htmlBlock.slice(count, count+1) === '<') {
                        startTag = count;
                        console.log($.trim(htmlBlock.slice(startText, count+1)).length);
                        if($.trim(htmlBlock.slice(startText, count+1)).length) {
                            textArray.push(htmlBlock.slice(startText, count));
                        }
                    }
                    if(htmlBlock.slice(count, count+1) === '>') {
                        htmlArray.push(htmlBlock.slice(startTag, count+1));
                        startText = count+1;
                    }
                }
                textArray = setVeil(textArray);
                for(var i = 0; htmlArray.length > i; i++) {

                }
                console.log(textArray[0]);
            }

            function setVeil(textArray) {
                var count = 0, positionWord = 0;
                for(var i = 0; textArray.length > i; i++) {
                    if(textArray[i].length + count < characters) {
                        count += textArray[i].length;
                    } else {
                        positionWord = characters - count;
                        while(textArray[i].slice(positionWord, positionWord+1) != ' ') {
                                    positionWord++;
                        }
                        textArray[i] = textArray[i].slice(0, positionWord+1) + "<span class='veil'>" + textArray[i].slice(positionWord+1);
                        break;
                    }
                }

                textArray[textArray.length] += "</span>";
                return textArray;

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