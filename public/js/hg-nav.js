(function() {
  this.HugeNav = function() {

    var defaults = {
      navElement: 'hg-nav',
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
      var navLi = document.createElement('li'),
          itemObj = menuObj.items[i];
      navLi.innerHTML = itemObj.label;

      if(itemObj.items.length > 0){
        var subNavUl = document.createElement('ul');
        for(var j = 0; j < itemObj.items.length; j++){
          var subnavLi = document.createElement('li'),
              subItemObj = itemObj.items[j];
          subnavLi.innerHTML = subItemObj.label;
          subNavUl.appendChild(subnavLi);
        }
        navLi.appendChild(subNavUl);
      }

      navLi.addEventListener("click", openMenuEvent);
      navMainUl.appendChild(navLi);
    }
    navElement.appendChild(navMainUl);
  }

  function openMenuEvent(e){
    var openedMenu = document.querySelector(".opened");
    if(openedMenu){
      openedMenu.classList.remove('opened');
    }
    e.target.classList.add('opened');
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