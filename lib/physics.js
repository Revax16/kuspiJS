/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
 */

KUSPI.physics = function (renderable) {
    var entities = [];

    for (var i in renderable) {
        var r = renderable[i];
        if (r.type === 1) {
            for (var i in r.entities) {
                entities.push(r.entities[i]);
            }
        }
        if (r.type === 2) {
            entities.push(r);
        }
    }

    for (var i in entities) {
        var e = entities[i];
        if (e.physics.g) {
            e.vel.y += 0.51;
            for (var j in entities) {
                var ne = entities[j];
                if (e.id !== ne.id && e.name !== ne.name) {
                    var c = collision(e, ne);
                    if (c[0]) {
                        e.vel.x = c[2].x;
                        e.pos.x = c[3].x;
                    }
                    if (c[1]) {
                        e.vel.y = c[2].y;
                        e.pos.y = c[3].y;
                    }
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
            c = [false, false, {x, y}, {x, y}];
        if ((x + w > nx && x < nx + nw) || (x + w + e.vel.x > nx && x + e.vel.x < nx + nw)) {
            if (y + h <= ny && y + h + e.vel.y >= ny) {
                c[1] = true;
                c[2].y = 0;
                c[3].y = ny - h + ay;
            } else if (y >= ny + nh && y + e.vel.y <= ny + nh) {
                c[1] = true;
                c[2].y = 0.01;
                c[3].y = ny + nh + ay;
            }
        }
        if ((y + h > ny && y < ny + nh) || (y + h + e.vel.y > ny && y + e.vel.y < ny + nh)) {
            if (x + w <= nx && x + w + e.vel.x >= nx) {
                c[0] = true;
                c[2].x = 0;
                c[3].x = nx - w + ax;
            } else if (x >= nx + nw && x + e.vel.x <= nx + nw) {
                c[0] = true;
                c[2].x = 0;
                c[3].x = nx + nw + ax;
            }
        }
        return c;
    }
}
