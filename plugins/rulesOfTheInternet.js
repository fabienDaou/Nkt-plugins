$.plugin({
	name: 'rulesOfTheInternet',
  onWrite: function(msg, nick) {
      return this.talk(msg, true, nick);
  },
  talk: function(msg, tags, nick) {
    if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
      if(msg.indexOf("rule10") > -1)
		    setTimeout(function(){
			    $.chat.write("If you enjoy any rival sites - DON'T", 'Rule10');
		    }, 500),msg;
      else if(msg.indexOf("rule11") > -1)
		    setTimeout(function(){
			    $.chat.write("All your carefully picked arguments can easily be ignored", 'Rule11');
		    }, 500),msg;
      else if(msg.indexOf("rule12") > -1)
		    setTimeout(function(){
			    $.chat.write("Anything you say can and will be used against you", 'Rule12');
		    }, 500),msg;
      else if(msg.indexOf("rule13") > -1)
		    setTimeout(function(){
			    $.chat.write("Anything you say can be turned into something else - fixed", 'Rule13');
		    }, 500),msg;
      else if(msg.indexOf("rule14") > -1)
		    setTimeout(function(){
			    $.chat.write("Do not argue with trolls - it means that they win", 'Rule14');
		    }, 500),msg;
      else if(msg.indexOf("rule15") > -1)
		    setTimeout(function(){
			    $.chat.write("The harder you try the harder you will fail", 'Rule15');
		    }, 500),msg;
      else if(msg.indexOf("rule16") > -1)
		    setTimeout(function(){
			    $.chat.write("If you fail in epic proportions, it may just become a winning failure", 'Rule16');
		    }, 500),msg;
      else if(msg.indexOf("rule17") > -1)
		    setTimeout(function(){
			    $.chat.write("Every win fails eventually", 'Rule17');
		    }, 500),msg;
      else if(msg.indexOf("rule18") > -1)
		    setTimeout(function(){
			    $.chat.write("Everything that can be labeled can be hated", 'Rule18');
		    }, 500),msg;
      else if(msg.indexOf("rule19") > -1)
		    setTimeout(function(){
			    $.chat.write("The more you hate it the stronger it gets", 'Rule19');
		    }, 500),msg;
      else if(msg.indexOf("rule20") > -1)
		    setTimeout(function(){
			    $.chat.write("Nothing is to be taken seriously", 'Rule20');
		    }, 500),msg;
      else if(msg.indexOf("rule21") > -1)
		    setTimeout(function(){
			    $.chat.write("Original content is original only for a few seconds before getting old", 'Rule20');
		    }, 500),msg;
      else if(msg.indexOf("rule22") > -1)
		    setTimeout(function(){
			    $.chat.write("Copypasta is made to ruin every last bit of originality", 'Rule22');
		    }, 500),msg;
      else if(msg.indexOf("rule23") > -1)
		    setTimeout(function(){
			    $.chat.write("Copypasta is made to ruin every last bit of originality", 'Rule23');
		    }, 500),msg;
      else if(msg.indexOf("rule24") > -1)
		    setTimeout(function(){
			    $.chat.write("Every repost it always a repost of a repost", 'Rule24');
		    }, 500),msg;
      else if(msg.indexOf("rule25") > -1)
		    setTimeout(function(){
			    $.chat.write("Relation to the original topic decreases with every single post", 'Rule25');
		    }, 500),msg;
      else if(msg.indexOf("rule26") > -1)
		    setTimeout(function(){
			    $.chat.write("Any topic can easily be turned into something totally unrelated", 'Rule26');
		    }, 500),msg;
      else if(msg.indexOf("rule27") > -1)
		    setTimeout(function(){
			    $.chat.write("Always question a person's sexual prefrences without any real reason", 'Rule27');
		    }, 500),msg;
      else if(msg.indexOf("rule28") > -1)
		    setTimeout(function(){
			    $.chat.write("Always question a person's gender - just incase it's really a man", 'Rule28');
		    }, 500),msg;
      else if(msg.indexOf("rule29") > -1)
		    setTimeout(function(){
			    $.chat.write("In the internet all girls are men and all kids are undercover FBI agents", 'Rule29');
		    }, 500),msg;
      else if(msg.indexOf("rule30") > -1)
		    setTimeout(function(){
			    $.chat.write("There are no girls on the internet", 'Rule30');
		    }, 500),msg;
      else if(msg.indexOf("rule31") > -1)
		    setTimeout(function(){
			    $.chat.write("TITS or GTFO - the choice is yours", 'Rule31');
		    }, 500),msg;
      else if(msg.indexOf("rule32") > -1)
		    setTimeout(function(){
			    $.chat.write("You must have pictures to prove your statements", 'Rule32');
		    }, 500),msg;
      else if(msg.indexOf("rule33") > -1)
		    setTimeout(function(){
			    $.chat.write("Lurk more - it's never enough", 'Rule33');
		    }, 500),msg;
      else if(msg.indexOf("rule34") > -1)
		    setTimeout(function(){
			    $.chat.write("There is porn of it, no exceptions", 'Rule34');
		    }, 500),msg;
      else if(msg.indexOf("rule35") > -1)
		    setTimeout(function(){
			    $.chat.write("If no porn is found at the moment, it will be made", 'Rule35');
		    }, 500),msg;
      else if(msg.indexOf("rule36") > -1)
		    setTimeout(function(){
			    $.chat.write("There will always be even more fucked up shit than what you just saw", 'Rule36');
		    }, 500),msg;
      else if(msg.indexOf("rule37") > -1)
		    setTimeout(function(){
			    $.chat.write("You can not divide by zero (just because the calculator says so)", 'Rule37');
		    }, 500),msg;
      else if(msg.indexOf("rule38") > -1)
		    setTimeout(function(){
			    $.chat.write("No real limits of any kind apply here - not even the sky", 'Rule38');
		    }, 500),msg;
      else if(msg.indexOf("rule39") > -1)
		    setTimeout(function(){
			    $.chat.write("CAPSLOCK IS CRUISE CONTROL FOR COOL", 'Rule39');
		    }, 500),msg;
      else if(msg.indexOf("rule40") > -1)
		    setTimeout(function(){
			    $.chat.write("EVEN WITH CRUISE CONTROL YOU STILL HAVE TO STEER", 'Rule40');
		    }, 500),msg;
      else if(msg.indexOf("rule41") > -1)
		    setTimeout(function(){
			    $.chat.write("Desu isn't funny. Seriously guys. It's worse than Chuck Norris jokes.", 'Rule41');
		    }, 500),msg;
      else if(msg.indexOf("rule42") > -1)
		    setTimeout(function(){
			    $.chat.write("Nothing is Sacred.", 'Rule42');
		    }, 500),msg;
      else if(msg.indexOf("rule43") > -1)
		    setTimeout(function(){
			    $.chat.write("The more beautiful and pure a thing is - the more satisfying it is to corrupt it", 'Rule43');
		    }, 500),msg;
      else if(msg.indexOf("rule44") > -1)
		    setTimeout(function(){
			    $.chat.write("Even one positive comment about Japanese things can make you a weaboo", 'Rule44');
		    }, 500),msg;
      else if(msg.indexOf("rule45") > -1)
		    setTimeout(function(){
			    $.chat.write("When one sees a lion, one must get into the car.", 'Rule45');
		    }, 500),msg;
      else if(msg.indexOf("rule46") > -1)
		    setTimeout(function(){
			    $.chat.write("There is always furry porn of it.", 'Rule46');
		    }, 500),msg;
      else if(msg.indexOf("rule47") > -1)
		    setTimeout(function(){
			    $.chat.write("The pool is always closed.", 'Rule47');
		    }, 500),msg;

		else if(msg.indexOf("rule48") > -1)
		    setTimeout(function(){
			    $.chat.write("A cat is fine too.", 'Rule48');
		    }, 500),msg;
		else if(msg.indexOf("rule49") > -1)
		    setTimeout(function(){
			    $.chat.write("One cat leads to another.", 'Rule49');
		    }, 500),msg;
		else if(msg.indexOf("rule50") > -1)
		    setTimeout(function(){
			    $.chat.write("Another cat leads to Zippo Cat.", 'Rule50');
		    }, 500),msg;    
		else if(msg.indexOf("rule51") > -1)
		    setTimeout(function(){
			    $.chat.write("No matter what it is, it is somebody's fetish. No exceptions.", 'Rule51');
		    }, 500),msg;    
		else if(msg.indexOf("rule52") > -1)
		    setTimeout(function(){
			    $.chat.write("It is delicious cake. You must eat it.", 'Rule52');
		    }, 500),msg;   
		else if(msg.indexOf("rule53") > -1)
		    setTimeout(function(){
			    $.chat.write("It is delicious trap. You must hit it.", 'Rule53');
		    }, 500),msg;   
		else if(msg.indexOf("rule55") > -1)
		    setTimeout(function(){
			    $.chat.write("If you have time to make up new rules, you have no life.", 'Rule55');
		    }, 500),msg;    
		else if(msg.indexOf("rule56") > -1)
		    setTimeout(function(){
			    $.chat.write("They will not bring back Snacks.", 'Rule56');
		    }, 500),msg;    
		else if(msg.indexOf("rule57") > -1)
		    setTimeout(function(){
			    $.chat.write("You will never have sex.", 'Rule57');
		    }, 500),msg;    
		else if(msg.indexOf("rule58") > -1)
		    setTimeout(function(){
			    $.chat.write("I just had sex and it felt so good.", 'Rule58');
		    }, 500),msg;     
		else if(msg.indexOf("rule59") > -1)
		    setTimeout(function(){
			    $.chat.write("No one does it like Gaston. No exceptions.", 'Rule59');
		    }, 500),msg;    
    	else if(msg.indexOf("rule60") > -1)
		    setTimeout(function(){
			    $.chat.write("It needs more pumpkin. No exceptions.", 'Rule60');
		    }, 500),msg;
		else if(msg.indexOf("rule60.1") > -1)
		    setTimeout(function(){
			    $.chat.write("What pumpkin?", 'Rule60.1');
		    }, 500),msg;    
		else if(msg.indexOf("rule60.2") > -1)
		    setTimeout(function(){
			    $.chat.write("It doesn't matter as long as you give him the butter.", 'Rule60.2');
		    }, 500),msg;     
		else if(msg.indexOf("rule61") > -1)
		    setTimeout(function(){
			    $.chat.write("It needs more cowbell. No exceptions.", 'Rule61');
		    }, 500),msg;    
		else if(msg.indexOf("rule62") > -1)
		    setTimeout(function(){
			    $.chat.write("It has been cracked and pirated. No exceptions.", 'Rule62');
		    }, 500),msg;     
		else if(msg.indexOf("rule63") > -1)
		    setTimeout(function(){
			    $.chat.write("For every male character there is a female version. No Exceptions.", 'Rule63');
		    }, 500),msg;    
		else if(msg.indexOf("rule64") > -1)
		    setTimeout(function(){
			    $.chat.write("Don't copy that floppy.", 'Rule64');
		    }, 500),msg;     
		else if(msg.indexOf("rule65") > -1)
		    setTimeout(function(){
			    $.chat.write("Anonymous is not your personal army.", 'Rule65');
		    }, 500),msg;    
		else if(msg.indexOf("rule66") > -1)
		    setTimeout(function(){
			    $.chat.write("The cake is a lie.", 'Rule66');
		    }, 500),msg; 
		else if(msg.indexOf("rule67") > -1)
		    setTimeout(function(){
			    $.chat.write("Anonymous does not 'buy', he downloads.", 'Rule67');
		    }, 500),msg;   
		else if(msg.indexOf("rule68") > -1)
		    setTimeout(function(){
			    $.chat.write("Milhouse will never be a meme. Ever. No matter what your post ends with. No exceptions. Ever. No.", 'Rule68');
		    }, 500),msg;    
		else if(msg.indexOf("rule69") > -1)
		    setTimeout(function(){
			    $.chat.write("LOL SIXTY NINE AMIRITE?", 'Rule69');
		    }, 500),msg;     
    	else if(msg.indexOf("rule70") > -1)
		    setTimeout(function(){
			    $.chat.write("Do not talk about the 100M GET failure.", 'Rule70');
		    }, 500),msg;
		else if(msg.indexOf("rule71") > -1)
		    setTimeout(function(){
			    $.chat.write("The internet is SERIOUS BUSINESS.", 'Rule71');
		    }, 500),msg;   
   		else if(msg.indexOf("rule72") > -1)
		    setTimeout(function(){
			    $.chat.write("Darth Vader is your father. No exceptions.", 'Rule72');
		    }, 500),msg;
   		else if(msg.indexOf("rule73") > -1)
		    setTimeout(function(){
			    $.chat.write("If there isn't enough just ask for Moar.", 'Rule73');
		    }, 500),msg;
   		else if(msg.indexOf("rule75") > -1)
		    setTimeout(function(){
			    $.chat.write("Rule 75 is a lie.", 'Rule75');
		    }, 500),msg;
   		else if(msg.indexOf("rule76") > -1)
		    setTimeout(function(){
			    $.chat.write("Twinkies are the answers to life's problems.", 'Rule76');
		    }, 500),msg;
   		else if(msg.indexOf("rule77") > -1)
		    setTimeout(function(){
			    $.chat.write("The internet makes you stupid.", 'Rule77');
		    }, 500),msg;
   		else if(msg.indexOf("rule78") > -1)
		    setTimeout(function(){
			    $.chat.write("It will always need more sauce.", 'Rule78');
		    }, 500),msg;
   		else if(msg.indexOf("rule80") > -1)
		    setTimeout(function(){
			    $.chat.write("Interwebz177 did it. No exceptions.", 'Rule80');
		    }, 500),msg;
   		else if(msg.indexOf("rule81") > -1)
		    setTimeout(function(){
			    $.chat.write("Anonymous is a fool by default.", 'Rule81');
		    }, 500),msg;
   		else if(msg.indexOf("rule82") > -1)
		    setTimeout(function(){
			    $.chat.write("Nobody tells the truth on the Internet.", 'Rule82');
		    }, 500),msg;
   		else if(msg.indexOf("rule84") > -1)
		    setTimeout(function(){
			    $.chat.write("All rules ARE true, including this one. ", 'Rule84');
		    }, 500),msg;
   		else if(msg.indexOf("rule85") > -1)
		    setTimeout(function(){
			    $.chat.write("Stupid rules are forbidden.", 'Rule85');
		    }, 500),msg;
   		else if(msg.indexOf("rule86") > -1)
		    setTimeout(function(){
			    $.chat.write("The term 'sage' does not refer to the spice.", 'Rule86');
		    }, 500),msg;
   		else if(msg.indexOf("rule87") > -1)
		    setTimeout(function(){
			    $.chat.write("If you get pepperoni ever again, I swear I'll blow this joint sky-high!", 'Rule87');
		    }, 500),msg;
   		else if(msg.indexOf("rule88") > -1)
		    setTimeout(function(){
			    $.chat.write("Anonymous rules the internet. No exceptions. ", 'Rule88');
		    }, 500),msg;
   		else if(msg.indexOf("rule89") > -1)
		    setTimeout(function(){
			    $.chat.write("Bruce Lee was a hero to us all.", 'Rule89');
		    }, 500),msg;
   		else if(msg.indexOf("rule90") > -1)
		    setTimeout(function(){
			    $.chat.write("It's never lupus.", 'Rule90');
		    }, 500),msg;
   		else if(msg.indexOf("rule94") > -1)
		    setTimeout(function(){
			    $.chat.write("This is rule 94. It was definitely not deleted by SOPA.", 'Rule94');
		    }, 500),msg;
   		else if(msg.indexOf("rule95") > -1)
		    setTimeout(function(){
			    $.chat.write("Anonymous did NOT, under any circumstances, tk him 2da bar?", 'Rule95');
		    }, 500),msg;
   		else if(msg.indexOf("rule96") > -1)
		    setTimeout(function(){
			    $.chat.write("If you express astonishment at someone's claim, it is most likely just a clever ruse.", 'Rule96');
		    }, 500),msg;
		else if(msg.indexOf("rule97.2") > -1)
		    setTimeout(function(){
			    $.chat.write("The NSA is out to get you, no exceptions.", 'Rule97.2');
		    }, 500),msg;
   		else if(msg.indexOf("rule97") > -1)
		    setTimeout(function(){
			    $.chat.write("The government, The CIA, Everything is a lie.", 'Rule97');
		    }, 500),msg;
   		else if(msg.indexOf("rule98") > -1)
		    setTimeout(function(){
			    $.chat.write("Only Zippocat is truth.", 'Rule98');
		    }, 500),msg;
   		else if(msg.indexOf("rule99") > -1)
		    setTimeout(function(){
			    $.chat.write("All numbers are at least 100 but always OVER NINE THOUSAAAAAND.", 'Rule99');
		    }, 500),msg;
   		else if(msg.indexOf("rule100") > -1)
		    setTimeout(function(){
			    $.chat.write("Gay will not be tolerated.", 'Rule100');
		    }, 500),msg;
		      else if(msg.indexOf("rule1") > -1)
		    setTimeout(function(){
			    $.chat.write("Do not talk about /b/", 'Rule1');
		    }, 500),msg;
      else if(msg.indexOf("rule2") > -1)
		    setTimeout(function(){
			    $.chat.write("Do NOT talk about /b/", 'Rule2');
		    }, 500),msg;
      else if(msg.indexOf("rule3") > -1)
		    setTimeout(function(){
			    $.chat.write("We are Anonymous", 'Rule3');
		    }, 500),msg;
      else if(msg.indexOf("rule4") > -1)
		    setTimeout(function(){
			    $.chat.write("Anonymous is legion", 'Rule4');
		    }, 500),msg;
      else if(msg.indexOf("rule5") > -1)
		    setTimeout(function(){
			    $.chat.write("Anonymous never forgives", 'Rule5');
		    }, 500),msg;
      else if(msg.indexOf("rule6") > -1)
		    setTimeout(function(){
			    $.chat.write("Anonymous can be a horrible, senseless, uncaring monster", 'Rule6');
		    }, 500),msg;
      else if(msg.indexOf("rule7") > -1)
		    setTimeout(function(){
			    $.chat.write("Anonymous is still able to deliver", 'Rule7');
		    }, 500),msg;
      else if(msg.indexOf("rule8") > -1)
		    setTimeout(function(){
			    $.chat.write("There are no real rules about posting", 'Rule8');
		    }, 500),msg;
      else if(msg.indexOf("rule9") > -1)
		    setTimeout(function(){
			    $.chat.write("There are no real rules about moderation either - enjoy your ban", 'Rule9');
		    }, 500),msg;		    		    		  			    		    		  		    		    		    				    		    		    			    		    		    			    		    		    				    		    		    				    		    		    				 		    		    		    				    		    		    					    		    		    			    		    		    				    		    		    		    		    		    		    		    		    		    				    		    		    						    		    		    				    		    		    				    		    		    				    		    		    		    		    		    
    }
  return msg;
  }
});