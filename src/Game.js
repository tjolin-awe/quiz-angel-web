import { EPT, Button } from './utils'
export default class Game extends Phaser.Scene {
	constructor() {
		super('Game');
	}

	preload() {


	}

	shuffle(array) {
		var currentIndex = array.length, randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}

		return array;
	}


	selectSprite(sprite) {

		
		var self = this;
		if (this.itemClicked)
			return;
		else
			this.itemClicked = true;

		if (this.scrollemitter)
			this.scrollemitter.explode();

		this.scrollTextTitle.setVisible(false);
		this.scrollText.setVisible(false);
		this.scroll.play('close');
		this.scroll.once('animationcomplete', function () { ///this refers to an arcade sprite.


			self.tweens.add({
				targets: self.scroll,
				alpha: 0,
				duration: 500,
			})

		});
		var correct = this.level.quiz[this.currentQuestion].correct_picture === sprite.texture.key;

		
		this.selectedCharacter = sprite;
		this.selectedFrame = this.persons[sprite.index].frame;
		sprite.setDepth(999);
		this.buttonRestart.setDepth(999);
		this.zoomName.setDepth(999);
		EPT.Sfx.play('click');
		var self = this;

		var index = sprite.index;

		var label = this.persons[index].label;
		var frame = this.persons[index].frame;

		var othersprites = [];

		this.persons.forEach((person) => {

			person.sprite.input = false;
			if (person.sprite.index != index) {

				person.label.setVisible(false);
				othersprites.push(person.sprite);
				othersprites.push(person.label);
				othersprites.push(person.frame);
			}
		});


		var runOnce = false;
		var runOnce2 = false;
		this.tweens.add({
			targets: [frame, label, sprite],
			y: '-=10',
			duration: 300,
			yoyo: true,
			oncomplete: function () {



				if (!runOnce) {

					/*self.tweens.add({
						targets: [self.levelText, self.buttonPause],
						alpha: { start: 1, from: 1, to: 0 },
						duration: 500,

					})*/

					/*
												othersprites.forEach((element)=>{
													if (element.index == 0 || element.index == 1){
														self.tweens.add({
															targets: element,
															y: -100,
															duration:1000,
					
														})
													} else {
														if (element.index == 2){
															self.tweens.add({
																targets: element,
																x: -100,
																duration:1000,
						
															})
														} 
														else 
														{
															self.tweens.add({
																targets: element,
																x: EPT.world.width + 100,
																duration:1000,
						
															})
														}
													}
												});
					*/

					self.persons.forEach((person) => {

								
						if (person.sprite.index != index) {
			
							const poofEffect = self.add.sprite(person.sprite.getCenter().x,
								person.sprite.getCenter().y,'poof-effect');
										
								poofEffect.setScale(0.3);
								poofEffect.play('poof').once('animationcomplete',()=> {
									poofEffect.destroy();
								});
							

						}
					});
					self.tweens.add({
						targets: othersprites,
						scale: 0,
						ease: 'power2',
						duration: 600,
						//delay: self.tweens.stagger(100, { grid: [4, 4], from: 'center' }),
						onComplete: function () {


							
							

							if (!runOnce2) {



								if (correct) {


								
									var particles = self.add.particles('star_1');
									var emit_progress = particles.createEmitter({
										x: self.pbMask.x + self.pb.width + 10,
										y: self.pbMask.y,
										speed: { min: -200, max: 200 },
										gravityY: 10,
										scale: { start: 0.1, end: 0.4 },
										lifespan: 2000,
										blendMode: 'NORMAL',
										frequency: 300,
									});

									self.tweens.add({
										targets: self.pbMask,
										x: self.pbMask.x + self.progress_increment,
										ease: Phaser.Math.Easing.Sine.Out,
										duration: 1000,
										onComplete: function () {

											emit_progress.explode();




										}

									})

								}
								label.setVisible(false);
								self.zoomName.setText(label.text);
								//self.zoomName.setY(EPT.world.height + self.zoomName.height + 30);


								var i = 0;





								self.tweens.add({
									targets: [frame],
									//x: EPT.world.centerX,
									//y: EPT.world.height - 140,
									duration: 200,
									//scale: 1.1,
									//ease: 'Back',
									scale: 0,
								});


								self.tweens.add({
									targets: [sprite],
									x: window.desktop ? 350 : EPT.world.centerX,
									y: window.desktop ? EPT.world.centerY - 60 : EPT.world.height - 270,
									duration: 300,
									scale: 1.5,

									onComplete: function () {

										if (window.desktop) {
											self.zoomName.setPosition(sprite.getCenter().x, sprite.getCenter().y + sprite.displayHeight / 2 + 50);

											self.nametag.setPosition(self.zoomName.x, self.zoomName.y + 5);

										}
										self.tweens.add({
											targets: [self.zoomName, self.nametag],
											alpha: 1,
											ease: 'back',
											duration: 300, 
											oncomplete:function() {

											}
											//	y: EPT.world.height - 30,

										})


										if (correct) {
											var efftex = self.level.quiz[self.currentQuestion].effect_texture;
											if (efftex == null) {
												var particles = self.add.particles('star');
												self.emitter = particles.createEmitter({
													x: sprite.getCenter().x,
													y: sprite.getCenter().y,

													speed: { min: -100, max: 300 },
													gravityY: 100,
													scale: { start: 0.6, end: 0.1 },
													lifespan: 2000,
													blendMode: 'NORMAL',
													frequency: 100,
												});
											}
											else {


												var particles = self.add.particles(efftex);
												var effmethod = self.level.quiz[self.currentQuestion].effect_method
												if (effmethod == 'pourout') {

													particles.setDepth(1000);
													self.emitter = particles.createEmitter({
														x: sprite.getCenter().x,
														y: sprite.getCenter().y,
														frequency: 150,

														speed: { min: 100, max: 500 },
														gravityY: 400,
														scale: { start: 0, end: 1 },
														lifespan: 800,
														blendMode: 'NORMAL'
													});
												} else if (effmethod == 'floataway') {

													particles.setDepth(1000);
													self.emitter = particles.createEmitter({
														x: sprite.getCenter().x,
														y: sprite.getCenter().y,

														frequency: 800,

														speed: { min: 100, max: 200 },
														gravityY: -300,
														scale: { start: 0, end: 2 },
														lifespan: 2000,
														blendMode: 'NORMAL'
													});
												}
												else if (effmethod == 'circle') {
													var shape1 = new Phaser.Geom.Circle(0, 0, 250);



													self.emitter = particles.createEmitter({

														x: sprite.getCenter().x,
														y: sprite.getCenter().y,


														scale: { start: 0.3, end: 0 },
														blendMode: 'NORMAL',
														lifespan: 3000,

														emitZone: { type: 'edge', source: shape1, quantity: 48 }
													});
												}
												else if (effmethod == 'slowemit') {
													self.emitter = particles.createEmitter({
														x: sprite.getCenter().x,
														y: sprite.getCenter().y,


														speed: { min: -100, max: 300 },
														gravityY: 100,
														scale: { start: 0.6, end: 0.1 },
														lifespan: 2000,
														blendMode: 'NORMAL',
														frequency: 100,
													});
												}
											}

										}


									}

								});


								if (correct) {
									self.msg.setText('Correct!');
									EPT.Sfx.play('correct');

								

								}
								else {
									EPT.Sfx.play('incorrect');
									self.msg.setText('Oops!');
									sprite.setTint(0xff0000);

								
									
									



									var correctImage = self.persons[self.correctIndex].sprite;
									console.log(correctImage);
									correctImage.alpha = 0;

									correctImage.scale = 0;  //self.level.quiz[self.currentQuestion].characters[self.correctIndex].scale - 0.2 + 1;
									correctImage.setDepth(999);
									correctImage.x = window.desktop ? 350 : EPT.world.centerX,
										correctImage.y = window.desktop ? EPT.world.centerY - 60 : EPT.world.height - 270,

										self.gameOver = true;

								}

								self.msg.y = -self.msg.height - 200;

								self.tweens.add({
									targets: self.woodenframe,
									alpha: 1,

									duration: 500,

								})
								self.tweens.add({
									targets: self.msg,
									y: self.woodenframe.getCenter().y - (self.woodenframe.displayHeight / 2) + 90,
									ease: 'Sine.In',
									duration: 500,
									onComplete: function () {


										if (!correct) {



										

											const poofEffect = self.add.sprite(window.desktop ? 350 : EPT.world.centerX,
											window.desktop ? EPT.world.centerY - 60 : EPT.world.height - 270,'poof-effect');
												
											poofEffect.setScale(1);
											poofEffect.play('poof').setDepth(2000).once('animationcomplete',()=> {

												poofEffect.destroy();
											self.wronganswer = true;
											self.tweens.add({
												targets: sprite,

												scale: 0,
												duration: 1500,


												onComplete: function () {
													self.tweens.add({
														targets: correctImage,
														alpha: 1,
														scale: 1.5,
														duration: 200,
													})
													self.wronganswer = false;
													self.zoomName.setText(self.persons[self.correctIndex].label.text);

													self.infoText.setText(`The correct answer is ${self.zoomName.text}`);

													self.infoText.setVisible(true);
													self.infoText.setColor('red');
													self.infoText.setAlpha(1);
													self.buttonRestart.setVisible(true);
													self.tweens.add({
														targets: self.buttonRestart,
														scale: { start: 0.5, from: 0.5, to: 0.6 },
														yoyo: true,
														duration: 1000,
												        repeat: -1,
													})

												}
											})
											
											
										});

										} else {

											/*self.tweens.add({
												targets: self.msg,
												y: -(self.msg.height + 20),
												duration: 1000,
											});*/


											self.tweens.add({
												targets: self.infoText,
												alpha: { start: 0, from: 0, to: 1 },
												duration: 500,
												oncomplete: function () {




													self.buttonRestart.setVisible(true);
													self.tweens.add({
														targets: self.buttonRestart,
														scale: { start: 0.5, from: 0.5, to: 0.6 },
														yoyo: true,
														duration: 1000,
														repeat: -1,
													})





												}
											});
										}


										othersprites.forEach((sprite) => {
											//sprite.destroy();
										});
									}
								});
								runOnce2 = true;
							}


						}

					});
					runOnce = true;
				}
			}

		});

	}

	loadInitialQuestion() {


		this.persons = [];

		this.frames = [];
		this.frames.push({ x: 180, y: 215, labelx: 180, labely: 325 });
		this.frames.push({ x: 464, y: 215, labelx: 464, labely: 325 });
		this.frames.push({ x: 180, y: 495, labelx: 180, labely: 605 });
		this.frames.push({ x: 464, y: 495, labelx: 464, labely: 605 });

		this.scrollTextTitle.setText(`QUESTION ${this.currentQuestion + 1} of ${this.quiz_length}`);

		this.infoText.setFontSize(this.level.quiz[this.currentQuestion].info_fontsize);
		this.infoText.setText(this.level.quiz[this.currentQuestion].additional_info);
		this.infoText.setAlpha(0);

		let i = 0;


		this.quiz[this.currentQuestion].characters = this.shuffle(this.quiz[this.currentQuestion].characters);

		this.quiz[this.currentQuestion].characters.forEach(character => {


		
			var frame = this.add.sprite(this.frames[i].x, this.frames[i].y, 'frames', `${i.toString()}.png`).setOrigin(0.5).setScale(0.29);
			frame.setAlpha(0);
			this.particles = this.add.particles('flare0');
			var sprite;


			if (this.level.quiz[this.currentQuestion].correct_picture === character.picture)
				this.correctIndex = i;

			var xmod = 2
			if (i == 0 || i == 2)
				xmod = 0

			var ymod = -10
			if (i == 0 || i == 1)
				ymod = -10

			sprite = this.physics.add.sprite(this.frames[i].x + xmod, this.frames[i].y + ymod, character.picture).setScale(0.6).setOrigin(0.5);
			sprite.setAlpha(0);
			sprite.character_name = character.name;
			sprite.body.setAllowGravity(false);
			//else
			//	sprite = this.add.sprite(this.frames[i].x, this.frames[i].y - 15, this.level.character_spritesheet, character.picture).setScale(0.5).setOrigin(0.5);

			var label = this.add.text(this.frames[i].labelx, this.frames[i].labely, character.name, this.fontName).setOrigin(0.5).setAlign('center').setAlpha(0);
			label.setFontSize(character.fontSize);
			sprite.index = i;
			frame.index = i;
			label.index = i;
			//sprite.x += character.xoffset;
			//sprite.y += character.yoffset;
			label.x += character.labelxoffset;
			label.y += character.labelyoffset;

			sprite.setInteractive({ useHandCursor: true });
			label.setInteractive({ useHandCursor: true });
			frame.setInteractive({ useHandCursor: true });

			sprite.once('pointerdown', () => {

				this.selectSprite(sprite);

			});

			frame.once('pointerdown', () => {


				this.selectSprite(this.persons[frame.index].sprite);

			});
			label.once('pointerdown', () => {

				this.selectSprite(this.persons[label.index].sprite);

			});


			this.persons.push({ sprite: sprite, label: label, frame: frame, index: i });
			i++;
		});


		var allsprites = [];
		var alllabels = [];

		this.persons.forEach((person) => {
			alllabels.push(person.label);

			allsprites.push(person.frame);
			allsprites.push(person.sprite);
		});


		var self = this;

	

		//  Stagger tween them all in
		this.tweens.add({
			targets: allsprites,
			alpha: { start: 0, from: 0, to: 1 },
			duration: 600,
			onComplete: function () {

				
				self.tweens.add({
					targets: alllabels,
					alpha: { start: 0, from: 0, to: 1 },
					duration: 600,

					onComplete: function () {
						
					}
				});
			}
		});






		this.scroll.play('open');
		var self = this;
		this.scroll.once('animationcomplete', function () { ///this refers to an arcade sprite.

			self.scrollTextTitle.setVisible(true);
			self.scrollText.setText('');
			self.scrollText.setVisible(true);
			self.scrollemitter = self.particlesscroll.createEmitter({
				x: self.scroll.getCenter().x,
				y: self.scroll.getCenter().y,

				speed: { min: -100, max: 500 },
				gravityY: 200,
				scale: { start: 2, end: 1 },
				lifespan: 800,
				blendMode: 'SCREEN'
			});

			self.typeWriterText(self.quiz[self.currentQuestion].question);


		}, this);


	}

	create() {

		if (this.emitter)
			this.emitter.stop();

		EPT.LastScreen = "Game";

		this.itemClicked = false;

		this.currentQuestion = 0;
		this.gameOver = false;
		this.fontMessage = { font: '120px ' + EPT.text['FONT'], fill: 'purple', stroke: '#fff', strokeThickness: 16 };

		this.fontZoomName = { font: '54px ' + EPT.text['FONT'], fill: '#fff', stroke: '#000', strokeThickness: 6 };

		this.fontInfo = { font: '36px ' + EPT.text['FONT'], fill: 'black', stroke: 'white', strokeThickness: 4 };




		this.currentlevel = EPT.Storage.get('EPT-level');
		this.difficulty = EPT.Storage.get('EPT-difficulty')

		
		console.log(this.difficulty.toLowerCase());
		var data = this.cache.json.get(`${this.difficulty.toLowerCase()}-levels`);
		this.level = data.levels[this.currentlevel - 1];
		this.quiz_length = data.quiz_length;
		console.log(this.quiz_length);
	    this.progress_increment = 200 / this.quiz_length
		this.quiz = this.level.quiz;


		this.gamebg = this.add.image(0, 0, 'quiz-background').setOrigin(0).setDisplaySize(EPT.world.width, EPT.world.height);


		this.woodenframe = this.add.image(EPT.world.centerX, 400, 'pause-bg').setOrigin(0.5, 0.5).setAlpha(0);
		if (window.desktop) {
			this.woodenframe.setPosition(EPT.world.centerX + 300, EPT.world.centerY);
		}

		var menudown = this.add.image(0, EPT.world.height, 'menu_down').setOrigin(0, 0);
		menudown.displayWidth = EPT.world.width;
		menudown.y -= menudown.height;

		this.fontScroll = { font: '32px ' + EPT.text['FONT'], fill: '#3E2016' };

		this.fontScrollTitle = { font: '48px ' + EPT.text['FONT'], fill: '#6A2D1B' };

		this.particlesscroll = this.add.particles('flare0');


		this.scroll = this.add.sprite(EPT.world.centerX, 800).setOrigin(0.5, 0.5);

		if (window.desktop) {
			this.scroll.setPosition(950, EPT.world.centerY);
		}

		this.scrollTextTitle = this.add.text(this.scroll.getCenter().x, this.scroll.getTopCenter().y - 90, `QUESTION 1 OF ${this.quiz_length}`, this.fontScrollTitle).setAlign('center').setVisible(false).setOrigin(0.5, 0.5);
		this.tweens.add({
			targets: this.scrollTextTitle,
			scale: '+=0.1',
			repeat: -1,
			yoyo: true,
		})
		this.scrollText = this.add.text(this.scroll.getCenter().x, this.scrollTextTitle.getBottomCenter().y + 5, '',
			this.fontScroll).setWordWrapWidth(400).setAlign('center').setOrigin(0.5, 0).setVisible(false);



		this.anims.create({
			key: 'open',
			frames: this.anims.generateFrameNames('scroll', {
				prefix: "scroll",
				suffix: ".png",
				start: 1,
				end: 5,
				zeroPad: 0,
				frameRate: 10,
			}),

		});

		this.anims.create({
			key: 'close',
			frames: this.anims.generateFrameNames('scroll', {
				prefix: "scroll",
				suffix: ".png",
				start: 5,
				end: 1,
				zeroPad: 0,
				frameRate: 10,
			}),

		});

		
		this.anims.create({ 
			key: 'poof', 
			frames: this.anims.generateFrameNames('poof-effect', { prefix: 'Fx09_', start:3, end: 13, zeroPad: 2,suffix:'.png' }) ,
			frameRate: 16,
		});
        

		

		this._gamePaused = false;


		this.fontScore = { font: '52px ' + EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5 };
		this.fontName = { font: '32px ' + EPT.text['FONT'], fill: '#fff', stroke: '#000', strokeThickness: 5 };
		this.fontTitle = { font: '40px ' + EPT.text['FONT'], fill: '#fff', stroke: '#000', strokeThickness: 5 };
		this.fontRank = { font: '42px ' + EPT.text['FONT'], fill: '#3E2016', stroke: '#fff', strokeThickness: 10 };

		this.fontDifficulty = { font: '22px ' + EPT.text['FONT'], fill: '#3E2016', stroke: '#fff', strokeThickness: 2 };



		//this.levelText.setStroke('#ddd', 3);
		//this.levelText.setShadow(5, 5, 'rgba(1,1,1,0.5)', 30,true,false);

		//this.rankText = this.add.text(EPT.world.width + 200, 30, `Rank: ${this.level.rank}`, this.fontRank).setOrigin(0.5);
		//this.rankText.setShadow(5, 5, 'rgba(1,1,1,0.5)', 30,true,false);

		//this.tweens.add({ targets: this.rankText, x: 500, duration: 500, delay: 100, ease: 'Back' });




		this.cameras.main.once('camerafadeincomplete', () => {

			this.infoText = this.add.text(this.woodenframe.getCenter().x, this.woodenframe.getTopCenter().y + 150, '', this.fontInfo);
			this.infoText.setOrigin(0.5,0);
			this.infoText.setWordWrapWidth(500).setAlign('center');




			this.loadInitialQuestion();

			this.initUI();

			EPT.Sfx.stopMusic('music-theme');
			EPT.Sfx.playMusic('music-quiz');


			this.msg = this.add.text(this.woodenframe.getCenter().x, 0, 'Correct!', this.fontMessage).setOrigin(0.5);
			this.msg.y = -this.msg.height - 20;
			this.msg.setAlpha(999);

			this.nametag = this.add.image(EPT.world.centerX, EPT.world.height - 40, 'name_tag').setOrigin(0.5).setAlpha(0).setVisible(false);

			if (window.desktop)
				this.nametag.setVisible(true);

			this.zoomName = this.add.text(EPT.world.centerX, EPT.world.height - 40, '', this.fontZoomName).setOrigin(0.5).setAlpha(0);
			this.particles = this.add.particles('flare0');


		});


		this.cameras.main.fadeIn(250);





	}


	update() {

		if (this.wronganswer) {

			Phaser.Actions.RotateAroundDistance([this.selectedCharacter], { x: EPT.world.centerX, y: this.woodenframe.getCenter().y }, 0.10, 100);
		}

	}

	handleKey(e) {
		switch (e.code) {

			case 'KeyP': {
				this.managePause();
				break;
			}
			case 'KeyB': {
				this.stateBack();
				break;
			}
			case 'KeyT': {
				this.stateRestart();
				break;
			}
			default: { }
		}
	}
	managePause() {


		this.screenPausedGroup.setDepth(1004);
	
		this._gamePaused = !this._gamePaused;
		EPT.Sfx.play('click');

		var self = this;
		if (this._gamePaused) {
			EPT.fadeOutIn(function (self) {
				self.screenPausedGroup.setVisible(true);

				self.persons.forEach((person) => {

					console.log('person');
					console.log(person);
					if (person.label.input.enabled) {
						person.label.input.enabled = false;
					}
					if (person.frame.input.enabled) {
					person.frame.input.enabled = false;
					}
					if (person.sprite.input.enabled) {
					person.sprite.input.enabled = false;
					}
				});
				self.buttonPause.input.enabled = false;
				self.buttonMusic.input.enabled = false;
				self.buttonSound.input.enabled = false;
				self.stateStatus = 'paused';
				self._runOnce = false;
		
			}, this);

			if (desktop) {
				this.screenPausedBack.x = -this.screenPausedBack.width - 20;
				this.tweens.add({
					targets: this.screenPausedBack, x: EPT.world.centerX - 250, duration: 500, delay: 250, ease: 'Back',
					oncomplete: function () {
						self.screenPausedBack.setToolTip('Main Menu', true, self);
						
					}
				});
				this.screenPausedContinue.x = EPT.world.width + this.screenPausedContinue.width + 20;
				this.tweens.add({ targets: this.screenPausedContinue, x: EPT.world.centerX + 250, duration: 500, delay: 250, ease: 'Back',
			oncomplete: function(){
				self.screenPausedContinue.setToolTip('Back to Game',true, self);
			} });

			}
			else {
				this.screenPausedBack.x = -this.screenPausedBack.width - 20;
				this.tweens.add({
					targets: this.screenPausedBack, x: 100, duration: 500, delay: 250, ease: 'Back',
					oncomplete: function () {

						self.screenPausedBack.setToolTip('Main Menu', true, self);
						
					}
				});
				this.screenPausedContinue.x = EPT.world.width + this.screenPausedContinue.width + 20;
				this.tweens.add({
					targets: this.screenPausedContinue, x: EPT.world.width - 100, duration: 500, delay: 250, ease: 'Back',
					oncomplete: function () {
						self.screenPausedContinue.setToolTip('Back to Game', true, self);
					}
				});
			}


		}
		else {
			EPT.fadeOutIn(function (self) {
			
				self.screenPausedGroup.setVisible(false);
				self.persons.forEach((person) => {
					if (person.label.input) {
					person.label.input.enabled = true;
					}
					if (person.frame.input) {
					person.frame.input.enabled = true;
					}
					if (person.sprite.input) {
					person.sprite.input.enabled = true;
					}
				});
				self.buttonPause.input.enabled = true;
				self.buttonMusic.input.enabled = true;
				self.buttonSound.input.enabled = true;
				self._stateStatus = 'playing';
				self._runOnce = false;
			}, this);
			this.screenPausedBack.x = 100;
			this.tweens.add({ targets: this.screenPausedBack, x: -this.screenPausedBack.width - 20, duration: 500, ease: 'Back' });
			this.screenPausedContinue.x = EPT.world.width - 100;
			this.tweens.add({ targets: this.screenPausedContinue, x: EPT.world.width + this.screenPausedContinue.width + 20, duration: 500, ease: 'Back' });
		}
	}

	statePaused() {
		this.screenPausedGroup.setVisible(true);
	}

	stateGameover() {

		this.screenGameoverGroup.setDepth(1004);
		//EPT.Storage.setHighscore('EPT-highscore',this._score);
		EPT.fadeOutIn(function (self) {
			self.screenGameoverGroup.setVisible(true);
			self.buttonPause.input.enabled = false;
			self.screenGameoverScore.setText(EPT.text['gameplay-incorrect']);

		}, this);

		if (desktop) {
			this.screenGameoverBack.x = -this.screenGameoverBack.width - 20;
			this.tweens.add({ targets: this.screenGameoverBack, x: EPT.world.centerX - 250, duration: 500, delay: 250, ease: 'Back' });
			this.screenGameoverRestart.x = EPT.world.width + this.screenGameoverRestart.width + 20;
			this.tweens.add({ targets: this.screenGameoverRestart, x: EPT.world.centerX + 250, duration: 500, delay: 250, ease: 'Back' });

		} else {
			this.screenGameoverBack.x = -this.screenGameoverBack.width - 20;
			this.tweens.add({ targets: this.screenGameoverBack, x: 100, duration: 500, delay: 250, ease: 'Back' });
			this.screenGameoverRestart.x = EPT.world.width + this.screenGameoverRestart.width + 20;
			this.tweens.add({ targets: this.screenGameoverRestart, x: EPT.world.width - 100, duration: 500, delay: 250, ease: 'Back' });
		}
	}

	

	initUI() {

		this.fullWidth = 200;



		this.add.image(0, 0, 'menu_up').setOrigin(0, 0).displayWidth = EPT.world.width;

		this.levelText = this.add.image(80, 25, 'level-text').setScale(0.4).setOrigin(0, 0.5);


		this.rankIcon = this.add.image(this.levelText.getLeftCenter().x - 30, this.levelText.getRightCenter().y, `rank${this.currentlevel}`).setOrigin(0.5).setScale(0.5);

		
		this.add.text(this.levelText.getBottomLeft().x, this.levelText.getBottomLeft().y, this.difficulty, this.fontDifficulty).setOrigin(0, 0);


		this.add.image(this.levelText.getRightCenter().x + 10, 25, this.currentlevel.toString()).setOrigin(0, 0.5).setScale(0.4);
		this.add.image(EPT.world.centerX - 100, 25, 'level-progress-container').setOrigin(0, 0.5);
		this.pb = this.add.image(EPT.world.centerX - 100, 25, 'level-progress').setOrigin(0, 0.5);
		this.pbMask = this.add.sprite(this.pb.x, this.pb.y, "level-progress").setOrigin(0, 0.5);
		this.pbMask.setVisible(false);

		this.pb.mask = new Phaser.Display.Masks.BitmapMask(this, this.pbMask);

		this.pbMask.x -= 200;
		//this.levelText = this.add.text(130, 30, this.level.name, this.fontTitle).setOrigin(0.5).setVisible(false);


		this.buttonPause = new Button(EPT.world.width, 30, 'button-pause', this.managePause, this);
		this.buttonPause.x -= 50;
		this.buttonPause.setOrigin(0.5).setScale(0.6).setVisible(true).setDepth(1001);
		if (desktop) {
			this.buttonPause.x -= 60;
		}
		this.buttonPause.setToolTip('Pause', false, this);

		this.buttonSound = new Button(this.buttonPause.x - 60, 30, 'button-sound-on', this.clickSound, this);
		this.buttonSound.setOrigin(0.5, 0.5).setScale(0.6);

		this.buttonSound.setToolTip('Sound', false, this);

		this.textSound = this.add.text(0, 250, EPT.text['sound-on']);
		this.textSound.setOrigin(0, 0.5).setVisible(false);



		this.buttonMusic = new Button(this.buttonSound.x - 60, 30, 'button-music-on', this.clickMusic, this);
		this.buttonMusic.setOrigin(0.5, 0.5).setScale(0.6);
		this.buttonMusic.setToolTip('Music', false, this);

		this.textMusic = this.add.text(0, 0, EPT.text['music-on']);
		this.textMusic.setOrigin(0, 0.5).setVisible(false);

		this.buttonRestart = new Button(550, EPT.world.centerY, 'button-continue', this.stateNext, this);
		this.buttonRestart.setOrigin(0.5, 0).setScale(0.5).setVisible(false);

		if (window.desktop) {
			this.buttonRestart.setPosition(this.woodenframe.getCenter().x, this.woodenframe.getCenter().y + 180);
		}

		EPT.Sfx.update('sound', this.buttonSound, this.textSound);
		EPT.Sfx.update('music', this.buttonMusic, this.textMusic);

		var fontScoreWhite = { font: '38px ' + EPT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 5 };


		///var fontTitle = { font: '48px ' + EPT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 10 };
		var fontTitle = { font: '48px ' + EPT.text['FONT'], fill: '#fff', stroke: '#000', strokeThickness: 7 };

		this.screenPausedGroup = this.add.group();

		this.screenPausedBg = this.add.sprite(0, 0, 'overlay').setDisplaySize(EPT.world.width, EPT.world.height);
		this.screeePausedWoodBg = this.add.sprite(EPT.world.centerX, EPT.world.centerY, 'pause-bg').setOrigin(0.5); //setDisplaySize(EPT.world.width, EPT.world.height);
		this.screenPausedBg.setAlpha(0.95);
		this.screenPausedBg.setOrigin(0, 0);
		this.screenPausedText = this.add.text(EPT.world.centerX, EPT.world.centerY - 180, EPT.text['gameplay-paused'], fontTitle);
		this.screenPausedText.setOrigin(0.5, 0);
		this.screenPausedBack = new Button(100, EPT.world.centerY + 160, 'button-mainmenu', this.stateBack, this);
		this.screenPausedBack.setOrigin(0, 1).setScale(0.8);
		this.screenPausedContinue = new Button(EPT.world.width - 100, EPT.world.centerY + 160, 'button-continue', this.managePause, this);
		this.screenPausedContinue.setOrigin(1, 1).setScale(0.8);

		this.screenPausedBack.setToolTip('Main Menu',true, this);
		this.screenPausedContinue.setToolTip('Back to Game',true, this);
		this.screenPausedBack.infoText.setColor('black');

		this.screenPausedGroup.add(this.screenPausedBg);
		this.screenPausedGroup.add(this.screeePausedWoodBg);
		this.screenPausedGroup.add(this.screenPausedText);
		this.screenPausedGroup.add(this.screenPausedBack);
		this.screenPausedGroup.add(this.screenPausedContinue);
		this.screenPausedGroup.setVisible(false);

		this.screenGameoverGroup = this.add.group();
		this.screenGameoverBg = this.add.sprite(0, 0, 'overlay').setDisplaySize(EPT.world.width, EPT.world.height);
		this.screenGameoverWoodBg = this.add.sprite(EPT.world.centerX, EPT.world.centerY, 'pause-bg').setOrigin(0.5); //setDisplaySize(EPT.world.width, EPT.world.height);

		this.screenGameoverBg.setAlpha(0.95);
		this.screenGameoverBg.setOrigin(0, 0);
		this.screenGameoverText = this.add.text(EPT.world.centerX, 100, EPT.text['gameplay-gameover'], this.fontTitle);
		this.screenGameoverText.setOrigin(0.5, 0);
		this.screenGameoverBack = new Button(100, EPT.world.centerY + 160, 'button-mainmenu', this.stateBack, this);
		this.screenGameoverBack.setOrigin(0, 1).setScale(0.8);
		this.screenGameoverRestart = new Button(EPT.world.width - 100, EPT.world.centerY + 160, 'button-restart', this.stateRestart, this);
		this.screenGameoverRestart.setOrigin(1, 1).setScale(0.8);
		this.screenGameoverScore = this.add.text(EPT.world.centerX, EPT.world.centerY - 100, EPT.text['gameplay-incorrect'], this.fontTitle).setFontSize(42);
		this.screenGameoverScore.setWordWrapWidth(600, false).setAlign('center').setOrigin(0.5, 0);


		this.screenGameoverGroup.add(this.screenGameoverBg);
		this.screenGameoverGroup.add(this.screenGameoverWoodBg);
		this.screenGameoverGroup.add(this.screenGameoverText);
		this.screenGameoverGroup.add(this.screenGameoverBack);
		this.screenGameoverGroup.add(this.screenGameoverRestart);
		this.screenGameoverGroup.add(this.screenGameoverScore);
		this.screenGameoverGroup.setVisible(false);
	}
	stateNext() {

		EPT.Sfx.play('click');


		this.infoText.setAlpha(0);

		if (this.gameOver) {
			this.stateGameover();
			return;
		}


		this.itemClicked = false;

		if (this.emitter) {
			

			if (this.emitter.frequency != -1)
				this.emitter.explode();
		}





		var self = this;
		this.tweens.add({
			targets: [this.selectedCharacter],
			alpha: 0,
			duration: 500,
			oncomplete: function () {



				self.scroll.setAlpha(1);
				self.zoomName.setAlpha(0);
				self.nametag.setAlpha(0);

				self.buttonRestart.setVisible(false);
				self.scrollText.setText('');
				self.infoText.setAlpha(0);
			}
		});

		this.tweens.add({
			targets: this.msg,
			y: this.msg.height - 200,
			duration: 500,
		})
		this.tweens.add({
			targets: self.woodenframe,
			alpha: 0,
			duration: 500,

		})
		this.tweens.add({
			targets: [this.selectedFrame],
			y: EPT.world.height + this.selectedFrame.height,
			duration: 500,
			oncomplete: function () {


				self.time.delayedCall(1000, () => {
					self.selectedFrame.destroy();
					self.selectedCharacter.destroy();
					self.currentQuestion++;


					
					if (self.currentQuestion < self.quiz_length) {

						/*self.tweens.add({
							targets: [self.levelText, self.buttonPause],
							alpha: { start: 0, from: 0, to: 1 },
							duration: 500,
						})*/



						self.loadInitialQuestion();
					}
					else {
					
						self.nextLevel();
					}
				});
			}

		});

	}
	clickSound() {
		EPT.Sfx.play('click');
		EPT.Sfx.manage('sound', 'switch', this, this.buttonSound, this.textSound);
	}
	clickMusic() {
		EPT.Sfx.play('click');
		EPT.Sfx.manage('music', 'switch', this, this.buttonMusic, this.textMusic, 'music-quiz');

	}
	nextLevel() {
		EPT.Sfx.play('click');

		EPT.fadeOutScene('Award', this);

	
		
	}

	stateRestart() {
		this.currentQuestion = 0;


		EPT.Sfx.play('click');
		this.typewriterevent.remove(false);
		EPT.fadeOutScene('Game', this);

	}

	stateBack() {
		EPT.Sfx.play('click');
		EPT.Sfx.stopMusic('music-quiz');
		EPT.Sfx.playMusic('music-theme');

		EPT.fadeOutScene('MainMenu', this);
	}

	typeWriterText(text) {


		var length = text.length
		var i = 0
		this.typewriterevent = this.time.addEvent({
			callback: () => {

				if (this.quiz[this.currentQuestion]) {
					if (this.quiz[this.currentQuestion].question){
					if (text == this.quiz[this.currentQuestion].question) {
						this.scrollText.text += text[i]
						++i
					}
				}
			}
				
			},
			repeat: length - 1,
			delay: 50,
		})
	}

}