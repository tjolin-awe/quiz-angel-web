import {EPT, Button} from './utils'
export default class Character extends Phaser.Scene {
    constructor() {
        super('Character');
    }
    create() {

        var fontName = { font: '38px ' + EPT.text['FONT'], fill: '#ffffff', stroke: '#000', strokeThickness: 5, align: 'center', fixedWidth: 400 };

        EPT.Storage.set('EPT-returning',false);
        
		this.add.sprite(0, 0, 'background').setOrigin(0,0).setDisplaySize(EPT.world.width, EPT.world.height);
        this.shine = this.add.sprite(0, 0, 'shine').setOrigin(0, 0).setDisplaySize(EPT.world.width,EPT.world.height);

		var menuup = this.add.image(0, 0, 'menu_up').setOrigin(0, 0);
        menuup.displayWidth = EPT.world.width;
		
        var menudown = this.add.image(0, EPT.world.height, 'menu_down').setOrigin(0, 0);
		menudown.y -= menudown.height;
        menudown.displayWidth = EPT.world.width;
        if (desktop){
            menudown.setVisible(false);
        }

        this.textName = this.add.text(EPT.world.centerX, 20, 'Quiz Angel', fontName).setOrigin(0.5);
		

		this.buttonPause = new Button(EPT.world.width, 30, 'button-settings', this.clickSettings, this);
		this.buttonPause.x -= 60;
		this.buttonPause.setOrigin(0.5).setScale(0.6).setVisible(true).setDepth(1001);

		this.buttonSound = new Button(this.buttonPause.x - 60, 30, 'button-sound-on', this.clickSound, this);
		this.buttonSound.setOrigin(0.5, 0.5).setScale(0.6);

		
		this.textSound = this.add.text(0, 250, EPT.text['sound-on']);
		this.textSound.setOrigin(0, 0.5).setVisible(false);



		this.buttonMusic = new Button(this.buttonSound.x-60, 30, 'button-music-on', this.clickMusic, this);
		this.buttonMusic.setOrigin(0.5, 0.5).setScale(0.6);

		this.textMusic = this.add.text(0, 0, EPT.text['music-on']);
		this.textMusic.setOrigin(0, 0.5).setVisible(false);

		EPT.Sfx.update('sound', this.buttonSound, this.textSound);
		EPT.Sfx.update('music', this.buttonMusic, this.textMusic);

        
        this.tweens.add({
                    targets: this.shine,
                    alpha: 0.9,
                    repeat: -1,
                    yoyo: true,
                    duration: 1000,
        });
      


		var fontTitle= { font: '48px '+EPT.text['FONT'], fill: '#F9FBA7', stroke: '#000', strokeThickness: 7, align: 'center' };
		
        var fontTextBox= { font: '48px '+EPT.text['FONT'], fill: '#FFFFFF', stroke: '#000', strokeThickness: 7, align: 'center', fixedWidth:400 };
		
   

        this.add.text(EPT.world.centerX, 100, EPT.text['character_quiz_angel_name'],fontTitle).setOrigin(0.5,0);


        this.girl = this.add.image(EPT.world.centerX, EPT.world.centerY + 200,'girl_intro').setOrigin(0.5)
       
        var origin = this.girl.getTopLeft();

        var self = this;
        var textures = this.textures;
        var logoSource = {
            getRandomPoint: function (vec)
            {
                do
                {
                    var x = Phaser.Math.Between(0, self.girl.width - 1);
                    var y = Phaser.Math.Between(0, self.girl.height - 1);
                    var pixel = textures.getPixel(x, y, 'girl_intro');
                } while (pixel.alpha < 255);
    
                return vec.setTo(x + origin.x, y + origin.y);
            }
        };
    
        var particles = this.add.particles('flares');
    
        this.emitter = particles.createEmitter({
            x: 0,
            y: 0,
            lifespan: 1000,
            gravityY: 10,
            scale: { start: 0, end: 0.25, ease: 'Quad.easeOut' },
            alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
            blendMode: 'ADD',
            emitZone: { type: 'random', source: logoSource }
        });

		var buttonContinue = new Button(EPT.world.width-20, EPT.world.height-20, 'button-continue', this.clickContinue, this);
		buttonContinue.setOrigin(1,1);

		buttonContinue.x = EPT.world.width+buttonContinue.width+20;
		this.tweens.add({targets: buttonContinue, x: EPT.world.width-20, duration: 500, ease: 'Back'});

		this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.keyEnter.on('down', function(key, event) { this.clickContinue(); }, this);

		this.cameras.main.fadeIn(250, 0, 0, 0);

        self = this
        this.girlselected = true;
        this.cameras.main.once('camerafadeincomplete', function (camera) {
			

        
                
        
			
          
           
        }, this);

 
        this.textbox = this.add.image(EPT.world.centerX, EPT.world.centerY - 50,'textbox_edit').setOrigin(0.5).setAlpha(0.2)
        
        this.text = this.add.text(EPT.world.centerX, EPT.world.centerY - 50, "Enter name...",fontTextBox);
        this.text.setOrigin(0.5);

        this.text.setInteractive().on('pointerdown', () => {

           if (this.text.text === "Enter name...")
                this.text.setText('');

            
            var s = this.rexUI.edit(this.text);
            s.inputText.fontColor = 'black';
            

        });
      

       

	}
	clickContinue() {

        var name = this.text.text;
     
        if (name === '') {
            name = "Enter name...";
            this.text.setText(name);
        }

        if (name === "Enter name...") {
            this.tweens.add({
                    targets: this.text,
                    duration: 200,
                    scale: { start:1, from:1, to:1.3, ease: 'Quad.easeOut' },
                    yoyo: true,
                    repeat: 0
                });
            
            return;
        }

        

        EPT.Storage.set('EPT-player',name);
		EPT.Sfx.play('click');
		EPT.fadeOutScene('Difficulty', this);
	}
    clickSound() {
		EPT.Sfx.play('click');
		EPT.Sfx.manage('sound', 'switch', this, this.buttonSound, this.textSound);
	}
	clickMusic() {
		EPT.Sfx.play('click');
		EPT.Sfx.manage('music', 'switch', this, this.buttonMusic, this.textMusic, 'music-theme');
	}
	clickSettings() {
        EPT.LastScreen = 'Character';
	EPT.fadeOutScene('Settings', this);
	}
};