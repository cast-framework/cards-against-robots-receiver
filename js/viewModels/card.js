function Card(name) {
	var self = this;
    self.name = name || "Hello, World!";
    self.flipped = ko.observable(false);
}

function BlackCard(name) {
	Card.apply(this, arguments);
}

function WhiteCard(name) {
	Card.apply(this, arguments);
}