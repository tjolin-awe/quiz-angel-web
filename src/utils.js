export var EPT = {};

EPT.ToolTipFont = { font: '16px ' + 'Berlin', fill: 'white', stroke: '#000', strokeThickness: 1 };
     
EPT.LastScreen = 'MainMenu';
EPT.Sfx = {
	manage: function(type, mode, game, button, label, audiomusic) {
		switch(mode) {
			case 'init': {
        EPT.Storage.initUnset('EPT-'+type, true);
        EPT.Sfx.status = EPT.Sfx.status || [];
        EPT.Sfx.status[type] = EPT.Storage.get('EPT-'+type);
        if(type == 'sound') {
          EPT.Sfx.sounds = [];
          EPT.Sfx.sounds['click'] = game.sound.add('sound-click');
          EPT.Sfx.sounds['addaward'] = game.sound.add('addaward');
          EPT.Sfx.sounds['incorrect'] = game.sound.add('incorrect-sound');
          EPT.Sfx.sounds['correct'] = game.sound.add('correct-sound');

         
        }
        else { // music
          EPT.Sfx.music = [];
          EPT.Sfx.music['music-theme'] = game.sound.add('music-theme');
          EPT.Sfx.music['music-theme'].volume = 0.5;
          EPT.Sfx.music['music-award'] = game.sound.add('music-award');
          EPT.Sfx.music['music-award'].volume = 0.5;
          EPT.Sfx.music['music-quiz'] = game.sound.add('music-quiz');
          EPT.Sfx.music['music-quiz'].volume = 0.5;
          
        }
				break;
			}
			case 'on': {
				EPT.Sfx.status[type] = true;
				break;
			}
			case 'off': {
				EPT.Sfx.status[type] = false;
    
				break;
			}
			case 'switch': {
				EPT.Sfx.status[type] =! EPT.Sfx.status[type];
     
				break;
			}
     
			default: {}
    }
    EPT.Sfx.update(type, button, label);


    if(type == 'music' && EPT.Sfx.music[audiomusic]) {
      if(EPT.Sfx.status['music']) {
        if(!EPT.Sfx.music[audiomusic].isPlaying) {
          EPT.Sfx.music[audiomusic].play({loop:true});
        }
      }
      else {
      
        EPT.Sfx.music[audiomusic].stop();
        
      }
    }

    EPT.Storage.set('EPT-'+type, EPT.Sfx.status[type]);
	},
  stopMusic: function(audio) {
    if(EPT.Sfx.status['music'] && EPT.Sfx.music && EPT.Sfx.music[audio].isPlaying) {
      EPT.Sfx.music[audio].stop()
    }
  },
  playMusic: function(audio) {
   
    if(EPT.Sfx.status['music'] && EPT.Sfx.music && !EPT.Sfx.music[audio].isPlaying) {
      EPT.Sfx.music[audio].play({loop:true});
    }
  
},
	play: function(audio) {
    if(audio == 'music') {
      if(EPT.Sfx.status['music'] && EPT.Sfx.music && !EPT.Sfx.music[audio].isPlaying) {
        EPT.Sfx.music[audio].play({loop:true});
      }
    }
    else { // sound
      if(EPT.Sfx.status['sound'] && EPT.Sfx.sounds && EPT.Sfx.sounds[audio]) {
       
        EPT.Sfx.sounds[audio].play();
      }
    }
  },
  update: function(type, button, label) {
    if(button) {
      if(EPT.Sfx.status[type]) {
        button.setTexture('button-'+type+'-on');
      }
      else {
        button.setTexture('button-'+type+'-off');
      }
    }
    if(label) {
      if(EPT.Sfx.status[type]) {
        label.setText(EPT.Lang.text[EPT.Lang.current][type+'-on']);
      }
      else {
        label.setText(EPT.Lang.text[EPT.Lang.current][type+'-off']);
      }
    }
  }
};
EPT.fadeOutIn = function(passedCallback, context) {
  context.cameras.main.fadeOut(250);
  context.time.addEvent({
    delay: 250,
    callback: function() {
      context.cameras.main.fadeIn(250);
      passedCallback(context);
    },
    callbackScope: context
  });  
}
EPT.fadeOutScene = function(sceneName, context) {
  context.cameras.main.fadeOut(250);
  context.time.addEvent({
      delay: 250,
      callback: function() {
        context.scene.start(sceneName);
      
      },
      callbackScope: context
  });
};

export class Button extends Phaser.GameObjects.Image {
  constructor(x, y, texture, callback, scene, noframes) {
    super(scene, x, y, texture, 0);
    this.setInteractive({ useHandCursor: true });
    this.infoText = scene.add.text(x,y,'',EPT.ToolTipFont).setOrigin(0.5).setVisible(false);
    this.on('pointerup', function() {
      if(!noframes) {
        this.setFrame(1);
      }
    }, this);

    this.on('pointerdown', function() {
      if(!noframes) {
        this.setFrame(2);
      }
      callback.call(scene);
    }, this);

    this.on('pointerover', function() {
      if(!noframes) {
        this.setFrame(1);
        if (this.infoText)
          this.infoText.setVisible(true).setDepth(10000);
      }
    }, this);

    this.on('pointerout', function() {
      if(!noframes) {
        this.setFrame(0);
        if (this.infoText)
          this.infoText.setVisible(false);
      }
    }, this);

    scene.add.existing(this);

   
  }
  setToolTip(label, ontop, scene){

    if (!label)
      label = 'no label';
    
    var labelposy = this.getCenter().y;
    if (!ontop) {
        labelposy = labelposy + this.displayHeight / 2 + 10;
    } else {
        labelposy = labelposy - this.displayHeight / 2 - 10;
    }
  
    this.infoText.setText(label);
    this.infoText.setPosition(this.getCenter().x, labelposy);

  }
};

