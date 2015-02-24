(function($) {
        var content = '.veil-content';
        var defaultOpenLinkText = 'Открыть';
        var defaultCloseLinkText = 'Закрыть';
        var defaultCloseText = '...';

        var defaultSetting = {
            'content': '.veil-content',
            'characters': 200,
            'openLinkText': 'Открыть',
            'closeLinkText': 'Закрыть',
            'closeText': '...'
        };

        $.fn.veil = function(setting) {
            var options = $.extend(defaultSetting, setting);
            var article = this,
                characters = setting.characters,
                openLinkText = setting.openLinkText||defaultOpenLinkText,
                closeLinkText = setting.closeLinkText||defaultCloseLinkText,
                closeText = setting.closeText||defaultCloseText;

            return this.each(init(options.content, options.characters));

            function init(content, characters) {
                console.log($(this));
                var veilBlock = $(content, this);
                if(veilBlock.length) {
                    for(var i = 0; veilBlock.length > i; i++) {
                        $(veilBlock[i]).html(parseHtmlBlock($(veilBlock[i]).html()) + "<a class='closeVeil toggleVeil' href='#'>" + openLinkText + "</a>");
                    }
                }
                $('.toggleVeil').on('click', openOrClose);
            }

            function parseHtmlBlock(htmlBlock) {
                var htmlArray = [],
                    textArray = [],
                    sequence = [],
                    result = "",
                    startTag = 0, startText = 0;
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
                        textArray[i] = $.trim(textArray[i].slice(0, positionWord+1)) + "<span class='dot'>" + closeText + "</span>" + "<span class='veilClose'>" + textArray[i].slice(positionWord+1);
                        break;
                    }
                }

                textArray[textArray.length-1] = textArray[textArray.length-1] + "</span>";
                return textArray;

            }

            function openOrClose(e) {

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

    })(jQuery);