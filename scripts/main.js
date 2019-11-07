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
      " ",
      [
        "UX Designer.",
        "Product Designer.",
        "Traveler.",
        "UI Designer.",
        "Caffeine Addict.",
        "Food Nerd.",
        "Dog Lover."
      ],
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

/** @type HTMLImageElement */
var menuImg = document.querySelector(".menu > img");
var menuUl = document.querySelector("#navigation-bar > ul");
var mobileMenuIsOpen = false;
var closeIcon = "./images/icons8-delete_sign.png";
var menuIcon = "./images/icons8-menu 2.png";

const menu = document.querySelector(".hamburger");
menu.addEventListener("click", toggleMenu);

function toggleMenu() {
  var isActive = menuUl.classList.contains("active");
  if (isActive) {
    menuUl.classList.remove("active");
  } else {
    menuUl.classList.add("active");
  }

  if (menu.classList.contains("is-active")) {
    menu.classList.remove("is-active");
  } else {
    menu.classList.add("is-active");
  }
}

window.onresize = function() {
  if (window.innerWidth > 1023) {
    menuUl.style.display = "flex";
  } else {
    // this.menuUl.style.display = this.mobileMenuIsOpen ? "flex" : "none";
  }
};

/** Lightbox */
(function() {
  const imageHolders = [];
  let images = getPageImages();
  if (!images.length) return;
  const body = document.querySelector("body");
  const lightBox = document.createElement("div");
  lightBox.id = "light-box";

  lightBox.appendChild(getHeader());

  lightBox.appendChild(getBody());

  // lightBox.appendChild(getFooter());

  function getPageImages() {
    const images = Array.from(
      document.querySelectorAll("img[galleryItem]")
    ).map(img => img.src);
    return images;
  }

  function toggleLightbox() {
    const lightBox = document.querySelector("#light-box");

    const isActive = !(lightBox.style.display == "none");
    if (isActive) {
      lightBox.style.display = "none";

      document.querySelector(".hamburger").style.display = "";
    } else {
      lightBox.style.display = "flex";

      document.querySelector(".hamburger").style.display = "none";
    }
  }

  function getHeader() {
    const header = document.createElement("div");
    header.classList.add("lb-header");

    const close = document.createElement("a");

    close.classList.add("close");
    header.appendChild(close);
    return header;
  }

  function getBody() {
    const body = document.createElement("div");
    body.classList.add("lb-body");

    const mainImg = document.createElement("img");
    mainImg.src = images[0];
    body.appendChild(mainImg);
    return body;
  }

  function getFooter() {
    const footer = document.createElement("div");
    footer.classList.add("lb-footer");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("images");
    const imageSources = getPageImages();

    imageSources.forEach((img, index) => {
      const innerImgDiv = document.createElement("div");
      const imgElm = document.createElement("img");
      imgElm.src = img;
      innerImgDiv.appendChild(imgElm);
      imgElm.addEventListener("click", ev => {
        const activeImage = document.querySelector("#light-box div.active");
        if (activeImage) {
          activeImage.classList.remove("active");
        }
        const el = document.querySelector(".lb-body img");
        el.src = img;
        el.style.maxWidth = "100%";
        el.style.maxHeight = "100%";

        const left = -1 * 50 * index + (window.innerWidth / 2 - 25) + "px";
        imgDiv.style.left = left;
        ev.target.parentNode.classList.add("active");
      });
      imgDiv.appendChild(innerImgDiv);
    });
    const left = -1 * 50 * 0 + (window.innerWidth / 2 - 25) + "px";
    imgDiv.style.left = left;
    imgDiv.querySelector("div").classList.add("active");
    footer.appendChild(imgDiv);

    return footer;
  }

  function removeExcludedImages(imageset) {
    return imageset;
  }

  body.appendChild(lightBox);
  toggleLightbox();

  document.querySelector("#light-box a.close").addEventListener("click", () => {
    toggleLightbox();
  });

  document.querySelectorAll("img[galleryItem]").forEach(img => {
    img.addEventListener("click", function() {
      document.querySelector(".lb-body img").src = event.target.src.replace(
        /\bmobile\b/,
        ""
      );
      toggleLightbox();
    });
  });
})();

/** Carousel */
(function() {
  const imageSet = document
    .querySelector(".carousel > .images")
    .getAttribute("set")
    .split(",");
  document
    .querySelector(".carousel > .images > img")
    .setAttribute("src", imageSet[0]);
  console.log(imageSet.split(","));
});
