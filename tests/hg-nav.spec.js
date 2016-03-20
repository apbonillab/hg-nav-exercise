var assert = chai.assert,
    nav = null,
    server = null;

    menuMock = {
      items: [{
        label: "Work",
        url: "#/work",
        items: [ ]
        },
        {
          label: "About",
          url: "#/about",
          items: [
            {
              label: "What we do",
              url: "#/about/what-we-do"
            },
            {
              label: "How we work",
              url: "#/about/how-we-work"
            },
            {
              label: "Leadership",
              url: "#/about/leadership"
            }
          ]
        }
      ]
    };

describe('hg-nav tests...', function() {

  beforeEach(function() {
    var hgNav = document.createElement('nav');
    hgNav.setAttribute('id', 'hg-nav');
    document.body.appendChild(hgNav);

    server = sinon.fakeServer.create();
    server.autoRespond = true;
    server.respondWith("GET", "/api/nav.json",
      [200, { "Content-Type": "application/json" }, JSON.stringify(menuMock)]);
  });

  afterEach(function () {
    var hgNav = document.getElementById('hg-nav');
    while(hgNav.firstChild) hgNav.removeChild(hgNav.firstChild);
    server.restore();
  });

  describe('Testing if is creating DOM elements by Json properly', function () {

    it('should Base UL has been processed inside afterRender function', function (done) {
      nav = new HugeNav({ navElement: 'hg-nav', afterRender: function(){
        var navUl = document.getElementById('hg-nav').firstElementChild;
        assert.equal(navUl.tagName, 'UL');
        done();
      } });
    });
  });

  describe('Testing menu click event', function(){

    it('should ADD opened class on click on Nav Item (li)', function (done) {
      nav = new HugeNav({ navElement: 'hg-nav', afterRender: function(){
        var navUl = document.getElementById('hg-nav').firstElementChild;
        var eventClick = new Event('click');
        var navLi = navUl.lastElementChild;
        navLi.firstChild.dispatchEvent(eventClick);
        assert.equal(navUl.lastElementChild.classList[0], 'opened');
        done();
      } });
    });
  });

});