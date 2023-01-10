import {EPT, Button} from './utils'
export default class Award extends Phaser.Scene {
    constructor() {
        super('Award');
    }
    create() {

		
		EPT.Sfx.stopMusic('music-quiz');
		EPT.Sfx.playMusic('music-award');
		this.currentlevel = EPT.Storage.get('EPT-level');
		this.difficulty = EPT.Storage.get('EPT-difficulty');
		this.level = this.cache.json.get(`${this.difficulty.toLowerCase()}-levels`).levels[this.currentlevel - 1]; 
		this.add.image(0, 0, 'background').setOrigin(0,0).setDisplaySize(EPT.world.width, EPT.world.height);

		var fontStory = { font: '52px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
		this.fontTitle = { font: '82px ' + EPT.text['FONT'], fill: '#3E2016',stroke:'#fff', strokeThickness: 10 };
		
		this.fontAward = { font: '42px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 12, align: 'center' };
		this.fontAwardVerse = { font: '32px '+EPT.text['FONT'], fill: '#ffffff', stroke: '#000', strokeThickness: 7, align: 'center' };
		
		this.fontAwardDesc = { font: '72px '+EPT.text['FONT'], fill: '#226E4A', stroke: '#fff', strokeThickness: 12, align: 'center' };
	
		
		
		var rank = EPT.Storage.get('EPT-rank');
		var level = EPT.Storage.get('EPT-level');
		var strLevel = level > 9 ? level.toString() : '0'+level.toString();

	
		this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.keyEnter.on('down', function(key, event) { this.clickContinue(); }, this);

		this.cameras.main.fadeIn(250, 0, 0, 0);

		this.anims.create({
            key: 'column',
            frames: this.anims.generateFrameNumbers('column-effect', { frames: [ 0, 1, 2, 3, 4,5,6,7,8,9] }),
            frameRate: 16,
            repeat: -1
        });

		
		const cody = this.add.sprite(EPT.world.centerX,EPT.world.centerY + 100);
        cody.setScale(4);
        cody.play('column');




		

		var award = this.add.image(EPT.world.centerX, EPT.world.height,this.level.award_texture).setOrigin(0.5);
		award.y += award.height + 20;



		var self = this;
		this.tweens.add({
			targets: award,
			y: EPT.world.centerY -150,
			ease: 'Back',
			duration: 800,
			onComplete: function(){
				self.add.text(EPT.world.centerX, 30,'You did it!',self.fontTitle).setOrigin(0.5,0).setWordWrapWidth(620).setAlign('center');
				self.tweens.add({
					targets: award,
					scale: 1.2,
					ease: 'Back',
					duration: 1000,
					yoyo:true, 
					onComplete:function() {
						self.tweens.add({targets: award, angle: award.angle-2, duration: 1100, ease: 'Sine.easeInOut' });
						self.tweens.add({targets: award, angle: award.angle+3, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });
				
					}
					});
				

				self.time.delayedCall(1000, ()=>{
					var award_desc = self.add.text(EPT.world.centerX, EPT.world.centerY, self.level.award_desc, self.fontAwardDesc).setOrigin(0.5,0).setWordWrapWidth(630).setAlign('center')	
					self.add.text(EPT.world.centerX, award_desc.getBottomCenter().y + 30,`"${self.level.award_verse}"`,self.fontAwardVerse).setOrigin(0.5,0).setWordWrapWidth(630).setAlign('center');
					self.tweens.add({
						targets: award_desc,
						scale: 1.2,
						yoyo:true,
						ease: 'Back',
						duration: 500});	

						self.buttonContinue = new Button(EPT.world.centerX, EPT.world.height -100, 'button-continue', self.clickContinue, self);
						self.buttonContinue.setOrigin(0.5).setInteractive().setScale(0.7);

						if (self.game.device.os.desktop == true){
							self.buttonContinue.x = EPT.world.width - EPT.world.width / 4;
						}
				
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

		})
		
	}
	clickContinue() {
		EPT.Sfx.play('click');
		EPT.fadeOutScene('LevelEnd', this);
	}
	stateBack() {
		EPT.Sfx.play('click');
		EPT.fadeOutScene('MainMenu', this);
	}
};