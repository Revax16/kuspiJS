# KuspiJS
A JS game Engine inspired by MelonJS and StageJS

## Example
Basic Example

```javascript
var game = new KUSPI.Game();
game.setView(width, height, parent);            // Défaut => width:600, height:400, parent:document.body

var container, player;
function setup () {
    container = new KUSPI.Container('border', { // Créer un Container pour contenir certain Entity
        gravity:true,                           // La gravité est activé dans ce container
    });
    game.appendChild(container);                // On ajoute le container à l'app

    player = new KUSPI.Entity('player', {       // Créer un Entity et la nomme player
        pos:KUSPI.vector(0, 0),                 // Utilise la méthode KUSPI.vector pour créer un nouveau vecteur
        width:10,                               // Défini la largeur
        height:game.view.height,                // Défini la hauteur
        gravity:true,                           // Gravité activé pour l'entité
        collision:true,                         // collision activé pour l'entité
        degree:0,                               // Rotation de l'objet
        anchor:KUSPI.vector(0,0),               // Le point de rotation de l'objet
        vel:KUSPI.vector(0,0)                   // Velocité en x et y
    });

    container.appendChild(player);              // Ajoute l'entité au container
}

function update() {                             // À chaque frame
    if (KUSPI.inputs.KEY(65)) {                 // On regarde si la touche avec le keyCode 65 en enfoncé
        player.vel.x = -4;                      // Si oui on met la velocité à -4
    } else if (KUSPI.inputs.KEY(68)) {          // On regarde si la touche avec le keyCode 68 en enfoncé
        player.vel.x = 4;                       // Si oui on met la velocité à 4
    } else player.vel.x = 0;                    // Sinon, on met la velocité à 0

    KUSPI.renderer(container);                  // On affiche le container
}
```

## Documentation

### KUSPI.Game({setup, update})
Initialize a new app or game

Parameters:

Name     | Type       | Opt. | Default      | Description
-------- | ---------- | ---- | ------------ | -----------
setup    | CallBack   | True | `setup`      | Function call 1 time when the app is initialized
update   | CallBack   | True | `update`     | Function call on each refresh (60 times per second normally)

#### \<Game\>.setView(width, height, parent)
Append the Canvas in the parent and set the width and the height

Parameters:

Name     | Type       | Opt. | Default        | Description
-------- | ---------- | ---- | -------------- | ------------
width    | Number     | True | 600            | Width of the canvas
height   | Number     | True | 400            | Height of the canvas
parent   | Element    | True | `document.body`| Parent to append the canvas

#### \<Game\>.appendChild(container)
Append a container to the app

Parameters:

Name     | Type       | Opt.  | Description
----     | ----       | ----  | -----------
container| Object     | False | Represent a container

### KUSPI.Container(name, {pos, height, width, gravity, collision})
Create a new container. A container can store some Entities and apply or not the gravity and collision

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
name           | String        | False | -                   | Name of the container
prop.pos*      | Vector Object | True  | `KUSPI.vector(0,0)` | Position of the container
prop.height*   | Number        | True  | \<Game\>.view.height| Height of the container
prop.width*    | Number        | True  | \<Game\>.view.width | Width of the container
prop.gravity   | Boolean       | True  | False               | Wether or not the gravity is applied
prop.collision | Boolean       | True  | True                | Wether or not the collisions are applied

\*Not Implemented yet

#### \<Container\>.setProp({pos, width, height})
Set new value to the pos, width and/or height of the Container

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
porp.pos       | Vector Object | True  | Current Value       | Change the position of the Container
porp.width     | Number        | True  | Current Value       | Change the width of the Container
porp.height    | Number        | True  | Current Value       | Change the height of the Container

#### \<Container\>.appendChild(entities)
Append an Entity to the Container

Parameters:

Name     | Type            | Opt.  | Description
----     | ----            | ----  | -----------
entities | Object or Array | False | An Entity or an Array of Entities

