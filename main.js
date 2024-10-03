var game = new Game();
var handler = new Handler();
var squares = document.getElementsByClassName("field");

// Add event listeners to all squares
for (var i = 0; i < squares.length; i++)
{
    squares[i].addEventListener("click", function(event) {
        var div = event.target;
        handler.handle_player_input(div, game);
    });
}

// Play an entire ai game
/*
while (game.get_possible_moves() != 0)
{
    var ai = new AI();
    var best_move = ai.find_best_move(game, 0);
    game.squares[best_move.move] = game.current_color;
    game.current_color = game.current_color == 1 ? 2 : 1;
    handler.draw_game(game);
    console.log("pups");
}
*/

console.log("Game state: ", game.squares);
