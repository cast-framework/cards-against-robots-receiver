function Table() {
	var self = this;
	self.ready = ko.observable(false);
    self.deck = [];
    self.players = ko.observableArray([]);
    self.czar = ko.observable(0);
    self.blackCard = ko.observable(null);
    self.selectedCards = ko.observableArray([]);
    self.status = ko.computed(function() {
    	if(self.ready()) {
    		if(self.blackCard().flipped()) {
    			return "Choose a card from your hand!";
    		} else {
    			return "Waiting for the czar to flip the black card."
    		}
    		return "Ready to play!";
    	} else {
    		return "Waiting for players..."
    	}
    });
}