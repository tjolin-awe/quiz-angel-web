import WebFont from 'webfontloader'
import {EPT} from './utils.js'

export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        this.load.image('background', 'assets/backgrounds/title.png');
        this.load.image('logo', 'assets/ui/loadingimage.png');
        this.load.image('loading-background', 'assets/ui/loading-background.png');
        WebFont.load({ custom: { families: ['Berlin'], urls: ['assets/fonts/BRLNSDB.css'] } });
    }
    create() {
         EPT.world = {
            width:   this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };

        console.log(EPT.world);
    
        EPT.Lang.updateLanguage('en');
        EPT.text = EPT.Lang.text[EPT.Lang.current];

        EPT.Storage.set('EPT-returning',true);
      
        this.scene.start('Preloader');
    }
}