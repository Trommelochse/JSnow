export default class Snowflake {
    constructor(sky) {
        this.sky = sky;

        this.size = randFloat(7,30,2);
        this.speed = calculateSpeed(this.size) * Math.pow(this.sky.settings.snowSpeed, -1);
        this.rotationSpeed = randFloat(-0.6, 0.6, 1);
        this.blur = calculateBlur(this.size);
        this.opacity = randFloat(0.13,0.3,3);
        this.cssRotate = randInt(0, 45);

        this.x = Math.floor(Math.random() * Math.floor(sky.width));
        this.y = this.size * - 1;

        this.init();
    }

    move() {
        if (this.y + this.size * 1.35 > this.sky.height) {
            this.die();
            this.sky.snowflakes = this.sky.snowflakes.filter(flake => flake.alive);
            return;
        }
        this.y++;
        this.cssRotate += this.rotationSpeed;
    }

    updateStyle() {
        this.ref.style.top = this.y + 'px';
        this.ref.style.left = this.x + 'px';
        this.ref.style.transform =`rotate(${this.cssRotate}deg)`;
    }

    die() {
        this.ref.remove();
        clearInterval(this.tick);
        this.alive = false;
    }

    init() {
        this.ref = document.createElement("img");
        this.ref.setAttribute('src', randomizeFlakeTexture(this.sky.settings.textureSources));
        this.ref.classList.add('JSnowflake');
        this.ref.style.display = 'block';
        this.ref.style.position = 'absolute';
        this.ref.style.pointerEvents = 'none';
        this.ref.style.width = `${this.size}px`;
        this.ref.style.height = `${this.size}px`;
        this.ref.style.top = this.y + 'px';
        this.ref.style.left = this.x + 'px';
        this.ref.style.opacity = this.opacity;
        this.ref.style.transform =`rotate(${this.cssRotate}deg)`;
        this.ref.style.filter = `blur(${this.blur}px)`;

        this.sky.body.appendChild(this.ref);

        this.tick = setInterval(() => {
            this.move();
            this.updateStyle();
        }, this.speed);

        this.alive = true;
    }
}

const randInt = (min,max) => Math.floor(Math.random() * ( max - min + 1) + min);

const randFloat = (min,max,decimals) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const calculateSpeed = size => (-1.4 * size + 51) + randInt(-1, 4);

const calculateBlur = size => -0.145 * size + 2.6;

const randomizeFlakeTexture = sources => sources[randInt(0,sources.length - 1)];