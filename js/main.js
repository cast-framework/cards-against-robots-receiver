$(CastFramework).ready(function() {
	CastFramework.start('urn:x-cast:com.davidtschida.android.cards');

	$(CastFramework).on("join", function(event, clientId, content) {
		content = content || {};
		// add the player to the list of players (if they aren't already in it)
		var push = true;
		console.dir(table.players());
		table.players().forEach(function(player) {
			if(player.id === clientId) {
				push = false;
			}
		});
		if(push) {
			table.players.push(new Player(clientId, content.name || null));
		}
		// give them 7 cards
		var cards = [];
		while(cards.length < 7) {
			cards.push(new WhiteCard());
		}
	 	CastFramework.sendMessage(clientId, "cards", cards);
	});

	$(CastFramework).on("ready", function(event, clientId, content) {
		// tell everyone you are ready
	 	CastFramework.broadcastMessage("ready", null);
	 	// tell everyone if they are the czar or not
	 	table.blackCard(new BlackCard());
	 	for(var i = 0; i < table.players().length; i++) {
	 		CastFramework.sendMessage(table.players()[i].id, "czar", {
	 			val: table.czar() === i,
	 			card: table.blackCard()
	 		});
	 	}
	 	table.ready(true);
	 	table.selectedCards([]);
	});

	$(CastFramework).on("czarFlip", function() {
		table.blackCard().flipped(true);
	});

	$(CastFramework).on("player_pick", function(event, clientId, content) {
		table.selectedCards.push(new WhiteCard(content));
		if(table.selectedCards().length === table.players().length-1) {
			CastFramework.broadcastMessage('allCardsSubmitted', null);
			CastFramework.sendMessage(table.players()[table.czar()].id, 'czar', table.selectedCards());
		}
	});

	$(CastFramework).on("czar_pick", function(event, clientId, content) {
		// do winner stuff
	});
});