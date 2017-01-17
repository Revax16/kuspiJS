/**
 * KuspiJS Game Engine
 * Copyright (C) 2016, Xavier "Revax16" Hamel
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
                drawShape(r.entities[i]);
            }
        }
        // If it's a shape
        if (r.type === 2) {
            drawShape(r);
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
                    sprite = texture.sprites[entity.texture.frame],
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
            } else {
                ctx.fillStyle = 'red';
                ctx.fillRect(0, 0, entity.width, entity.height)
            }
        } else {
            ctx.fillStyle = 'CCC';
            ctx.fillRect(0, 0, entity.width, entity.height)
        }
        // Pour la rotation : http://stackoverflow.com/questions/4649836/using-html5-canvas-rotate-image-about-arbitrary-point/4650102#4650102
        ctx.restore();
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
