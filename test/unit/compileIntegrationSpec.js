describe("compile integration", function() {
    var element, scope;

    function compile(html) {
        // create a jquery mobile page widget. This should
        // initialize jquery mobile and also angular js!
        element = $(html);
        element.page();
        // get the angularJs scope from the jquery element.
        scope = element.scope();
    }

    beforeEach(function() {
        element = null;
        scope = null;
    });

    it('should access and change the global scope via $.mobile.globalScope', function() {
        var globalScope = $.mobile.globalScope();
        expect(globalScope).toBeDefined();
        $.mobile.globalScope(null);
        var globalScope2 = $.mobile.globalScope();
        expect(globalScope2).not.toEqual(globalScope);
        $.mobile.globalScope(globalScope);
        var globalScope3 = $.mobile.globalScope();
        expect(globalScope).toEqual(globalScope3);

    });


    it('should create a scope for every page', function() {
        compile('<div id="page1" data-role="page">' +
                '</div>');
        expect(element.scope()).toBeDefined();
    });

    it('should use a common global scope as parent of all page scopes', function() {
        compile('<div id="page1" data-role="page">' +
                '</div>');
        var page1 = element.scope();
        expect(page1).toBeDefined();
        compile('<div id="page2" data-role="page">' +
                '</div>');
        var page2 = element.scope();
        page1.id = "page1";
        page2.id = "page2";
        expect(page1.id).not.toEqual(page2.id);
        expect(page2).toBeDefined();
        expect(page1.$parent).toEqual(page2.$parent);
    });

    /*
     it('should prevent race conditions due to hash changes', function() {
     // TODO find a correct case to reproduce the problem!
     var alocation = null;
     var browser = null;
     window.MainController = null;
     window.MainController = function($browser,$location) {
     browser = $browser;
     alocation = $location;
     };
     MainController.$inject = ['$browser','$location'];
     var root = $('<div><div id="page1" data-role="page">Hello</div><div id="page2" data-role="page">hello</div></div>');
     $("body").append(root);
     $.mobile.initializePage();
     var page1 = $("#page1");
     // compile only page1, not page 2
     var page2 = $("#page2");
     expect(page1.scope()).toBeDefined();
     expect(page2.scope()).toBeUndefined();
     // second page does not get initialized until we navigate to it...
     alocation.hash = "test";
     console.log("First: "+browser.getUrl());
     $.mobile.changePage(page2);
     //page1.scope().$root.$eval();
     console.log("Second: "+browser.getUrl());
     expect(page1.scope()).toBeDefined();
     expect(page2.scope()).toBeDefined();
     });
     */

});