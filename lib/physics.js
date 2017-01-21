/**
 * KuspiJS Game Engine
 * Copyright (C) 2017, Xavier "Revax16"
 */

KUSPI.physics = function (renderable) {
    var entities = [];
    for (var i in renderable) {
        var r = renderable[i];
        if (r.type === 2) entities.push(r);
        else if (r.type === 1) {
            entities = entities.concat(r.entities);
        }
    }
    for (var i in entities) {
        var e = entities[i];
        if (e.physics.g) {
            e.vel.y += 0.51;
            e.physics.p = [];
            for (var j in entities) {
                var ne = entities[j];
                if (e.id !== ne.id && e.name !== ne.name) {
                    var c = collision(e, ne);
                    if (e.physics.c && ne.physics.c) {
                        if (c[0]) {
                            e.vel.x = 0;
                            e.pos.x = c[2].x;
                        }
                        if (c[1]) {
                            e.vel.y = 0;
                            e.pos.y = c[2].y;
                        }
                    }
                    e.physics.p = e.physics.p.concat(c[3]);
                }
            }
        }
        e.pos.x += e.vel.x;
        e.pos.y += e.vel.y;
    }
    function collision (e, ne) {
        var ax = e.width * e.anchor.x,
            ay = e.height * e.anchor.y,
            x = e.pos.x - ax,
            y = e.pos.y - ay,
            w = e.width,
            h = e.height,
            nax = ne.width * ne.anchor.x,
            nay = ne.height * ne.anchor.y,
            nx = ne.pos.x - nax,
            ny = ne.pos.y - nay,
            nw = ne.width,
            nh = ne.height,
            c = [false, false, {x, y}, []];
        if ((x + w > nx && x < nx + nw) || (x + w + e.vel.x > nx && x + e.vel.x < nx + nw)) {
            if (y + h <= ny && y + h + e.vel.y >= ny) {
                c[1] = true;
                c[2].y = ny - h + ay;
                c[3].push(['bottom', ne]);
            } else if (y >= ny + nh && y + e.vel.y <= ny + nh) {
                c[1] = true;
                c[2].y = ny + nh + ay;
                c[3].push(['top', ne]);
            }
        }
        if ((y + h > ny && y < ny + nh) || (y + h + e.vel.y > ny && y + e.vel.y < ny + nh)) {
            if (x + w <= nx && x + w + e.vel.x >= nx) {
                c[0] = true;
                c[2].x = nx - w + ax;
                c[3].push(['right', ne]);
            } else if (x >= nx + nw && x + e.vel.x <= nx + nw) {
                c[0] = true;
                c[2].x = nx + nw + ax;
                c[3].push(['left', ne]);
            }
        }
        if (x + w > nx && x < nx + nw && y + h > ny && y < ny + nh) {
            c[3].push(['inside', ne]);
        }
        return c;
    }
}
