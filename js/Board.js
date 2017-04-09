class Board {
  constructor() {
    this.combinations = [7, 56, 73, 84, 146, 273, 292, 448];
    this.availableTiles = [1, 2, 4, 8, 16, 32, 64, 128, 256];
    this.turn = 1;
    this.clicks = 0;
    this.player = [];
    this.ai = [];
  }

  update_player(data) {

    const tile = parseInt(data);

    if (this.availableTiles.indexOf(parseInt(tile)) < 0) {
      return false;
    }

    this.player.push(tile);
    this.updateAvailableTiles(tile);
    if (this.winner() === 'player') {
      return 'Player Wins';
    }
    this.turn = 2;
    return true;

  }

  update_ai(tile) {

    this.ai.push(tile);
    this.updateAvailableTiles(tile);
    if (this.winner() === 'ai') {
      return 'Computer Wins';
    }
    this.turn = 1;
    return true;
  }

  updateAvailableTiles(tile) {
    let index = this.availableTiles.indexOf(parseInt(tile));
    this.availableTiles.splice(index, 1);
  }

  winner() {

    if (this.ai.length >= 2 && this.player.length >= 2) {

      let winner;

      const ai_score = this.ai.reduce((t, n) => t + n);
      const player_score = this.player.reduce((t, n) => t + n);

      for (const combination of this.combinations) {
        if ((combination & ai_score) === combination) {
          winner = 'ai';
        }
        if ((combination & player_score) === combination) {
          winner = 'player';
        }
      }

      return winner;

    }
  }

}

module.exports = Board;