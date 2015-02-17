var Veil = (function VeilConstract() {
    var content = '.veil-content';
    var defaultArticle = '.veil-article';

    return function(setting) {
        var article = setting.article||defaultArticle;
        var characters = setting.characters;
        var openLinkText = setting.openLinkText;
        var closeLinkText = setting.closeLinkText;

        initialization(article, content, characters);

        function initialization(article, content, characters) {
            console.log($(content));
            console.log($(article, content).length);
        }
    }

})();
