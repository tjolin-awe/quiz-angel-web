import {EPT, Button} from './utils'
export default class Settings extends Phaser.Scene {
    constructor() {
        super('Settings');
    }
	

    create() {

		this.add.sprite(0, 0, 'background').setOrigin(0, 0).setDisplaySize(EPT.world.width, EPT.world.height);
		this.screenName = 'settings';



		this.buttonBack = new Button(20, 20, 'button-back', this.clickBack, this);
		this.buttonBack.setOrigin(0, 0);
		this.buttonBack.y = -this.buttonBack.height-20;
		this.tweens.add({targets: this.buttonBack, y: 20, duration: 500, ease: 'Back'});

		var fontTitle = { font: '46px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
		var fontSubtitle = { font: '38px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5, align: 'center' };
		var fontSmall = { font: '28px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 4, align: 'center' };
		var titleSettings = this.add.text(EPT.world.centerX, 60, EPT.text['settings'], fontTitle);
		titleSettings.setOrigin(0.5, 0.5);
		var offsetLeft = 130;
		
		this.buttonSound = new Button(offsetLeft+40, 250, 'button-sound-on', this.clickSound, this);
		this.buttonSound.setOrigin(0.5, 0.5);
		this.textSound = this.add.text(offsetLeft+30+this.buttonSound.width, 250, EPT.text['sound-on'], fontSubtitle);
		this.textSound.setOrigin(0, 0.5);
		this.buttonMusic = new Button(offsetLeft+40, 375, 'button-music-on', this.clickMusic, this);
		this.buttonMusic.setOrigin(0.5, 0.5);
		this.textMusic = this.add.text(offsetLeft+30+this.buttonMusic.width, 375, EPT.text['music-on'], fontSubtitle);
		this.textMusic.setOrigin(0, 0.5);
		this.buttonCredits = new Button(offsetLeft+40, 500, 'button-credits', this.clickCredits, this);
		this.buttonCredits.setOrigin(0.5, 0.5);
		this.textCredits = this.add.text(offsetLeft+30+this.buttonCredits.width, 500, EPT.text['credits'], fontSubtitle);
		this.textCredits.setOrigin(0, 0.5);	
		
		this.buttonStartNewGame = new Button(EPT.world.width, 10, 'button-reset', this.clickNewGame, this);
		this.buttonStartNewGame.setOrigin(0.5,0).setScale(0.3).x -= this.buttonStartNewGame.displayWidth;
		
		this.textStartNewGame = this.add.text(this.buttonStartNewGame.getCenter().x,this.buttonStartNewGame.getBottomCenter().y +10, 'Reset Game', fontSubtitle).setFontSize(18).setColor('red');
		this.textStartNewGame.setOrigin(0.5, 0.5);		

		/*
        this.bannerBeer = new Button(EPT.world.centerX, EPT.world.height-60, 'banner-beer', this.clickBeer, this, 'static');
		this.bannerBeer.setOrigin(0.5, 1);
		*/
		// if(document.monetization && document.monetization.state === 'started') {
		// 	this.bannerBeer.destroy();
		// 	this.add.text(EPT.world.centerX, EPT.world.height-60, 'Thank you\nfor supporting EPT!', fontSubtitle).setOrigin(0.5, 1);
		// }

		/*
		if(document.monetization) {
			if(document.monetization.state === 'started') {
				if(this.bannerBeer) {
					this.bannerBeer.destroy();
				}
				this.add.text(EPT.world.centerX, EPT.world.height-60, 'Thank you\nfor supporting EPT\nwith Web Monetization!', fontSubtitle).setOrigin(0.5, 1);
			} else {
				document.monetization.addEventListener('monetizationstart', function(event) {
					if(this.bannerBeer) {
						this.bannerBeer.destroy();
					}
					this.add.text(EPT.world.centerX, EPT.world.height-60, 'Thank you\nfor supporting EPT\nwith Web Monetization!', fontSubtitle).setOrigin(0.5, 1);
				}, this);
			}
		}
		*/
		EPT.Sfx.update('sound', this.buttonSound, this.textSound);
		EPT.Sfx.update('music', this.buttonMusic, this.textMusic);

		this.buttonSound.setScale(0.5);
		this.tweens.add({targets: this.buttonSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
		this.textSound.setScale(0.5);
		this.tweens.add({targets: this.textSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
		this.buttonMusic.setScale(0.5);
		this.tweens.add({targets: this.buttonMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
		this.textMusic.setScale(0.5);
		this.tweens.add({targets: this.textMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
		this.buttonCredits.setScale(0.5);
		this.tweens.add({targets: this.buttonCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });
		this.textCredits.setScale(0.5);
		this.tweens.add({targets: this.textCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });

		if(this.sys.game.device.os.desktop) {
			this.helpText = this.add.text(EPT.world.centerX, EPT.world.height-250, EPT.text['keyboard-info'], fontSmall).setVisible(false).setAlpha(0);
			this.helpText.setOrigin(0.5,1);
			this.helpText.setScale(0.5);
			this.tweens.add({targets: this.helpText, scaleX: 1, scaleY: 1, duration: 500, delay: 750, ease: 'Cubic.easeOut' });
		}

		var offsetTopCredits = 20;
		var offsetTopCrew = 200;
		this.containerCredits = this.add.container(0, EPT.world.height);
		var creditsBg = this.add.sprite(0, 0, 'background').setDisplaySize(EPT.world.width, EPT.world.height);
		creditsBg.setOrigin(0, 0);
		var creditsBack = new Button(20, 20, 'button-back', function(){this.clickBack('credits');}, this);
		creditsBack.setOrigin(0, 0);

		var titleCredits = this.add.text(EPT.world.centerX, offsetTopCredits+40, EPT.text['credits'], fontTitle);
		titleCredits.setOrigin(0.5);
		var titleCreditsText = this.add.text(EPT.world.centerX, offsetTopCredits+170, EPT.text['madeby'], fontSubtitle);
		titleCreditsText.setOrigin(0.5,0.5);

		var titleCreditsArt = this.add.text(EPT.world.centerX, offsetTopCredits+270, 'Art by Free Christian Illustrations' , fontSubtitle);
		titleCreditsArt.setOrigin(0.5,0.5).setInteractive({useHandCursor:true}).on('pointerdown', function() { this.clickArtArtist(); }, this);

		var titleCreditsLogo = new Button(EPT.world.centerX, offsetTopCredits+270, 'logo-enclave', this.clickSpiritFilled, this, 'noframes');
		titleCreditsLogo.setOrigin(0.5,0).setVisible(false).setAlpha(0);
		var titleCreditsUrl = this.add.text(EPT.world.centerX, offsetTopCredits+370, 'Based on\n"Enclave Phaser Template"', fontSubtitle).setAlign('center');
		titleCreditsUrl.setOrigin(0.5,0);
		titleCreditsUrl.setInteractive({ useHandCursor: true });
		titleCreditsUrl.on('pointerdown', function() { this.clickEnclave(); }, this);

		var titleCrew = this.add.text(EPT.world.centerX, offsetTopCrew-40, EPT.text['team'], fontSubtitle);
		titleCrew.setOrigin(0.5,0).setAlpha(0).setVisible(false);
		var titleCrewAndrzej = this.add.text(EPT.world.centerX, offsetTopCrew+20, 'Tom Jolin - '+EPT.text['coding'], fontSubtitle);		
		titleCrewAndrzej.setOrigin(0.5,0);


		var titleEffect1 = this.add.text(EPT.world.centerX, offsetTopCrew+450, 'Pillar Effect by Pipoya', fontSubtitle);
		titleEffect1.setOrigin(0.5,0).setInteractive({useHandCursor:true}).on('pointerdown',function(){this.clickEffArtist; }, this); 
	
		var titleCreditsMusic = this.add.text(EPT.world.centerX, offsetTopCrew+400, EPT.text['musicby']+' Alexandr Zhelanov' , fontSubtitle);
		titleCreditsMusic.setOrigin(0.5,0).setInteractive({useHandCursor:true}).on('pointerdown', function() { this.clickMusicArtist(); }, this);
		

		var titleSoundEffects1 = this.add.text(EPT.world.centerX, offsetTopCrew+350, 'Wrong Sfx: www.littlerobotsoundfactory.com' , fontSubtitle).setFontSize(28);
		titleSoundEffects1.setOrigin(0.5,0).setInteractive({useHandCursor:true}).on('pointerdown', function() { this.clickSound1Artist(); }, this);
	

		var titleSoundEffects = this.add.text(EPT.world.centerX, offsetTopCrew+300, 'Correct Sfx: Kenney' , fontSubtitle);
		titleSoundEffects.setOrigin(0.5,0).setInteractive({useHandCursor:true}).on('pointerdown', function() { this.clickSoundArtist(); }, this);
		
		
		var titleCraftPix = this.add.text(EPT.world.centerX, offsetTopCrew + 500, 'Additional Assets by CraftPix', fontSubtitle);
		titleCraftPix.setOrigin(0.5, 0).setInteractive({useHandCursor: true }).on('pointerdown',function() {this.clickCraftPix();},this);
		
		
		this.containerCredits.add([creditsBg,creditsBack,titleCredits,titleCreditsText,titleCreditsLogo,titleCreditsUrl]);
	    this.containerCredits.add([titleCrew,titleCrewAndrzej, titleCreditsMusic, titleCreditsArt, titleSoundEffects, titleSoundEffects1, titleEffect1, titleCraftPix]); //,titleCreditsMusic]);

		this.containerKeyboard = this.add.container();
		this.containerKeyboard.y = EPT.world.height;
		
		var offsetTopKeyboard = 20;
		var keyboardBg = this.add.sprite(0, 0, 'background').setDisplaySize(EPT.world.width, EPT.world.height);
		keyboardBg.setOrigin(0,0);
		var titleKeyboard = this.add.text(EPT.world.centerX, offsetTopKeyboard+40, EPT.text['key-title'], fontTitle);
		titleKeyboard.setOrigin(0.5).setVisible(false);
		var titleKeySettingsTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+90, EPT.text['key-settings-title'], fontSubtitle);
		titleKeySettingsTitle.setOrigin(0.5,0);
		var titleKeySettings = this.add.text(EPT.world.centerX, offsetTopKeyboard+140, EPT.text['key-settings-onoff'], fontSmall);
		titleKeySettings.setOrigin(0.5,0);
		var titleKeyAudio = this.add.text(EPT.world.centerX, offsetTopKeyboard+180, EPT.text['key-audio'], fontSmall);
		titleKeyAudio.setOrigin(0.5,0);
		var titleKeyMusic = this.add.text(EPT.world.centerX, offsetTopKeyboard+220, EPT.text['key-music'], fontSmall);
		titleKeyMusic.setOrigin(0.5,0);
		var titleKeyCredits = this.add.text(EPT.world.centerX, offsetTopKeyboard+260, EPT.text['key-credits'], fontSmall);
		titleKeyCredits.setOrigin(0.5,0);
		var titleKeyKeyboard = this.add.text(EPT.world.centerX, offsetTopKeyboard+300, EPT.text['key-shortcuts'], fontSmall);
		titleKeyKeyboard.setOrigin(0.5,0);

		var titleKeyMenuTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+350, EPT.text['key-menu'], fontSubtitle);
		titleKeyMenuTitle.setOrigin(0.5,0);
		var titleKeySettings2 = this.add.text(EPT.world.centerX, offsetTopKeyboard+400, EPT.text['key-settings-onoff'], fontSmall);
		titleKeySettings2.setOrigin(0.5,0);
		var titleKeyStart = this.add.text(EPT.world.centerX, offsetTopKeyboard+440, EPT.text['key-start'], fontSmall);
		titleKeyStart.setOrigin(0.5,0);

		var titleKeyGameTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+490, EPT.text['key-gameplay'], fontSubtitle);
		titleKeyGameTitle.setOrigin(0.5,0);
		var titleKeyButton = this.add.text(EPT.world.centerX, offsetTopKeyboard+540, EPT.text['key-button'], fontSmall);
		titleKeyButton.setOrigin(0.5,0);
		var titleKeyPause = this.add.text(EPT.world.centerX, offsetTopKeyboard+580, EPT.text['key-pause'], fontSmall);
		titleKeyPause.setOrigin(0.5,0);

		var titleKeyPauseTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+630, EPT.text['key-pause-title'], fontSubtitle);
		titleKeyPauseTitle.setOrigin(0.5,0);
		var titleKeyBack = this.add.text(EPT.world.centerX, offsetTopKeyboard+680, EPT.text['key-back'], fontSmall);
		titleKeyBack.setOrigin(0.5,0);
		var titleKeyRestart = this.add.text(EPT.world.centerX, offsetTopKeyboard+720, EPT.text['key-return'], fontSmall);
		titleKeyRestart.setOrigin(0.5,0);

		var titleKeyOverTitle = this.add.text(EPT.world.centerX, offsetTopKeyboard+770, EPT.text['key-gameover'], fontSubtitle);
		titleKeyOverTitle.setOrigin(0.5,0);
		var titleKeyBack2 = this.add.text(EPT.world.centerX, offsetTopKeyboard+820, EPT.text['key-back'], fontSmall);
		titleKeyBack2.setOrigin(0.5,0);
		var titleKeyRestart2 = this.add.text(EPT.world.centerX, offsetTopKeyboard+860, EPT.text['key-try'], fontSmall);
		titleKeyRestart2.setOrigin(0.5,0);

		this.containerKeyboard.add([keyboardBg,titleKeyboard,titleKeySettingsTitle,titleKeySettings]);
		this.containerKeyboard.add([titleKeyAudio,titleKeyMusic,titleKeyCredits,titleKeyKeyboard]);
		this.containerKeyboard.add([titleKeyMenuTitle,titleKeySettings2,titleKeyStart,titleKeyGameTitle]);
		this.containerKeyboard.add([titleKeyButton,titleKeyPause,titleKeyPauseTitle,titleKeyBack]);
		this.containerKeyboard.add([titleKeyRestart,titleKeyOverTitle,titleKeyBack2,titleKeyRestart2]);

	
		this.input.keyboard.on('keydown', this.handleKey, this);
        this.cameras.main.fadeIn(250);
	}
    handleKey(e) {
        switch(e.code) {
			case 'KeyA': {
				this.clickSound();
				break;
			}
			case 'KeyM': {
				this.clickMusic();
				break;
			}
			case 'KeyC': {
				if(this.screenName == 'settings') {
					this.clickCredits();
				}
				else { // this.screenName == 'credits'
					this.clickBack('credits');
				}
				break;
			}
            case 'KeyS': {
                this.clickBack();
				break;
			}
           
			default: {}
        }
    }
	clickSound() {
		EPT.Sfx.play('click');
		EPT.Sfx.manage('sound', 'switch', this, this.buttonSound, this.textSound);
	}
	clickMusic() {
		EPT.Sfx.play('click');
		EPT.Sfx.manage('music', 'switch', this, this.buttonMusic, this.textMusic, 'music-theme');
	}



	clickCredits() {
		EPT.Sfx.play('click');
		this.tweens.add({targets: this.containerCredits, y: 0, duration: 750, ease: 'Cubic.easeOut' });

		this.buttonBack.input.enabled = false;
		this.buttonSound.input.enabled = false;
		this.buttonMusic.input.enabled = false;
		this.buttonCredits.input.enabled = false;
	
		this.screenName = 'credits';
	}
  
	clickKeyboard() {
		EPT.Sfx.play('click');
		this.tweens.add({targets: this.containerKeyboard, y: 0, duration: 750, ease: 'Cubic.easeOut' });

		this.buttonBack.input.enabled = false;
		this.buttonSound.input.enabled = false;
		this.buttonMusic.input.enabled = false;
		this.buttonCredits.input.enabled = false;
		
		this.screenName = 'keyboard';
	}

	clickNewGame() {
		EPT.Sfx.play('click');

		EPT.Storage.set('EPT-player','');
		EPT.Storage.set('EPT-difficulty','');
		EPT.Storage.set('EPT-level',1);
		EPT.LastScreen = 'MainMenu';
		EPT.fadeOutScene('MainMenu', this);

	}

	clickBack(name) {
		EPT.Sfx.play('click');
		if(name) {
			this.buttonBack.input.enabled = true;
			this.buttonSound.input.enabled = true;
			this.buttonMusic.input.enabled = true;
			this.buttonCredits.input.enabled = true; /*
			if(this.bannerBeer && this.bannerBeer.input) {
				this.bannerBeer.input.enabled = true;
			}*/
			if(name == 'credits') {
				this.tweens.add({targets: this.containerCredits, y: EPT.world.height, duration: 750, ease: 'Cubic.easeIn' });
			}
			else if(name == 'keyboard') {
				this.tweens.add({targets: this.containerKeyboard, y: EPT.world.height, duration: 750, ease: 'Cubic.easeIn' });
			}
			this.screenName = 'settings';
		}
		else {
		
			EPT.fadeOutScene(EPT.LastScreen, this);
		}
	}
	clickEffArtist() {
		EPT.Sfx.play('click');
		window.top.location.href = 'https://pipoya.itch.io/pipoya-free-vfx-light-pillar';
	}
	clickEnclave() {
		EPT.Sfx.play('click');
		window.top.location.href = 'https://github.com/EnclaveGames/Enclave-Phaser-Template';
	}
	clickSpiritFilled() {
		EPT.Sfx.play('click');
		window.top.location.href = 'https://www.scripturesoft.com/';
	}
	clickMusicArtist(){
		EPT.Sfx.play('click');
		window.top.location.href= 'https://soundcloud.com/alexandr-zhelanov';
	}
	clickArtworkArtist(){
		EPT.Sfx.play('click');
		window.top.location.href= 'https://www.freechristianillustrations.com/';
	}
	clickSoundArtist(){
		EPT.Sfx.play('click');
		window.top.location.href= 'https://www.kenney.nl';
	}
	clickSound1Artist(){
		EPT.Sfx.play('click');
		window.top.location.href= 'http://www.littlerobotsoundfactory.com';
	}
	clickCraftPix(){
		EPT.Sfx.play('click');
		window.top.location.href= 'https://craftpix.net/'
	}
	

};