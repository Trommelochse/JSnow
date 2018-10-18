import Snowflake from './Snowflake';

export default class Sky {
    constructor(settings = {}) {
        this.settings = Object.assign(defaultSettings, settings);
        this.getDocumentSize();
        this.snowRate = 12;
        this.snowProbality = 0.0125 * this.settings.snowAmount;
        this.snowflakes = [];

        this.init();
    }
    
    getDocumentSize() {
        this.html = document.documentElement;
        this.body = document.body;
        this.width = window.innerWidth;
        this.height = Math.max(this.body.scrollHeight, this.body.offsetHeight,
            this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight);
    }

    addSnowflake() {
        if (Math.random() < this.snowProbality && this.snowflakes.length < this.settings.maxSnowflakes) {
            this.snowflakes.push(new Snowflake(this));
        }
    }

    init() {
        window.addEventListener('resize', () => this.getDocumentSize());
        this.tick = setInterval(() => this.addSnowflake(), this.snowRate);
    }
}

const defaultSettings = {
    maxSnowflakes: 1000,
    snowAmount: 1,
    snowSpeed: 1,
    textureSources: [
        'https://bpsh2.hs.llnwd.net/e1/echo-cdn-origin/content/nordicbet/sites/3/2017/11/MakeItSnow.png',
        'https://image.ibb.co/nyuMML/5a3ad495867071-94536605151380494955071817.png'
    ]
}