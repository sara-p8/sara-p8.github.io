function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Typist =
  /*#__PURE__*/
  (function() {
    "use strict";

    /** @private */

    /** @type boolean  @private */

    /**@type Element @private */

    /**
     *
     * @param {HTMLElement} element
     * @param { String } baseText
     */
    function Typist(element, baseText, roles, startDelay) {
      _classCallCheck(this, Typist);

      _defineProperty(this, "_position", 0);

      _defineProperty(this, "_isDeleting", false);

      _defineProperty(this, "_element", null);

      _defineProperty(this, "_roles", []);

      _defineProperty(this, "_roleIndex", 0);

      _defineProperty(this, "_baseText", "");

      if (!element) throw Error("Property element needs to be defined");

      if (element && typeof element.innerText == "string") {
        this._element = element;
      }

      this._baseText = baseText ? baseText.toString() : "";
      this._startDelay = 0;
      this._element.innerText = this._baseText + "_";
      this._roles = roles;
    }

    _createClass(Typist, [
      {
        key: "initialize",
        value: function initialize() {
          this.tick(
            this._startDelay || this.getNextDelta(!this._isDeleting),
            this.next
          );
        }
        /** @private */
      },
      {
        key: "tick",
        value: function tick(time, callback) {
          var _this = this;

          setTimeout(function() {
            return callback(_this);
          }, time);
        }
        /** @private @param context { Typist } */
      },
      {
        key: "next",
        value: function next(context) {
          var ctx = context;

          if (ctx._position === ctx._roles[ctx._roleIndex].length) {
            ctx._isDeleting = true;
          }

          if (ctx._position === 0) {
            ctx._isDeleting = false;
            ctx._roleIndex === ctx._roles.length - 1
              ? (ctx._roleIndex = 0)
              : ctx._roleIndex++;
          }

          ctx._isDeleting ? ctx._position-- : ctx._position++;

          var text = ctx._roles[ctx._roleIndex].substr(0, ctx._position);

          ctx._element.innerText = ctx._baseText + text + "_";
          ctx.tick(ctx.getNextDelta(ctx._isDeleting), ctx.next);
        }
        /** @private */
      },
      {
        key: "getNextDelta",
        value: function getNextDelta(removing) {
          var delta = Math.round(Math.random() * 300);
          if (removing) delta = delta / 2;
          return delta;
        }
      }
    ]);

    return Typist;
  })();

window.onload = function() {
  /** @type HTMLElement */
  var typingElement = document.querySelector("#typing-element");
  if (typingElement) {
    var typist = new Typist(
      typingElement,
      "",
      ["UX Designer.", "Product Designer.", "Traveler.", "UI Designer.", "Caffeine Addict.", "Food Nerd.", "Dog Lover."],
      200
    );

    typist.initialize(200);
  }
  this.setupEventListeners();
};

function setupEventListeners() {
  var menuImg = document.querySelector(".menu>img");
  if (menuImg) {
    menuImg.addEventListener("click", toggleMenu);
  }
}

function scrollToTop() {
  if (
    document.body.scrollTop === 0 &&
    document.documentElement.scrollTop === 0
  ) {
    return;
  }
  setTimeout(function() {
    if (document.body.scrollTop > 0) document.body.scrollTop -= 30;
    if (document.documentElement.scrollTop > 0)
      document.documentElement.scrollTop -= 30;

    scrollToTop();
  }, 15);
}

/** @type HTMLImageElement */
var menuImg = document.querySelector(".menu > img");
var menuUl = document.querySelector("#navigation-bar > ul");
var mobileMenuIsOpen = false;
var closeIcon = "./images/icons8-delete_sign.png";
var menuIcon = "./images/icons8-menu 2.png";

function toggleMenu() {
  var display = menuUl.style.display;
  menuUl.style.display = display === "flex" ? "none" : "flex";
  menuImg.src = menuUl.style.display == "flex" ? closeIcon : menuIcon;
  mobileMenuIsOpen = menuUl.style.display == "flex" ? true : false;
}

window.onresize = function() {
  if (window.innerWidth > 1023) {
    menuUl.style.display = "flex";
  } else {
    this.menuUl.style.display = this.mobileMenuIsOpen ? "flex" : "none";
  }
};
function resetMenu() {
  menuIsOpen = false;
  if (window.innerWidth < 1024) {
    if (menuIsOpen) {
      menuImg.src = closeIcon;
      menuUl.style.display = "";
    } else {
      menuImg.src = menuIcon;
      menuUl.style.display = "none";
    }
  } else {
    menuIsOpen = T;
  }
}
