import {EPT, Button} from './utils'
export default class Difficulty extends Phaser.Scene {


    constructor() {
        super('Difficulty');
    }

	init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()

		this.difficulty_buttons= [];
	}

	
    create() {;
		this.add.sprite(0, 0, 'background').setOrigin(0,0).setDisplaySize(EPT.world.width,EPT.world.height)

		var menuup = this.add.image(0, 0, 'menu_up').setOrigin(0, 0);
		menuup.displayWidth = EPT.world.width;
		
        var menudown = this.add.image(0, EPT.world.height, 'menu_down').setOrigin(0, 0);
		menudown.y -= menudown.height;
		menudown.displayWidth = EPT.world.width;


		this.buttonPause = new Button(EPT.world.width, 30, 'button-settings', this.clickSettings, this);
		this.buttonPause.x -= 50;
		this.buttonPause.setOrigin(0.5).setScale(0.6).setVisible(true).setDepth(1001);

		if (desktop){
			this.buttonPause.x -= 60;
		}

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

		var fontButton = { font: '42px ' + EPT.text['FONT'], fill: '#fff',stroke:'#000', strokeThickness: 5 };
	
		//var fontStory = { font: '48px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
		
		var fontStory = { font: '32px ' + EPT.text['FONT'], fill: '#fff', stroke: '#000', strokeThickness: 5, align: 'center' };


		this.add.text(EPT.world.centerX, 5, 'Quiz Angel',fontStory).setOrigin(0.5,0);
        
		this.add.image(EPT.world.centerX -150, EPT.world.centerY -100,'armour_wings').setOrigin(0.5).setScale(1);
		this.add.image(EPT.world.centerX -150, EPT.world.centerY -100,'armour_wings').setOrigin(0,0.5).setScale(1);
	
		this.add.image(EPT.world.centerX, EPT.world.centerY,'difficulty-table').setOrigin(0.5).setScale(0.85);
		this.add.image(EPT.world.centerX, EPT.world.centerY,'difficulty-window').setOrigin(0.5).setScale(0.8,0.9);
		//this.add.image(EPT.world.centerX, EPT.world.centerY,'difficulty-table').setOrigin(0.5);
		this.add.image(EPT.world.centerX, EPT.world.centerY -272, 'difficulty-header').setOrigin(0.5).setScale(0.8);
		// Play button
	const basicButton = this.add.image(EPT.world.centerX, EPT.world.centerY -140, 'difficulty-button')
		

		basicButton.setScale(0.8,0.65);
	const basicText = this.add.text(basicButton.x, basicButton.y -5, 'Basic', fontButton)
		.setOrigin(0.5)
	basicButton.setInteractive().on('pointerover',()=> {
		basicButton.setTexture('difficulty-button-selected');
	}).on('pointerout', () => {
		basicButton.setTexture('difficulty-button');
	}).on('pointerup',()=> {
		this.selectedButton = basicButton;
		this.selectedText = basicText;
		this.selectDifficulty();

	})

	const mediumButton = this.add.image(basicButton.x, basicButton.y + basicButton.displayHeight + 2, 'difficulty-button')
	const mediumText = this.add.text(mediumButton.x, mediumButton.y -5, 'Medium', fontButton)
		.setOrigin(0.5);
	mediumButton.setScale(0.8,0.65);
	mediumButton.setInteractive().on('pointerover',()=> {
		mediumButton.setTexture('difficulty-button-selected');
	}).on('pointerout', () => {
		mediumButton.setTexture('difficulty-button');
	}).on('pointerup',()=> {
		this.selectedButton = mediumButton;
		this.selectedText = mediumText;
		this.selectDifficulty();

	})

	

	

	// Settings button
	const advancedButton = this.add.image(mediumButton.x, mediumButton.y + mediumButton.displayHeight + 2, 'difficulty-button')
	const advancedText = this.add.text(advancedButton.x, advancedButton.y -5, 'Advanced', fontButton)
		.setOrigin(0.5);
	advancedButton.setScale(0.8,0.65);
	advancedButton.setInteractive().on('pointerover',()=> {
		advancedButton.setTexture('difficulty-button-selected');
	}).on('pointerout', () => {
		advancedButton.setTexture('difficulty-button');
	}).on('pointerup',()=> {
		this.selectedButton = advancedButton;
		this.selectedText = advancedText;
		this.selectDifficulty();

	})

	

	// Credits button
	const masterButton = this.add.image(advancedButton.x, advancedButton.y + advancedButton.displayHeight + 2, 'difficulty-button')
	const masterText  = this.add.text(masterButton.x, masterButton.y -5, 'Master', fontButton)
	.setOrigin(0.5)

	masterButton.setScale(0.8,0.65);

	masterButton.setInteractive().on('pointerover',()=> {
		masterButton.setTexture('difficulty-button-selected');
	}).on('pointerout', () => {
		masterButton.setTexture('difficulty-button');
	
	}).on('pointerup',()=> {
		this.selectedButton = masterButton;
		this.selectedText = masterText;
		this.selectDifficulty();
	})

	this.difficulty_buttons.push(basicButton);
	this.difficulty_buttons.push(advancedButton);
	

	this.difficulty_buttons.push(masterButton);
	this.difficulty_buttons.push(basicText);
	this.difficulty_buttons.push(advancedText);
	this.difficulty_buttons.push(masterText);



	
		



	
		//this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		//this.keyEnter.on('down', function(key, event) { this.clickContinue(); }, this);

		
		
	
		
	
		
	}
	clickContinue() {
		EPT.Sfx.play('click');
		EPT.fadeOutScene('Rank', this);
	}

	selectDifficulty() {
	


		EPT.Storage.set('EPT-difficulty',this.selectedText.text);
		this.clickContinue();
		
	
			
	
	}

	update()
	{
		const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
		const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
		
		if (upJustPressed)
		{
			this.selectNextButton(-1)
		}
		else if (downJustPressed)
		{
			this.selectNextButton(1)
		}
		else if (spaceJustPressed)
		{
			this.confirmSelection()
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
	clickSettings() {
		EPT.LastScreen = 'Difficulty';
	EPT.fadeOutScene('Settings', this);
	}
	
};