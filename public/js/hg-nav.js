(function() {
  this.HugeNav = function() {

    var defaults = {
      navElement: 'hg-nav',
      jsonDataUrl: '/api/nav.json',
      afterRender: function(){}
    };

    if (arguments[0] && typeof arguments[0] === 'object') {
      this.opts = extendDefaults(defaults, arguments[0]);
    }else{
      this.opts = defaults;
    }

    var bodyElement = document.querySelector('body');
    bodyElement.addEventListener('click', bodyClickEvent.bind(this));
    
    var hamburgerElement = document.getElementById('toggle-open');
    hamburgerElement.addEventListener('click', openMenuEvent.bind(this));

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
    var navElement = document.getElementById(this.opts.navElement),
        navMainUl = document.createElement('ul');

    for(var i = 0; i < menuObj.items.length; i++){
      var navLi = document.createElement('li'),
          itemObj = menuObj.items[i];

      if(itemObj.items.length > 0){
        var subNavUl = document.createElement('ul');
        for(var j = 0; j < itemObj.items.length; j++){
          var subnavLi = document.createElement('li'),
              subItemObj = itemObj.items[j];

          var subnavLink = document.createElement('a');
          subnavLink.setAttribute('href', subItemObj.url);
          subnavLink.innerHTML = subItemObj.label;
          subnavLi.appendChild(subnavLink);

          subNavUl.appendChild(subnavLi);
        }

        var spanLabel = document.createElement('span');
        spanLabel.innerHTML = itemObj.label;
        spanLabel.addEventListener('click', openMenuEvent);

        navLi.appendChild(spanLabel);
        navLi.appendChild(subNavUl);
      }else{
        var menuLink = document.createElement('a');
        menuLink.setAttribute('href', itemObj.url);
        menuLink.innerHTML = itemObj.label;
        navLi.addEventListener('click', closeMenu);
        navLi.appendChild(menuLink);
      }
      navMainUl.appendChild(navLi);
    }
    navElement.appendChild(navMainUl);
  }

  function bodyClickEvent(e){
    var navElement = closest(e.target, 'nav');
    if(!navElement){
      closeMenu();
    }
  }

  function openMenuEvent(e){
    var openedMenu = document.querySelector('.opened'),
        bodyElement = document.querySelector('body');
    if(openedMenu){
      openedMenu.classList.remove('opened');
    }

    e.target.parentNode.classList.add('opened');
    bodyElement.classList.add('hg-nav-opened');
  }

  function closeMenu(){
    var openedMenu = document.querySelector('.opened'),
      bodyElement = document.querySelector('body');
    if(openedMenu){
      openedMenu.classList.remove('opened');
    }
    bodyElement.classList.remove('hg-nav-opened');
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

  function closest(element, tagname) {
    tagname = tagname.toLowerCase();
    do
    {
      if(element.nodeName.toLowerCase() === tagname){
        return element;
      }
    }while(element = element.parentNode);
    return null;
  }

}());