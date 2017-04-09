const Board = require('./Board');
const $ = require('jquery');

class View extends Board {
  constructor(opts) {
    super();
    this.$board = $('#board');
    this.$gameOverTemplate = $('<div id="game-over"><h1></h1><br /><h5>Start Over</h5></div>').fadeIn();
    this.draw_board();
    this.game_loop();
  }

  tileClassValue(tiles, template, i) {
    template.attr('value', this.availableTiles[i - 1]);

    if (i === 3 || i === 6 || i === 9) {
      tiles.forEach((tile) => template.addClass('right-tile'));
    }

    if (i === 1 || i === 4 || i === 7) {
      tiles.forEach((tile) => template.addClass('left-tile'));
    }

    if (i === 2 || i === 5 || i === 8) {
      tiles.forEach((tile) => template.addClass('middle-tile'));
    }

  }

  draw_board() {

    for (let i = 1; i <= 9; i += 1) {

      let template = $(`<li class='tile'><span></span></li>`);

      if (i % 3 === 0) {

        this.tileClassValue([3, 6, 9], template, i);

        this.$board.append(template).append('<br />');

      } else {

        this.tileClassValue([4, 32, 256], template, i);
        this.tileClassValue([2, 16, 128], template, i);

        this.$board.append(template);

      }
    }
  }

  game_loop() {

    let vm = this;

    this.$board.on('click', 'li', function () {

      if (vm.turn % 2 !== 0) {

        const tile = $(this).attr('value');
        const player_state = vm.update_player(tile);

        $(this).find('span').text('X');

        if (!player_state) {
          return alert('Tile taken');
        }

        if (player_state === 'Player Wins') {
          return vm.game_over(player_state);
        }

      }

      vm.ai_move();

    });

  }

  ai_move() {

    const tile = this.availableTiles[Math.floor(Math.random() * this.availableTiles.length)];
    const ai_state = this.update_ai(tile);

    if (ai_state === 'Computer Wins') {
      this.game_over(ai_state);
    }

    $(`[value=${tile}]`).find('span').text('O');

  }

  game_over(message) {
    this.$gameOverTemplate.find('h1').text(message);
    $('.container').append(this.$gameOverTemplate);
    this.$board.css('opacity', 0.3);
    this.$gameOverTemplate.show();
    this.$gameOverTemplate.find('h5').click(() => {
      this.new_game();
    });
  }

  new_game() {
    this.$board.empty();
    this.$gameOverTemplate.hide();
    this.$board.css('opacity', 1);
    this.availableTiles = [1, 2, 4, 8, 16, 32, 64, 128, 256];
    this.turn = 1;
    this.player = [];
    this.ai = [];
    this.draw_board();
  }

}

const view = new View();
