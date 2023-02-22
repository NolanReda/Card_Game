console.log('Lodash is loaded:', typeof _ !== 'undefined');

var players = [
  { player: 'Foo', hand: [], handTotal: 0 },
  { player: 'Bar', hand: [], handTotal: 0 },
  { player: 'Baz', hand: [], handTotal: 0 },
  { player: 'Qux', hand: [], handTotal: 0 }
];

var suits = ['Club', 'Spade', 'Diamond', 'Heart'];
var ranks = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
var deck = [];

let suitsCounter = 0;
function makeDeck() {
  for (let i = 0; i <= ranks.length; i++) {
    var card = {};
    if (suitsCounter === 4) {
      return deck;
    }
    if (i === ranks.length) {
      i = 0 - 1;
      suitsCounter++;
    } else {
      card[suits[suitsCounter]] = ranks[i];
      deck.push(card);
    }
  }
}

function deal() {
  makeDeck();
  var shuffled = _.shuffle(deck);
  var card = 0;
  for (let i = 0; i < 8; i++) {
    if (card === 4) {
      i = 0;
    }
    if (card === 8) {
      return;
    }
    players[i].hand.push(shuffled[card]);
    card++;
  }
}

var $row = document.querySelector('#row');

function play(event) {
  var $table = document.querySelector('#table');
  if ($table) {
    return;
  }
  deal();
  var table = document.createElement('div');
  table.setAttribute('id', 'table');

  for (let i = 0; i < players.length; i++) {
    var div = document.createElement('div');
    div.setAttribute('class', 'text-row');
    var playerHand = document.createElement('p');
    playerHand.setAttribute('class', 'text');
    var hand1 = document.createTextNode(players[i].player + ' was dealt: ' + Object.keys(players[i].hand[0]) + ' ' + Object.values(players[i].hand[0]) + ' and ' + Object.keys(players[i].hand[1]) + ' ' + Object.values(players[i].hand[1]));
    playerHand.appendChild(hand1);
    div.appendChild(playerHand);
    table.appendChild(div);
    var card1 = Object.values(players[i].hand[0])[0];
    var card2 = Object.values(players[i].hand[1])[0];
    if (card1 === 'jack' || card1 === 'queen' || card1 === 'king') {
      card1 = 10;
    } else if (card1 === 'ace') {
      card1 = 11;
    }
    if (card2 === 'jack' || card2 === 'queen' || card2 === 'king') {
      card2 = 10;
    } else if (card2 === 'ace') {
      card2 = 11;
    }
    var total = card1 + card2;
    players[i].handTotal = total;
    var hand1more = document.createTextNode(' for a total of: ' + players[i].handTotal);
    playerHand.appendChild(hand1more);
  }

  var allTotal = [];
  for (let t = 0; t < players.length; t++) {
    allTotal.push(players[t].handTotal);
  }
  var highest = Math.max(...allTotal);
  for (let w = 0; w < players.length; w++) {
    if (players[w].handTotal === highest) {
      var winner = players[w].player;
    }
  }
  var winningPlayer = document.createElement('h2');
  var winName = document.createTextNode('The winner is: ' + winner);
  winningPlayer.appendChild(winName);
  div.appendChild(winningPlayer);
  $row.appendChild(table);

}

function reset(event) {
  var $table = document.querySelector('#table');
  if (!$table) {
    return;
  }
  for (let i = 0; i < players.length; i++) {
    players[i].hand = [];
    players[i].handTotal = 0;
  }
  $table.remove();
}

var $play = document.querySelector('#play');
$play.addEventListener('click', play);

var $reset = document.querySelector('#reset');
$reset.addEventListener('click', reset);