### KUSPI.Entity(name, {pos, height, width, vel, degree, radian, anchor, gravity, collision})
Create a new container. A container can store some Entities and apply or not the gravity and collision

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
name           | String        | False | -                   | Name of the Entity
prop.pos       | Vector Object | True  | `KUSPI.vector(0,0)` | Position of the Entity
prop.height    | Number        | True  | 30                  | Height of the Entity
prop.width     | Number        | True  | 30                  | Width of the Entity
prop.vel       | Vector Object | True  | `KUSPI.vector(0,0)` | Velocity in X and Y of the Entity
prop.anchor    | Vector Object | True  | `KUSPI.vector(0,0)` | Anchor point of the Entity (between 0 and 1)
prop.degree    | Number        | True  | 0                   | Angle in degree of the Entity
prop.radian    | Number        | True  | 0                   | Angle in radian of the Entity
prop.gravity   | Boolean       | True  | False               | Wether or not the gravity is applied
prop.collision | Boolean       | True  | True                | Wether or not the collisions are applied

#### \<Entity\>.setProp({pos, width, height, anchor, degree, radian})
Set new value to the pos, width, height, anchor point, degree and/or radian of the Entity

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
porp.pos       | Vector Object | True  | Current Value       | Change the position of the Container
porp.width     | Number        | True  | Current Value       | Change the width of the Container
porp.height    | Number        | True  | Current Value       | Change the height of the Container
porp.anchor    | Vector Object | True  | Current Value       | Change the anchor point of the Container
porp.degree    | Number        | True  | Current Value       | Change the degree of the Container
porp.radian    | Number        | True  | Current Value       | Change the radian of the Container

#### \<Entity\>.anim(name, fps)
Texture or animate a sprite (see KUSPI.Texture)

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
name           | String        | False | -                   | Name of the texture and the animation (eg.: 'texture:animation')
fps            | Number        | True  | 0                   | Number of fps for the animation

### KUSPI.Texture({name, src, anim, sprites})
Create a Texture

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
prop.name      | String        | False | -                   | Name of the Texture
prop.src       | String        | False | -                   | Src of the image
prop.sprites   | Object        | False | -                   | List of sprites created from the image
prop.anim      | Object        | False | -                   | List of animation created from the sprites

Exemple :

```javascript
new KUSPI.Texture({
    name:'Exemple',
    src:'image.png',
    sprites:{
        s1:{
            pos:KUSPI.vector(0, 0),
            height:200,
            width:200
        },
        s2:{
            pos:KUSPI.vector(200, 0),
            height:200,
            width:200
        }
    },
    anim:{
        test:['s1', 's2']
    }
});
```

### KUSPI.vector(x, y)
Create a Vector Object

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
x              | Number        | False | -                   | Position in X
y              | Number        | False | -                   | Position in Y

#### \<vector\>.add(x, y)
Add to the vector

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
x              | Number        | False | -                   | Position in X
y              | Number        | False | -                   | Position in Y

#### \<vector\>.sub(x, y)
Substring to the vector

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
x              | Number        | False | -                   | Position in X
y              | Number        | False | -                   | Position in Y

#### \<vector\>.mult(x, y)
Multiply to the vector

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
x              | Number        | False | -                   | Position in X
y              | Number        | False | -                   | Position in Y

#### \<vector\>.div(x, y)
Divide to the vector

Parameters:

Name           | Type          | Opt.  | Default             | Description
----           | ----          | ----  | -------             | -----------
x              | Number        | False | -                   | Position in X
y              | Number        | False | -                   | Position in Y

### KUSPI.renderer(renderable, game)
Render given objects

Parameters:

Name           | Type            | Opt.  | Default             | Description
----           | ----            | ----  | -------             | -----------
renderable     | Object or Array | False | -                   | An Entity or Container or an Array of Entities and/or Containers
game           | Object          | True  | -                   | If only an Entity or Entities are given, required, Represent a Game Object

### KUSPI.inputs.KEY(keyCode)
Return true if the key is pressed

Parameters:

Name           | Type            | Opt.  | Default             | Description
----           | ----            | ----  | -------             | -----------
keyCode        | Number          | False | -                   | a key code number
