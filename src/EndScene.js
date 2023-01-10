import {EPT, Button} from './utils'




export default class EndScene extends Phaser.Scene {
	
    constructor() {
        super('EndScene');
    }


    create() 	
{

	
		EPT.Storage.set('EPT-level',1);
		EPT.Storage.set('EPT-player','');
		EPT.Storage.set('EPT-difficulty','');
		

		this.add.sprite(0, 0, 'heaven').setOrigin(0,0).setDisplaySize(EPT.world.width, EPT.world.height)
		this.sparkles = this.add.sprite(EPT.world.centerX,300).setScale(2);
		this.castle =this.add.image(EPT.world.centerX,300,'heaven-castle').setOrigin(0.5).setAlpha(0).setScale(2);
		this.rainbow = this.add.image(EPT.world.centerX,300,'rainbow').setOrigin(0.5).setAlpha(0).setScale(2);
		var player = EPT.Storage.get('EPT-player');

		var particles = this.add.particles('spark');

		this.fontStory = { font: '62px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
		this.fontWhite = { font: '48px '+EPT.text['FONT'], fill: '#ffffff', stroke: '#000', strokeThickness: 7, align: 'center' };
	
		
		
		this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.keyEnter.on('down', function(key, event) { this.clickContinue(); }, this);

		this.cameras.main.fadeIn(250, 0, 0, 0);
	  // Animation set
		 
       

		
		
		this.angel = this.add.image(EPT.world.centerX, EPT.world.height,'angel-cover').setOrigin(0.5);
		this.emitter = particles.createEmitter();



		var origin = this.angel.getTopLeft();

		var textures =this.textures;
		var self1 = this;
		this.logoSource = {
            getRandomPoint: function (vec)
            {
                do
                {
                    var x = Phaser.Math.Between(0, self1.angel.width - 1);
                    var y = Phaser.Math.Between(0, self1.angel.height - 1);
                    var pixel = textures.getPixel(x, y, 'angel-cover');
                } while (pixel.alpha < 255);
    
                return vec.setTo(x + origin.x, y + origin.y);
            }
        };


	
		this.emitter.setPosition(EPT.world.centerX, EPT.world.centerY);
		this.emitter.setSpeed(600);
		this.emitter.setBlendMode(Phaser.BlendModes.ADD);
		this.emitter.startFollow(this.angel);
		this.angel.y = EPT.world.height+this.angel.height +20;
		var self = this;
		this.tweens.add({
			targets: this.angel,
			y: EPT.world.centerY,
			duration: 3000,
			ease: 'Back',
			onComplete: function(){
				self.tweens.add({
				targets: self.angel,
				y: -self.angel.height -20,
				duration: 3000,
			
				onComplete: function(){
					
					self.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
						
						self.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
							
							self.emitter = particles.createEmitter();
	
							self.emitter.setPosition(EPT.world.centerX, EPT.world.centerY);
							self.emitter.setSpeed(300);
							self.emitter.setScale(0.5);
							self.emitter.setBlendMode(Phaser.BlendModes.ADD);
							self.emitter.startFollow(self.angel);
							self.angel.y = EPT.world.height+self.angel.height +20;
							
							self.tweens.add({
								targets: self.angel,
								y: EPT.world.centerY,
								duration: 3000,
								ease:'Back',
								onComplete: function(){
									self.emitter.explode();

									var congrats = self.add.text(EPT.world.centerX, EPT.world.centerY + 220, 'Congratulations',self.fontStory).setOrigin(0.5);
									var subtitle = self.add.text(EPT.world.centerX, EPT.world.centerY + 340, 'Can you get another angel their wings to fly to heaven?',self.fontWhite).setOrigin(0.5).setAlign('center').setWordWrapWidth(500);
									if (desktop){
										subtitle.setWordWrapWidth(800);
									}
									self.time.delayedCall(8000,()=> {
										subtitle.destroy();
										self.buttonContinue = new Button(EPT.world.centerX, EPT.world.centerY + 340, 'button-restart', self.clickContinue, self);
										self.buttonContinue.setOrigin(0.5).setInteractive().setScale(0.7);

										//this.buttonContinue.x = EPT.world.width+this.buttonContinue.width+20;
										
									//	this.tweens.add({targets: this.buttonContinue, alpha: {start:255, from:255, to:128}, x: EPT.world.width-80, duration: 500, ease: 'Back'});
										self.buttonContinue.on('pointerover',()=> {
											self.tweens.add({targets: self.buttonContinue, scale: {start:0.7, from:0.7, to: 1}, duration: 500, ease: 'Back'});

										});
										self.buttonContinue.on('pointerout',()=> {
											self.tweens.add({targets: self.buttonContinue, scale: {start:1, from:1, to: 0.7}, duration: 500, ease: 'Back'});
										});
		
	
									});
								}
							});
						});
					
						self.angel.setScale(0.9);

					
       
						
      
						var flares = self.add.particles('flares').setDepth(10000);
					
						var getrandomPoint = self.getRandomPoint;
						self.emitter2 = flares.createEmitter({
							x: 0,
							y: 0,
							lifespan: 1000,
							gravityY: 10,
							scale: { start: 0, end: 0.25, ease: 'Quad.easeOut' },
							alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
							blendMode: 'ADD',
							emitZone: { type: 'random', source: self.logoSource }
						});
							
						self.castle.setAlpha(1);

						self.tweens.add({
							targets: self.rainbow,
							alpha: {start:0, from:0, to:1},
							duration: 3000,
						})



						self.anims.create({
							key: 'sparkle',
							frames: self.anims.generateFrameNumbers('heavensparkle', { frames: [ 0, 1, 2, 3, 2, 1, 0] }),
							frameRate: 3,
							repeat:-1,
							
						});
						
						self.sparkles.play('sparkle');
						self.emitter.setVisible(false);
						self.emitter.explode();
					
						self.cameras.main.fadeIn(250, 0, 0, 0);


					})
					self.cameras.main.fadeOut(250, 0, 0, 0);

				}
			});
			}
		});
	
		
	
		
	}
	clickContinue() {
		EPT.Sfx.play('click');
		EPT.Storage.set('EPT-level',1);
		EPT.Storage.set('EPT-player', '');
		this.tweens.killAll();
		EPT.fadeOutScene('MainMenu', this);
	}

	typeWriterText(text)
	{
		var length = text.length
		var i = 0
		this.time.addEvent({
			callback: () => {
				this.textStory.text += text[i]
				++i
			},
			repeat: length - 1,
			delay: 100
		})
	}
};