EPT.Storage = {
	availability: function() {
		if(!(!(typeof(window.localStorage) === 'undefined'))) {
			console.log('localStorage not available');
			return null;
		}
	},
	get: function(key) {
		this.availability();
		try {
			return JSON.parse(localStorage.getItem(key));
		}
		catch(e) {
			return window.localStorage.getItem(key);
		}
	},
	set: function(key, value) {
		this.availability();
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
		catch(e) {
			if(e == QUOTA_EXCEEDED_ERR) {
				console.log('localStorage quota exceeded');
			}
		}
	},
	initUnset: function(key, value) {
		if(this.get(key) === null) {
			this.set(key, value);
		}
	},
	getFloat: function(key) {
		return parseFloat(this.get(key));
	},
	setHighscore: function(key, value) {
  
		if(value < this.getFloat(key)) {
			this.set(key, value);
		}
	},
	remove: function(key) {
		this.availability();
		window.localStorage.removeItem(key);
	},
	clear: function() {
		this.availability();
		window.localStorage.clear();
	}
};

EPT.Lang = {
  current: 'en',
  options: ['en', 'pl'],
  parseQueryString: function(query) {
    var vars = query.split('&');
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (typeof query_string[pair[0]] === 'undefined') {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof query_string[pair[0]] === 'string') {
        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        query_string[pair[0]] = arr;
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  },
  updateLanguage: function(lang) {
    var query = window.location.search.substring(1);
    var qs = EPT.Lang.parseQueryString(query);
    if(qs && qs['lang']) {
      console.log('LANG: '+qs['lang']);
      EPT.Lang.current = qs['lang'];
    } else {
      if(lang) {
        EPT.Lang.current = lang;
      }
      else {
        EPT.Lang.current = navigator.language;
      }
    }
    if(EPT.Lang.options.indexOf(EPT.Lang.current) == -1) {
      EPT.Lang.current = 'en';
    }
  },
  text: {
    'en': {
      'FONT': 'Berlin',
      'settings': 'SETTINGS',
      'sound-on': 'Sound: ON',
      'sound-off': 'Sound: OFF',
      'music-on': 'Music: ON',
      'music-off': 'Music: OFF',
      'keyboard-info': 'Press K for keyboard shortcuts',
      'credits': 'CREDITS',
      'madeby': '"Quiz Angel" made by',
      'team': 'THE TEAM',
      'coding': 'coding',
      'design': 'design',
      'testing': 'testing',
      'musicby': 'Music by',
      'key-title': 'KEYBOARD SHORTCUTS',
      'key-settings-title': 'Settings',
      'key-settings-onoff': 'S - show/hide settings',
      'key-audio': 'A - turn sound on/off',
      'key-music': 'M - turn music on/off',
      'key-credits': 'C - show/hide credits',
      'key-shortcuts': 'K - show/hide keyboard shortcuts',
      'key-menu': 'Main menu',
      'key-start': 'Enter - start game',
      'key-continue': 'Enter - continue',
      'key-gameplay': 'Gameplay',
      'key-button': 'Enter - activate CLICK ME button',
      'key-pause': 'P - turn pause screen on/off',
      'key-pause-title': 'Pause screen',
      'key-back': 'B - back to main menu',
      'key-return': 'P - return to the game',
      'key-gameover': 'Game over screen',
      'key-try': 'T - try again',
      'gameplay-score': 'Score: ',
      'gameplay-incorrect': 'Oh no! You got a question wrong. Try again?',
      'gameplay-timeleft': 'Time: ',
      'gameplay-paused': 'PAUSED',
      'gameplay-gameover': '',
      'menu-highscore': 'Best Time: ',
      'screen-story-howto': 'Progress through 15 levels from private soldier all the way to arch-angle where you will receive your wings and halo. ',
      'story-created-by' : 'Created By',
      'story': 'This is a FREE\n grace-game\n to encourage\n Christian growth and living.',
      'story_intro1': 'Make a Quiz Angel',
      'story_intro2': 'Answer Biblical questions and\n equip your angel with the\n Armor of God.',
      'story_intro3': 'Each stage of difficulty, has 8\n Levels of Questions.',
      'story_intro4': 'Each level your Quiz Angel gets\n a new item and rank.',
      'story_intro5': 'Once your Quiz Angel\n has wings, they can\n fly to Heaven.',
      'character_quiz_angel_name' : 'What is the name\n of your\n Quiz Angel?',
      'choose_difficulty': 'Difficulty',


    },
    
  }
};

// Usage tracking - remember to replace with your own!
/*
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onload = function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-30485283-26');
}
script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-30485283-26';
head.appendChild(script);*/