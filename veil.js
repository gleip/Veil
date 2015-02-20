$(document).ready(function() {
    window.veil = (function() {
        var content = '.veil-content';
        var defaultArticle = '.veil-article';
        var defaultOpenLinkText = 'Открыть';
        var defaultCloseLinkText = 'Закрыть';
        var defaultCloseText = '...';
        var defaultCloseTextTpl = {
            open: "<span class='dot'>",
            close: "</span>"
        };
        var defaultCloseLinkTpl = {
            open: "<a class='closeVeil toggleVeil' href='#'>",
            close: "</a>"
        };
        var defaultVeilTpl = {
            open: "<span class='veilClose'>",
            close: "</span>"
        };

        return function(setting) {
            var article = setting.article||defaultArticle;
            var characters = setting.characters;
            var openLinkText = setting.openLinkText||defaultOpenLinkText;
            var closeLinkText = setting.closeLinkText||defaultCloseLinkText;
            var closeText = setting.closeText||defaultCloseText;

            initialization(article, content, characters);

            function initialization(article, content) {
                var veilBlock = $(content, article);
                if(veilBlock.length) {
                    for(var i = 0; veilBlock.length > i; i++) {
                        $(veilBlock[i]).html(parseHtmlBlock($(veilBlock[i]).html()) + defaultCloseLinkTpl.open + openLinkText + defaultCloseLinkTpl.close);
                    }
                }
                $('.toggleVeil').on('click', openOrClose);
            }

            function parseHtmlBlock(htmlBlock) {
                var htmlArray = [];
                var textArray = [];
                var sequence = [];
                var result = "";
                var startTag = 0, startText = 0;
                for(var count = 0; htmlBlock.length > count; count++) {
                    if(htmlBlock.slice(count, count+1) === '<') {
                        startTag = count;
                        if($.trim(htmlBlock.slice(startText, count)).length > 0) {
                            textArray.push(htmlBlock.slice(startText, count));
                            sequence.push('text');
                        }
                    }
                    if(htmlBlock.slice(count, count+1) === '>') {
                        htmlArray.push(htmlBlock.slice(startTag, count+1));
                        sequence.push('html');
                        startText = count+1;
                    }
                }
                textArray = setVeil(textArray);
                for(var i = 0; sequence.length > i;) {
                    if(sequence.shift() === "html") {
                        result += htmlArray.shift();
                    } else {
                        result +=textArray.shift();
                    }
                }
                return result;
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
                        textArray[i] = $.trim(textArray[i].slice(0, positionWord+1)) + defaultCloseTextTpl.open +closeText +defaultCloseTextTpl.close + defaultVeilTpl.open + textArray[i].slice(positionWord+1);
                        break;
                    }
                }

                textArray[textArray.length-1] = textArray[textArray.length-1] + defaultVeilTpl.close;
                return textArray;

            }

            function openOrClose(e) {
                if($(e.target).hasClass('veilClose')) {
                    $(e.target).parent().find('veilClose').removeClass('veilClose').addClass('veilOpen');
                    e.preventDefault();
                } else {
                    $(e.target).parent().find('veilOpen').removeClass('veilOpen').addClass('veilClose');
                    e.preventDefault();
                }
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