import { EPT, Button } from './utils'
export default class Story extends Phaser.Scene {
	constructor() {
		super('Story');
	}
	create() {
		this.add.sprite(0, 0, 'intro_bg').setOrigin(0, 0).setDisplaySize(EPT.world.width, EPT.world.height);
		this.shine = this.add.sprite(0, 0, 'shine').setOrigin(0, 0).setDisplayOrigin(EPT.world.width, EPT.world.height);



		this.introgroup = this.add.group()

		//var fontStory = { font: '52px ' + EPT.text['FONT'], fill: '#3E2016',stroke:'#fff', strokeThickness: 10 };

		var fontStory = { font: '42px ' + EPT.text['FONT'], fill: '#F9FBA7', stroke: '#000', strokeThickness: 7, align: 'center' };
		var fontStory2 = { font: '38px ' + EPT.text['FONT'], fill: '#004CA6', stroke: '#000', strokeThickness: 1, align: 'center' };
		var fontStory3 = { font: '38px ' + EPT.text['FONT'], fill: '#1A6AB1', stroke: '#000', strokeThickness: 1, align: 'center' };
		var fontStory4 = { font: '38px ' + EPT.text['FONT'], fill: '#3583C5', stroke: '#000', strokeThickness: 1, align: 'center' };

		///var player = EPT.Storage.get('EPT-player');

		/*
		var leadText = `Help ${player} pass her bible quiz so she can become an Arch Angel!`;
		if (!EPT.Storage.get('EPT-returning')) {
			leadText = 'Welcome Back! ' + leadText;
		}*/

		var self = this;
		/*
			   var lead = this.add.text(EPT.world.centerX, 200, leadText,fontStory).setOrigin(0.5).setWordWrapWidth(500).setAlign('center');
			   this.tweens.add({
				   targets: lead,
				   duration: 1000,
				   scale: { start:1, from:1, to:1.2, ease: 'Quad.easeOut' },
				   yoyo: true,
				   repeat: 0,
				   onComplete() {
	   */

		//self.textStory = self.add.text(EPT.world.centerX, EPT.world.centerY - 100, EPT.text['screen-story-howto'], fontStory);
		//self.textStory.setOrigin(0.5,0).setWordWrapWidth('620').setAlign(0);

		//self.tweens.add({
		//	targets: self.textStory,
		//	duration: 1000,
		//	alpha: { start:0, from:0, to:1, ease: 'Linear' },
		//	repeat: 0,

		//	});
		//			}
		//});







		this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.keyEnter.on('down', function (key, event) { this.clickContinue(); }, this);

		this.cameras.main.fadeIn(250, 0, 0, 0);
		// Animation set
		/*	  this.anims.create({
			  key: 'column',
			  frames: this.anims.generateFrameNumbers('column-effect', { frames: [ 0, 1, 2, 3, 4,5,6,7,8,9] }),
			  frameRate: 16,
			  repeat: -1
		  });*/


		/*const cody = this.add.sprite(EPT.world.centerX,EPT.world.centerY + 100);
		cody.setScale(4);
		cody.play('column');
		this.girl = this.add.image(EPT.world.centerX, EPT.world.centerY +100,'girl').setOrigin(0.5);
		
		var buttonContinue = new Button(EPT.world.width-20, EPT.world.height-20, 'button-continue', this.clickContinue, this);
		buttonContinue.setOrigin(1,1);

		buttonContinue.x = EPT.world.width+buttonContinue.width+20;
		this.tweens.add({targets: buttonContinue, x: EPT.world.width-20, duration: 500, ease: 'Back'});

		*/

		var self = this



		this.angel = this.add.image(EPT.world.centerX, EPT.world.centerY - 50, 'angel_harp').setScale(0.7)
		this.logos = this.add.image(EPT.world.centerX, EPT.world.centerY, 'logos');

		

		this.logos.y += this.logos.height - 75
		if (desktop){
			this.logos.setScale(0.7);
			this.logos.y-= 50;
		}

		this.textCreatedBy = this.add.text(EPT.world.centerX, EPT.world.centerY + 100, EPT.text['story-created-by'], fontStory).setOrigin(0.5)
		
		
		this.textStory = this.add.text(EPT.world.centerX, 30, EPT.text['story'], fontStory).setOrigin(0.5, 0).setWordWrapWidth(500)

		if (desktop){
			this.textStory.setWordWrapWidth(800);
			this.textCreatedBy.y -= 25;
		}
		this.introgroup.add(this.angel);
		this.introgroup.add(this.logos);
		this.introgroup.add(this.textCreatedBy);
		this.introgroup.add(this.textStory)



		this.time.delayedCall(2000, () => {


			this.tweens.add({
				targets: this.introgroup.getChildren().map(function (c) { return c }),
				alpha: 0,
				duration: 2000,
				onComplete: function () {

					self.tweens.add({
						targets: self.shine,
						alpha: 1,
						duration: 1000,
						onComplete: function () {
							self.tweens.add({
								targets: self.shine,
								alpha: 0.9,
								repeat: -1,
								yoyo: true,
								duration: 1000,
							})



							var girl_intro1 = self.add.image(EPT.world.centerX, EPT.world.centerY + 200, 'girl_intro').setOrigin(0.5).setAlpha(0);
							self.girl_intro1 = girl_intro1

							if (desktop) {
								self.girl_intro1.y -= 25;
						
							}

							var origin = self.girl_intro1.getTopLeft();




							var textures = self.textures;
							var girlSource = {
								getRandomPoint: function (vec) {
									do {
										var x = Phaser.Math.Between(0, self.girl_intro1.width - 1);
										var y = Phaser.Math.Between(0, self.girl_intro1.height - 1);
										var pixel = textures.getPixel(x, y, 'girl_intro');
										
									} while (pixel.alpha < 255);

									return vec.setTo(x + origin.x, y + origin.y);
								}
							};

							var particles = self.add.particles('flares');

							self.emitter = particles.createEmitter({
								x: 0,
								y: 0,
								lifespan: 1000,
								gravityY: 10,
								scale: { start: 0, end: 0.25, ease: 'Quad.easeOut' },
								alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
								blendMode: 'ADD',
								emitZone: { type: 'random', source: girlSource }
							});
							self.textIntro1 = self.add.text(EPT.world.centerX, 30, EPT.text['story_intro1'], fontStory).setAlpha(0).setOrigin(0.5, 0);
							if (desktop){
								self.textIntro1.y -= 30;
							}
							self.tweens.add({
								targets: [self.girl_intro1, self.textIntro1],
								alpha: 1,
								duration: 1000,
								onComplete: function () {

									self.time.delayedCall(2000, () => {




										self.storyIntro2 = self.add.text(EPT.world.centerX, self.textIntro1.y + 80, EPT.text['story_intro2'], fontStory2).setOrigin(0.5, 0).setAlpha(0);
										if (desktop) {
											self.storyIntro2.y -= 30;
										}
										
										self.armour_wings = self.add.image(EPT.world.centerX, EPT.world.centerY + 200, 'armour_wings').setOrigin(0.5).setAlpha(0);
										self.armour_intro2 = self.add.image(EPT.world.centerX, EPT.world.centerY + 200, 'armour_intro1').setOrigin(0.5).setAlpha(0);
										if (desktop) {
											self.armour_wings.y -= 25;
											self.armour_intro2.y -= 25;
										
										}
										var particles = self.add.particles('flares');

										var origin = self.armour_intro2.getTopLeft();


										var textures = self.textures;
										var armourSource = {
											getRandomPoint: function (vec) {
												do {
													var x = Phaser.Math.Between(0, self.armour_intro2.width - 1);
													var y = Phaser.Math.Between(0, self.armour_intro2.height - 1);
													var pixel = textures.getPixel(x, y, 'armour_intro1');
												} while (pixel.alpha < 255);

												return vec.setTo(x + origin.x, y + origin.y);
											}
										};


										self.emitter = particles.createEmitter({
											x: 0,
											y: 0,
											lifespan: 1000,
											gravityY: 10,
											scale: { start: 0, end: 0.25, ease: 'Quad.easeOut' },
											alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
											blendMode: 'ADD',
											emitZone: { type: 'random', source: armourSource }
										});

										self.tweens.add({
											targets: self.girl_intro1,
											alpha: 0,
											duration: 1000,
											onComplete: function () {

												self.tweens.add({
													targets: [self.storyIntro2, self.armour_intro2],
													alpha: 1,
													duration: 1000,
													onComplete: function () {
														self.time.delayedCall(1000, () => {
															self.textIntro3 = self.add.text(EPT.world.centerX, self.storyIntro2.y + 125, EPT.text['story_intro3'], fontStory3).setOrigin(0.5, 0).setAlpha(0)
															if (desktop) 
															{
																
															}
															self.tweens.add({
																targets: self.textIntro3,
																alpha: 1,
																duration: 1000,
																onComplete: function () {

																	self.time.delayedCall(1000, () => {
																		/*self.tweens.add({
																			targets: self.armour_wings,
																			alpha:1, 
																			duration: 3000,

																		})*/
																		self.textIntro4 = self.add.text(EPT.world.centerX, self.textIntro3.y + 120, EPT.text['story_intro4'], fontStory4).setOrigin(0.5, 0).setAlpha(0)
																		if (desktop){
																			self.textIntro4.y -= 30;
																		}
																		self.tweens.add({
																			targets: self.textIntro4,
																			alpha: 1,
																			duration: 2000,
																			onComplete: function () {

																		
																				self.time.delayedCall(4000, () => {
																					
																					var origin2 = self.armour_wings.getTopLeft();


														
																					var wingsSource = {
																						getRandomPoint: function (vec) {
																							do {
																								var x = Phaser.Math.Between(0, self.armour_wings.width - 1);
																								var y = Phaser.Math.Between(0, self.armour_wings.height - 1);
																								var pixel = textures.getPixel(x, y, 'armour_wings');
																							} while (pixel.alpha < 255);
	
																							return vec.setTo(x + origin.x, y + origin.y);
																						}
																					};
	
	
																					self.emitter = particles.createEmitter({
																						x: 0,
																						y: 0,
																						lifespan: 1000,
																						gravityY: 10,
																						scale: { start: 0, end: 0.25, ease: 'Quad.easeOut' },
																						alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
																						blendMode: 'ADD',
																						emitZone: { type: 'random', source: wingsSource }
																					});
																					self.tweens.add({
																						targets: [self.textIntro1, self.storyIntro2, self.textIntro3, self.textIntro4],
																						alpha: 0,
																						duration: 1000,
																						onComplete: function () {

																							self.textIntro5 = self.add.text(EPT.world.centerX, EPT.world.centerY - 300, EPT.text['story_intro5'], fontStory2).setAlpha(0).setOrigin(0.5, 0);

																							self.tweens.add({
																								targets: [self.armour_wings, self.textIntro5],
																								alpha: 1,
																								duration: 1000,
																								onComplete: function () {

																									self.time.delayedCall(5000, () => {
																										EPT.fadeOutScene('Character', self);
																									})
																								}

																							});
																						}
																					});
																				});


																			}
																		})
																	});

																}
															})
														});

													}
												});
											}
										})



									});


								}


							});

						}

					});
				}
			});


		});

	}
	clickContinue() {
		EPT.Sfx.play('click');
		EPT.fadeOutScene('Difficulty', this);
	}

	typeWriterText(text) {
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