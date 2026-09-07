(function exposePuzzleSuccessScene(global) {
  "use strict";

  var SCENE_ASSETS = {
    goryeo: "/assets/scenes/goryeo-castle-scene.webp?v=20260907",
    mongol: "/assets/scenes/mongol-camp-scene.webp?v=20260907"
  };

  function animationPromises(region) {
    if (!region || typeof region.getAnimations !== "function") return [];
    return region.getAnimations({ subtree: true })
      .filter(function onlyRunning(animation) {
        return animation.playState === "running" || animation.playState === "pending";
      })
      .map(function finish(animation) {
        return animation.finished.catch(function ignoreCancelledAnimation() {});
      });
  }

  function waitForImage(image) {
    if (typeof image.decode === "function") {
      return image.decode().catch(function ignoreDecodeFailure() {});
    }
    if (image.complete) return Promise.resolve();
    return new Promise(function waitForLoad(resolve) {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  }

  function nextPaint() {
    return new Promise(function afterTwoFrames(resolve) {
      global.requestAnimationFrame(function firstFrame() {
        global.requestAnimationFrame(resolve);
      });
    });
  }

  function create(options) {
    options = options || {};
    var host = options.host;
    if (!host) return null;

    var captureRegion = options.captureRegion || null;
    var image = null;
    var revealVersion = 0;
    host.classList.add("puzzle-scene-host");

    function ensureImage(team) {
      if (!image) {
        image = document.createElement("img");
        image.className = "puzzle-success-scene";
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        image.draggable = false;
        image.setAttribute("aria-hidden", "true");
        host.insertBefore(image, host.firstChild);
      }
      if (image.dataset.team !== team) {
        image.classList.remove("is-visible");
        image.dataset.team = team;
        image.src = SCENE_ASSETS[team];
      }
      return image;
    }

    async function reveal(team) {
      var normalizedTeam = team === "mongol" ? "mongol" : "goryeo";
      var version = ++revealVersion;
      var sceneImage = ensureImage(normalizedTeam);
      var region = typeof captureRegion === "function" ? captureRegion() : captureRegion;
      await Promise.all([
        waitForImage(sceneImage),
        Promise.allSettled(animationPromises(region))
      ]);
      if (version !== revealVersion) return;
      await nextPaint();
      if (version !== revealVersion) return;
      sceneImage.classList.add("is-visible");
      host.dataset.sceneWinner = normalizedTeam;
      if (global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      await new Promise(function waitForReveal(resolve) {
        var settled = false;
        var finish = function finishReveal(event) {
          if (event && event.propertyName !== "transform") return;
          if (settled) return;
          settled = true;
          resolve();
        };
        sceneImage.addEventListener("transitionend", finish, { once: true });
        global.setTimeout(function revealFallback() { finish(); }, 600);
      });
    }

    function reset() {
      revealVersion += 1;
      host.removeAttribute("data-scene-winner");
      if (image) image.classList.remove("is-visible");
    }

    return { reveal: reveal, reset: reset };
  }

  global.EasyMatePuzzleScene = { create: create, assets: SCENE_ASSETS };
})(window);
