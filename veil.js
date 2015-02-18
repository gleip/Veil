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
                        if($(veilBlock[i]).html().length > characters) {
                            veilBlock(11111);
                        }
                    }
                }
            }
        }

    })();

});