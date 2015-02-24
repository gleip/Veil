(function($) {
    var defaultSetting = {
            'content': '.veil-content',
            'characters': 200,
            'openLinkText': 'Открыть',
            'closeLinkText': 'Закрыть',
            'closeText': '...',
            'animateVeil': 0,
            'open': false,
            'showImg': true
        },

        methods = {
                init: function(article, options) {
                    var veilBlock = $(options.content, article);
                    if(veilBlock.length) {
                        for(var i = 0; veilBlock.length > i; i++) {
                            $(veilBlock[i]).html(methods.parseHtmlBlock($(veilBlock[i]).html(), options) + "<a class='toggleVeil' href='#'>" + options.openLinkText + "</a>");
                            if(!options.open) {
                                $(veilBlock[i]).find('.veilClose').hide();
                                $(veilBlock[i]).find('.toggleVeil').addClass('closeVeil');
                            } else {
                                $(veilBlock[i]).find('.toggleVeil').text(options.closeLinkText);
                            }
                            if(!options.showImg) {
                                $(veilBlock[i]).find('img').hide();
                            }
                            $(veilBlock[i]).find('.toggleVeil').on('click', options, methods.openOrClose);
                        }

                    }
                },

                parseHtmlBlock: function parseHtmlBlock(htmlBlock, options) {
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
                    textArray = methods.setVeil(textArray, options);
                    for(var i = 0; sequence.length > i;) {
                        if(sequence.shift() === "html") {
                            result += htmlArray.shift();
                        } else {
                            result +=textArray.shift();
                        }
                    }
                    return result;
                },

                setVeil: function setVeil(textArray, options) {
                    var count = 0, positionWord = 0;
                    for(var i = 0; textArray.length > i; i++) {
                        if(textArray[i].length + count < options.characters) {
                            count += textArray[i].length;
                        } else {
                            positionWord = options.characters - count;
                            while(textArray[i].slice(positionWord, positionWord+1) != ' ') {
                                positionWord++;
                            }
                            textArray[i] = $.trim(textArray[i].slice(0, positionWord+1)) + "<span class='dot'>" + options.closeText + "</span>" + "<span class='veilClose'>" + textArray[i].slice(positionWord+1);
                            break;
                        }
                    }

                    textArray[textArray.length-1] = textArray[textArray.length-1] + "</span>";
                    return textArray;

                },

                openOrClose: function(e) {
                    if($(this).hasClass('closeVeil')) {
                        $(this).prev('p').find('.veilClose').show(e.data.animateVeil, function() {$(this).css('display', 'inline')});
                        $(this).removeClass('closeVeil');
                        $(this).parent().find('.dot').html(" ");
                        $(this).html(e.data.closeLinkText);
                        if(!e.data.showImg) {
                            $(this).parent().find('img').show();
                        }
                    } else {
                        $(this).prev('p').find('.veilClose').hide(e.data.animateVeil);
                        $(this).addClass('closeVeil');
                        $(this).parent().find('.dot').html(e.data.closeText);
                        $(this).html(e.data.openLinkText);
                        if(!e.data.showImg) {
                            $(this).parent().find('img').hide();
                        }
                    }
                    e.preventDefault();
                }
            };


        $.fn.veil = function(setting) {
            var options = $.extend(defaultSetting, setting);

            return this.each(function () {
                var $this = $(this);
                methods.init($this, options);
            });
        }

    })(jQuery);