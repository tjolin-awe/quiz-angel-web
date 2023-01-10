import {EPT, Button} from './utils'
export default class Rank extends Phaser.Scene {
    constructor() {
        super('Rank');
    }


    create() {

		this.currentlevel = EPT.Storage.get('EPT-level');



		if (this.currentlevel >= 9){
			EPT.Storage.set('EPT-level',1);
			this.currentlevel = 1;
		}
		this.difficulty = EPT.Storage.get('EPT-difficulty');
		this.level = this.cache.json.get(`${this.difficulty.toLowerCase()}-levels`).levels[this.currentlevel - 1]; 

		//this.fontRank = { font: '32px ' + EPT.text['FONT'], fill: '#fff',stroke:'#000', strokeThickness: 5 };
		//this.fontRank = { font: '32px ' + EPT.text['FONT'], fill: '#fff', stroke: '#000', strokeThickness: 5 };
		this.fontRank = { font: '42px ' + EPT.text['FONT'], fill: 'blue', stroke: '#fff', strokeThickness: 10 };
		
		
		this.add.image(0, 0, 'background').setOrigin(0,0).setDisplaySize(EPT.world.width,EPT.world.height);
		var menuup =this.add.image(0, 0, 'menu_up').setOrigin(0, 0);
		menuup.displayWidth = EPT.world.width;
		
		this.levelText = this.add.image(80, 25, 'level-text').setScale(0.4).setOrigin(0, 0.5);
		if (desktop) {
			this.levelText.x = 80;


		}
		this.add.image(this.levelText.getRightCenter().x + 10, 25, this.currentlevel.toString()).setOrigin(0.5).setScale(0.4);
		var menudown = this.add.image(0, EPT.world.height, 'menu_down').setOrigin(0, 0);
		menudown.y -= menudown.height;
		menudown.displayWidth = EPT.world.width;
		this.rankText = this.add.text(EPT.world.centerX, 82, this.level.rank, this.fontRank).setOrigin(0.5,0);
		
		
		this.tipText = this.add.text(0,0,'Settings',this.fontTipText).setVisible(false).setDepth(1002);


		this.rankIcon = this.add.image(this.levelText.getLeftCenter().x - 30, this.levelText.getRightCenter().y,`rank${this.currentlevel}`).setOrigin(0.5).setScale(0.5);
		this.buttonPause = new Button(EPT.world.width, 30, 'button-settings', this.clickSettings, this);
		
		
	
		this.buttonPause.x -= 50;
		this.buttonPause.setOrigin(0.5).setScale(0.6).setVisible(true).setDepth(1001);

		if (desktop){
			this.buttonPause.x -= 60;
		}
		this.buttonPause.setToolTip('Settings',false,this);
		this.buttonSound = new Button(this.buttonPause.x - 60, 30, 'button-sound-on', this.clickSound, this);
		this.buttonSound.setOrigin(0.5, 0.5).setScale(0.6);

		
		this.textSound = this.add.text(0, 250, EPT.text['sound-on']);
		this.textSound.setOrigin(0, 0.5).setVisible(false);
		this.buttonSound.setToolTip('Sound',false,this);


		this.buttonMusic = new Button(this.buttonSound.x-60, 30, 'button-music-on', this.clickMusic, this);
		this.buttonMusic.setOrigin(0.5, 0.5).setScale(0.6);
		this.buttonMusic.setToolTip('Music',false,this);
		this.textMusic = this.add.text(0, 0, EPT.text['music-on']);
		this.textMusic.setOrigin(0, 0.5).setVisible(false);

		EPT.Sfx.update('sound', this.buttonSound, this.textSound);
		EPT.Sfx.update('music', this.buttonMusic, this.textMusic);


		this.add.image(EPT.world.centerX, EPT.world.centerY, 'silhouette_girl').setOrigin(0.5);

		this.add.image(EPT.world.centerX,EPT.world.centerY, this.level.rank_texture).setOrigin(0.5);
		var fontName = { font: '62px '+EPT.text['FONT'], fill: '#ffffff', stroke: '#000', strokeThickness: 10, align: 'center', fixedWidth:400 };


		this.fontTitle = { font: '52px ' + EPT.text['FONT'], fill: '#3E2016',stroke:'#fff', strokeThickness: 10 };
	
		this.fontScroll = { font: '42px ' + EPT.text['FONT'], fill: '#3E2016',stroke:'#fff', strokeThickness: 5 };
		this.fontDifficulty = { font: '22px ' + EPT.text['FONT'], fill: '#3E2016',stroke:'#fff', strokeThickness: 2 };
		
		this.fontScrollTitle = { font: '48px ' + EPT.text['FONT'], fill: '#6A2D1B'};
	
		
		var player = EPT.Storage.get('EPT-player');

		var difficulty = EPT.Storage.get('EPT-difficulty')

		this.add.text(this.levelText.getBottomLeft().x, this.levelText.getBottomLeft().y,difficulty,this.fontDifficulty).setOrigin(0,0);

		this.textName = this.add.text(EPT.world.centerX, EPT.world.centerY - 300,player,fontName).setOrigin(0.5); 
		if (desktop) {
			this.textName.y = 25;
			this.textName.setFontSize(32);
			this.textName.setStroke('black',5);
		}

		this.buttonContinue = new Button(EPT.world.centerX, EPT.world.height -100, 'button-continue', this.clickContinue, this);
		this.buttonContinue.setOrigin(0.5).setInteractive().setScale(0.7);

		//this.buttonContinue.x = EPT.world.width+this.buttonContinue.width+20;
		
		var self = this;
	//	this.tweens.add({targets: this.buttonContinue, alpha: {start:255, from:255, to:128}, x: EPT.world.width-80, duration: 500, ease: 'Back'});
		this.buttonContinue.on('pointerover',()=> {
			this.tweens.add({targets: this.buttonContinue, scale: {start:0.7, from:0.7, to: 1}, duration: 500, ease: 'Back',
		onComplete: function(){
			//self.buttonContinue.setToolTip('Continue',true,this);
		}});
			
		});
		this.buttonContinue.on('pointerout',()=> {
			this.tweens.add({targets: this.buttonContinue, scale: {start:1, from:1, to: 0.7}, duration: 500, ease: 'Back'});
		});
		
	//	this.buttonContinue.setToolTip('Continue',true,this);
	

		//this.levelText = this.add.text(30,30,this.level.name, this.fontTitle).setOrigin(0);
		//this.levelText.setStroke('#ddd', 3);
		//this.levelText.setShadow(5, 5, 'rgba(1,1,1,0.5)', 30,true,false);

		//this.rankText.setShadow(5, 5, 'rgba(1,1,1,0.5)', 30,true,false);

		// this.tweens.add({targets: this.rankText, x:30, duration:500, delay:100, ease: 'Back'});
      

		

		this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.keyEnter.on('down', function(key, event) { this.clickContinue(); }, this);

		this.cameras.main.fadeIn(250, 0, 0, 0);
	}
	clickContinue() {
		EPT.Sfx.play('click');
		EPT.fadeOutScene('Game', this);
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
	EPT.LastScreen = 'Rank';
	EPT.fadeOutScene('Settings', this);
	}
	
};