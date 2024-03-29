function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.element = generateTemplate('column-template', { name: this.name, id: this.id });

/* POST */
    this.element.querySelector('.column').addEventListener('click', function (event) {
      if (event.target.classList.contains('btn-delete')) {
            self.removeColumn();
      }
  
      if (event.target.classList.contains('add-card')) {
        var cardName = prompt("Enter the name of the card");
        event.preventDefault();
        var data = new FormData();
        data.append('name', cardName);
        data.append('bootcamp_kanban_column_id', self.id);

        buttonToggle(true);
        fetch( prefix + baseUrl + '/card', {
            method: 'POST',
            headers: myHeaders,
            body: data,
          })
          .then(function(res) {
            return res.json();
          })
          .then(function(resp) {
            var card = new Card(resp.id, cardName);
            self.addCard(card);
            buttonToggle(false);
          });
      }
  });
}
/* FUNKCJA PROTOTYPOWA + DELETE */
Column.prototype = {
  addCard: function(card) {
    this.element.querySelector('ul').appendChild(card.element);
  },
  removeColumn: function() {
    var self = this;

    buttonToggle(true);
    fetch( prefix + baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
        buttonToggle(false);
      });
  }
};