(function() {
  this.HugeNav = function() {

    this.overlay = null;

    var defaults = {
      navElement: 'hg-nav',
      openedMenuClass: 'opened',
      jsonDataUrl: '/api/nav.json',
      afterRender: function(){}
    };

    if (arguments[0] && typeof arguments[0] === "object") {
      this.opts = extendDefaults(defaults, arguments[0]);
    }else{
      this.opts = defaults;
    }
    loadMenuFromJson.call(this);
  };

  function loadMenuFromJson(){
    var _this = this,
        req = new XMLHttpRequest();

    req.onload = function (e) {
      buildMenu.call(_this, e.target.response);
        _this.opts.afterRender();
    };

    req.open('GET', this.opts.jsonDataUrl, true);
    req.responseType = 'json';
    req.send();
  }

  function buildMenu(menuObj){
    var navElement = document.getElementById(this.opts.navElement);

    var navMainUl = document.createElement('ul');

    for(var i = 0; i < menuObj.items.length; i++){
      var navLi = document.createElement('li');
      navLi.innerHTML = menuObj.items[i].label;
      navMainUl.appendChild(navLi);
    }

    navElement.appendChild(navMainUl);
  }

  function initializeMenuEvent(){

  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }
}());