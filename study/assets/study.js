(function () {
  var KEY = "sscCglMasterSystem";

  function read() {
    try {
      var data = JSON.parse(localStorage.getItem(KEY) || "{}");
      return data && typeof data === "object" ? data : {};
    } catch (e) {
      return {};
    }
  }

  function write(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function paint() {
    var state = read();
    var boxes = document.querySelectorAll("input[data-topic]");
    boxes.forEach(function (box) {
      var id = box.getAttribute("data-topic");
      box.checked = !!state[id];
      var row = box.closest("[data-row]");
      if (row) row.classList.toggle("is-done", !!state[id]);
    });
    var list = document.querySelectorAll("#checklist input[data-topic]");
    var target = list.length ? list : boxes;
    var done = 0;
    target.forEach(function (box) {
      if (box.checked) done += 1;
    });
    var pct = target.length ? Math.round((done * 100) / target.length) : 0;
    var bar = document.getElementById("progress-bar");
    var text = document.getElementById("progress-text");
    var count = document.getElementById("progress-count");
    if (bar) bar.style.width = pct + "%";
    if (text) text.textContent = pct + "%";
    if (count) count.textContent = done + " / " + target.length + " topics";
  }

  document.addEventListener("change", function (e) {
    var box = e.target;
    if (!box.matches || !box.matches("input[data-topic]")) return;
    var state = read();
    var id = box.getAttribute("data-topic");
    if (box.checked) state[id] = true;
    else delete state[id];
    write(state);
    paint();
  });

  var reset = document.getElementById("reset-progress");
  if (reset) {
    reset.addEventListener("click", function () {
      if (window.confirm("Clear all topic ticks saved in this browser?")) {
        localStorage.removeItem(KEY);
        paint();
      }
    });
  }

  var filter = document.getElementById("nav-filter");
  if (filter) {
    filter.addEventListener("input", function () {
      var q = filter.value.trim().toLowerCase();
      document.querySelectorAll(".nav-link").forEach(function (link) {
        var show = !q || link.textContent.toLowerCase().indexOf(q) !== -1;
        link.hidden = !show;
      });
      document.querySelectorAll(".subj").forEach(function (block) {
        var any = block.querySelector(".nav-link:not([hidden])");
        block.hidden = !any;
      });
    });
  }

  // Phone layout: the topic list hides behind the Topics button.
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      window.scrollTo(0, 0);
    });
  }

  window.addEventListener("storage", paint);
  paint();
})();
