/**
 * KuspiJS Game Engine
 * Copyright (C) 2017, Xavier "Revax16"
 */

KUSPI.core = function () {
    KUSPI.setup();
    if (this.ctx !== null) {
        var animate = function () {
            KUSPI.update();
            window.requestAnimationFrame(animate);
        }
        animate();
    }
    window.addEventListener('keydown', function(e) {
        KUSPI.inputs.key[e.keyCode || e.which] = true;
    });
    window.addEventListener('keyup', function(e) {
        KUSPI.inputs.key[e.keyCode || e.which] = false;
    });
    window.addEventListener('mousedown', function (event) {
        var mc = mouseCollision(event);
        if (mc[0] && mc[1].events.CLICK !== null) mc[1].events.CLICK();
    });
    window.addEventListener('mousemove', function (event) {
        var mc = mouseCollision(event);
        if (mc[0] && mc[1].events.CLICK !== null) mc[1].events.MM();
    });
    var mouseCollision = function (event) {
        for (var i in KUSPI.entities) {
            var e = KUSPI.entities[i];
            if (e.events.click !== null) {
                var x = e.pos.x - e.width * e.anchor.x,
                    y = e.pos.y - e.height * e.anchor.y,
                    w = e.width,
                    h = e.height,
                    mx = event.clientX - KUSPI.view.offsetLeft,
                    my = event.clientY - KUSPI.view.offsetTop;
                if (mx >= x && mx <= x + w && my >= y && my <= y + h) {
                    return [true, e];
                }
            }
        }
        return [false, ''];
    }
}

KUSPI.setView = function (set) {
    if (typeof set !== 'object') set = {};
    p = set.parent || document.body;
    w = set.width || 600;
    h = set.height || 400;

    var c = document.createElement('CANVAS');
    c.width = w;
    c.height = h;
    p.appendChild(c);

    KUSPI.view.canvas = c;
    KUSPI.view.ctx = c.getContext('2d');
    KUSPI.view.width = w;
    KUSPI.view.height = h;
}

KUSPI.resize = function (set) {
    if (typeof set !== 'object') set = {};
    KUSPI.view.width = set.width || KUSPI.view.width;
    KUSPI.view.height = set.height || KUSPI.view.height;
    KUSPI.view.canvas.height = KUSPI.view.height;
    KUSPI.view.canvas.width = KUSPI.view.width;
}
