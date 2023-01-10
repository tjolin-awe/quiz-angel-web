import { EPT } from './utils'
export default class Preloader extends Phaser.Scene {
	constructor() {
		super('Preloader');

	}
	preload() {

		this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(EPT.world.width, EPT.world.height);
		var logoEnclave = this.add.sprite(EPT.world.centerX, EPT.world.centerY - 50, 'logo');
		logoEnclave.setOrigin(0.5, 0.5);
		var loadingBg = this.add.sprite(EPT.world.centerX, EPT.world.centerY + 100, 'loading-background');
		loadingBg.setOrigin(0.5, 0.5);

		var progress = this.add.graphics();
		this.load.on('progress', function (value) {
			progress.clear();
			progress.fillStyle(0xffde00, 1);
			progress.fillRect(loadingBg.x - (loadingBg.width * 0.5) + 20, loadingBg.y - (loadingBg.height * 0.5) + 10, 540 * value, 25);
		});

		var resources = {
			'image': [
				['title', 'assets/images/title.png'],
				['angel-cover', 'assets/images/quiz_angel_cover.png'],
				['Abigal Colour.png', 'assets/images/characters/Abigal Colour.png'],
				['Abner Colour.png', 'assets/images/characters/Abner Colour.png'],
				['Abraham.png', 'assets/images/characters/Abraham.png'],
				['Absalom Colour.png', 'assets/images/characters/Absalom Colour.png'],
				['Ahab Colour.png', 'assets/images/characters/Ahab Colour.png'],
				['Amalekite Raider Colour.png', 'assets/images/characters/Amalekite Raider Colour.png'],
				['Apostle Paul.png', 'assets/images/characters/Apostle Paul.png'],
				['Asahel Colour.png', 'assets/images/characters/Asahel Colour.png'],
				['Bathsheba Colour.png', 'assets/images/characters/Bathsheba Colour.png'],
				['Benaiah Colour.png', 'assets/images/characters/Benaiah Colour.png'],
				['Boaz Colour.png', 'assets/images/characters/Boaz Colour.png'],
				['Daniel.png', 'assets/images/characters/Daniel.png'],
				['David King.png', 'assets/images/characters/David King.png'],
				['David Shepherd Colour.png', 'assets/images/characters/David Shepherd Colour.png'],
				['David Warrior Colour.png', 'assets/images/characters/David Warrior Colour.png'],
				['David.png', 'assets/images/characters/David.png'],
				['Deborah.png', 'assets/images/characters/Deborah.png'],
				['Delilah.png', 'assets/images/characters/Delilah.png'],
				['Demon Possessed Man Colour.png', 'assets/images/characters/Demon Possessed Man Colour.png'],
				['Egypt Guard.png', 'assets/images/characters/Egypt Guard.png'],
				['Egypt Queen.png', 'assets/images/characters/Egypt Queen.png'],
				['Elijah Colour.png', 'assets/images/characters/Elijah Colour.png'],
				['Elijah Running Colour.png', 'assets/images/characters/Elijah Running Colour.png'],
				['Elijah2.png', 'assets/images/characters/Elijah2.png'],
				['Elisha the Prophet Colour.png', 'assets/images/characters/Elisha the Prophet Colour.png'],
				['Esther Colour.png', 'assets/images/characters/Esther Colour.png'],
				['Gideon.png', 'assets/images/characters/Gideon.png'],
				['Goliath Colour.png', 'assets/images/characters/Goliath Colour.png'],
				['Good Samaritan Colour.png', 'assets/images/characters/Good Samaritan Colour.png'],
				['Hannah Colour.png', 'assets/images/characters/Hannah Colour.png'],
				['Herod A Colour.png', 'assets/images/characters/Herod A Colour.png'],
				['Herod Colour.png', 'assets/images/characters/Herod Colour.png'],
				['High Priest.png', 'assets/images/characters/High Priest.png'],
				['Isaac.png', 'assets/images/characters/Isaac.png'],
				['Ishbosheth Colour.png', 'assets/images/characters/Ishbosheth Colour.png'],
				['Jacob.png', 'assets/images/characters/Jacob.png'],
				['Jehu Colour.png', 'assets/images/characters/Jehu Colour.png'],
				['Jesus Ascending Colour.png', 'assets/images/characters/Jesus Ascending Colour.png'],
				['Jesus Baby Colour 2.png', 'assets/images/characters/Jesus Baby Colour 2.png'],
				['Jesus Baby Colour 3.png', 'assets/images/characters/Jesus Baby Colour 3.png'],
				['Jesus Baby Colour 4.png', 'assets/images/characters/Jesus Baby Colour 4.png'],
				['Jesus Baby Colour.png', 'assets/images/characters/Jesus Baby Colour.png'],
				['Jesus Baptism 1.png', 'assets/images/characters/Jesus Baptism 1.png'],
				['Jesus Baptism 2.png', 'assets/images/characters/Jesus Baptism 2.png'],
				['Jesus Breaking Bread Colour.png', 'assets/images/characters/Jesus Breaking Bread Colour.png'],
				['Jesus Christ Transfigured.png', 'assets/images/characters/Jesus Christ Transfigured.png'],
				['Jesus Christ.png', 'assets/images/characters/Jesus Christ.png'],
				['Jesus In The Air.png', 'assets/images/characters/Jesus In The Air.png'],
				['Jesus Judge Not.png', 'assets/images/characters/Jesus Judge Not.png'],
				['Jesus Lamb of God.png', 'assets/images/characters/Jesus Lamb of God.png'],
				['Jesus Loaves and fish Colour.png', 'assets/images/characters/Jesus Loaves and fish Colour.png'],
				['Jesus on Cross Colour.png', 'assets/images/characters/Jesus on Cross Colour.png'],
				['Jesus on Donkey Colour.png', 'assets/images/characters/Jesus on Donkey Colour.png'],
				['Jesus On Trial Colour.png', 'assets/images/characters/Jesus On Trial Colour.png'],
				['Jesus on White Horse Colour.png', 'assets/images/characters/Jesus on White Horse Colour.png'],
				['Jesus Pointing 2.png', 'assets/images/characters/Jesus Pointing 2.png'],
				['Jesus Pointing.png', 'assets/images/characters/Jesus Pointing.png'],
				['Jesus Praying.png', 'assets/images/characters/Jesus Praying.png'],
				['Jesus Scripture Reading.png', 'assets/images/characters/Jesus Scripture Reading.png'],
				['Jesus Sitting 1.png', 'assets/images/characters/Jesus Sitting 1.png'],
				['Jesus Teaching Colour.png', 'assets/images/characters/Jesus Teaching Colour.png'],
				['Jesus Walk On Water.png', 'assets/images/characters/Jesus Walk On Water.png'],
				['Jesus Washing Colour.png', 'assets/images/characters/Jesus Washing Colour.png'],
				['Jesus Welcome.png', 'assets/images/characters/Jesus Welcome.png'],
				['Jesus Young Colour.png', 'assets/images/characters/Jesus Young Colour.png'],
				['Jezebel Colour.png', 'assets/images/characters/Jezebel Colour.png'],
				['Joab Colour.png', 'assets/images/characters/Joab Colour.png'],
				['Job Colour.png', 'assets/images/characters/Job Colour.png'],
				['Job Sick Colour.png', 'assets/images/characters/Job Sick Colour.png'],
				['Jobs Wife Colour.png', 'assets/images/characters/Jobs Wife Colour.png'],
				['John the Baptist.png', 'assets/images/characters/John the Baptist.png'],
				['logos','assets/images/Logos.png'],
				['Jonah Colour.png', 'assets/images/characters/Jonah Colour.png'],
				['Jonathan Colour.png', 'assets/images/characters/Jonathan Colour.png'],
				['Joseph Mary Colour.png', 'assets/images/characters/Joseph Mary Colour.png'],
				['Joseph PM.png', 'assets/images/characters/Joseph PM.png'],
				['Joseph.png', 'assets/images/characters/Joseph.png'],
				['Joshua.png', 'assets/images/characters/Joshua.png'],
				['Judas Colour.png', 'assets/images/characters/Judas Colour.png'],
				['King Jehoshaphat Colour.png', 'assets/images/characters/King Jehoshaphat Colour.png'],
				['Lazarus Colour.png', 'assets/images/characters/Lazarus Colour.png'],
				['Lazarus risen Colour.png', 'assets/images/characters/Lazarus risen Colour.png'],
				['LazarusPoor.png', 'assets/images/characters/LazarusPoor.png'],
				['Martha Colour.png', 'assets/images/characters/Martha Colour.png'],
				['Mary Colour.png', 'assets/images/characters/Mary Colour.png'],
				['Mary Jesus Colour.png', 'assets/images/characters/Mary Jesus Colour.png'],
				['Mary Magdalene Colour.png', 'assets/images/characters/Mary Magdalene Colour.png'],
				['Mary Martha sister Colour.png', 'assets/images/characters/Mary Martha sister Colour.png'],
				['Mary Mother Colour.png', 'assets/images/characters/Mary Mother Colour.png'],
				['Mary Old Colour.png', 'assets/images/characters/Mary Old Colour.png'],
				['Mephibosheth Colour.png', 'assets/images/characters/Mephibosheth Colour.png'],
				['Mini Jesus Colour.png', 'assets/images/characters/Mini Jesus Colour.png'],
				['Mordecai Colour.png', 'assets/images/characters/Mordecai Colour.png'],
				['Moses Baby.png', 'assets/images/characters/Moses Baby.png'],
				['Moses Eygpt.png', 'assets/images/characters/Moses Eygpt.png'],
				['Moses.png', 'assets/images/characters/Moses.png'],
				['Nabal Colour.png', 'assets/images/characters/Nabal Colour.png'],
				['Nathan Colour.png', 'assets/images/characters/Nathan Colour.png'],
				['Nebuchadnezzar.png', 'assets/images/characters/Nebuchadnezzar.png'],
				['Noah Colour.png', 'assets/images/characters/Noah Colour.png'],
				['Peter Colour.png', 'assets/images/characters/Peter Colour.png'],
				['Pharisee Colour.png', 'assets/images/characters/Pharisee Colour.png'],
				['Pharoah.png', 'assets/images/characters/Pharoah.png'],
				['Pilate Colour.png', 'assets/images/characters/Pilate Colour.png'],
				['Priest Uzzah Colour.png', 'assets/images/characters/Priest Uzzah Colour.png'],
				['Queen Sheba Colour.png', 'assets/images/characters/Queen Sheba Colour.png'],
				['Rich Man Colour.png', 'assets/images/characters/Rich Man Colour.png'],
				['Roman Soldier Colour.png', 'assets/images/characters/Roman Soldier Colour.png'],
				['Ruth Colour.png', 'assets/images/characters/Ruth Colour.png'],
				['Sampson.png', 'assets/images/characters/Sampson.png'],
				['Samuel Colour.png', 'assets/images/characters/Samuel Colour.png'],
				['Sarah.png', 'assets/images/characters/Sarah.png'],
				['Saul Colour.png', 'assets/images/characters/Saul Colour.png'],
				['Shepherd Boy Colour.png', 'assets/images/characters/Shepherd Boy Colour.png'],
				['Shepherd Colour.png', 'assets/images/characters/Shepherd Colour.png'],
				['Solomon Colour.png', 'assets/images/characters/Solomon Colour.png'],
				['Teacher Colour.png', 'assets/images/characters/Teacher Colour.png'],
				['Uriah the Hittite Colour.png', 'assets/images/characters/Uriah the Hittite Colour.png'],
				['Wiseman 1 Colour.png', 'assets/images/characters/Wiseman 1 Colour.png'],
				['Wiseman 2 Colour.png', 'assets/images/characters/Wiseman 2 Colour.png'],
				['Wiseman 3 Colour.png', 'assets/images/characters/Wiseman 3 Colour.png'],
				['Witch of Endor Colour.png', 'assets/images/characters/Witch of Endor Colour.png'],
				['Wounded Man Colour.png', 'assets/images/characters/Wounded Man Colour.png'],

			],
			'spritesheet': [
				['button-start', 'assets/ui/button-start.png', { frameWidth: 180, frameHeight: 180 }],
				['button-settings', 'assets/ui/button-settings.png', { frameWidth: 80, frameHeight: 80 }],
				['loader', 'assets/ui/loader.png', { frameWidth: 45, frameHeight: 45 }],
				['fullscreen', 'assets/ui/fullscreen.png', { frameWidth: 64, frameHeight: 64 }],
				['heavensparkle', 'assets/effects/heavensparkle.png', { frameWidth: 640, frameHeight: 371 }]
			],
			'atlas': [
				
			],

		};
		for (var method in resources) {
			resources[method].forEach(function (args) {
				var loader = this.load[method];
				loader && loader.apply(this.load, args);
			}, this);
		};

		//this.load.atlas('bible_spritesheet','assets/bible_spritesheet.png', 'assets/bible_spritesheet.json');
		//this.load.json('characters', 'assets/bible_spritesheet.json');

		console.log('Preloader preload END');
	}
	create() {

		console.log('going to main menu')
		EPT.fadeOutScene('MainMenu', this);
	}
}