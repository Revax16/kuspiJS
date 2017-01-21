/**
 * KuspiJS Game Engine
 * Copyright (C) 2017, Xavier "Revax16"
 */

KUSPI.renderer = function (renderable) {
    if (!Array.isArray(renderable)) renderable = [renderable];

    KUSPI.physics(renderable);
    KUSPI.updateView();

    // Internal Variable
    var canvas = KUSPI.view.canvas,
        ctx = KUSPI.view.ctx,
        view = KUSPI.view;

    ctx.clearRect(0, 0, view.width, view.height);

    for (var i in renderable) {
        var r = renderable[i];
        // If it's a container
        if (r.type === 1) {
            for (var i in r.entities) {
                if (r.entities[i].visible) drawShape(r.entities[i]);
            }
            for (var i in r.particleEmitters) {
                drawParticles(r.particleEmitters[i]);
            }
        }
        // If it's a shape
        if (r.type === 2) {
            if (r.visible) drawShape(r);
        }
        if (r.type === 3) {
            drawParticles(r);
        }
    }

    // Draw the shape
    function drawShape (entity) {
        ctx.save();
        ctx.translate(entity.pos.x, entity.pos.y);
        ctx.rotate(entity.angle);
        ctx.translate(-(entity.anchor.x * entity.width), -(entity.anchor.y * entity.height));
        if (entity.texture.anim !== null) {
            if (KUSPI.textures.hasOwnProperty(entity.texture.anim.name)) {
                var texture = KUSPI.textures[entity.texture.anim.name],
                    sprite = texture.sprites[texture.anim[entity.texture.anim.anim][entity.texture.frame]],
                    interval = 1000 / entity.texture.anim.fps,
                    lastFrame = entity.texture.lastFrame;

                ctx.drawImage(texture.img, sprite.pos.x, sprite.pos.y, sprite.w, sprite.h, 0, 0, entity.width, entity.height);
                if (Date.now() - lastFrame > interval) {
                    entity.texture.frame++;
                    entity.texture.lastFrame = Date.now() - ((Date.now() - lastFrame) % interval);
                    if (texture.sprites.length <= entity.texture.frame && entity.texture.frame !== 0) {
                        if (entity.events.ANIMEND !== null) entity.events.ANIMEND();
                        entity.texture.frame = 0;
                    }
                }
            }
        } else {
            ctx.fillStyle = entity.color;
            ctx.fillRect(0, 0, entity.width, entity.height)
        }
        ctx.restore();
    }

    function drawParticles (pe) {
        pe.newParticles();
        for (var i in pe.particles) {
            var p = pe.particles[i];
            p.compute();
            if (p.texture !== undefined && KUSPI.textures.hasOwnProperty(p.texture.split(':')[0])) {
                var texture = KUSPI.textures[p.texture.split(':')[0]],
                    sprite = texture.sprites[p.texture.split(':')[1]];
                ctx.drawImage(texture.img, sprite.pos.x, sprite.pos.y, sprite.w, sprite.h, p.pos.x, p.pos.y, p.width, p.height);
            } else {
                ctx.fillStyle = p.color;
                ctx.fillRect(p.pos.x, p.pos.y, p.width, p.height);
            }
        }
    }

    function getPoints (entity, shape) {
        switch (shape) {
            default: return [
                KUSPI.vector(0, 0),
                KUSPI.vector(entity.width, 0),
                KUSPI.vector(entity.width, entity.height),
                KUSPI.vector(0, entity.height),
            ]

        }
    }
}
