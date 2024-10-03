/**
 * Handles player interaction with the game
 */
class Handler
{
    /**
     * Handle the click event on the html divs that represent the squares
     * @param {div} div     The div the player clicked on
     * @param {Game} game   The game to which the divs belong
     */
    handle_player_input(div, game)
    {
        var index = parseInt(div.innerText);

        if (game.squares[index] != 0
            || game.get_win_state() != 0)
        {
            return;
        }

        game.squares[index] = game.current_color;
        game.current_color = game.current_color == 1 ? 2 : 1;

        this.draw_game(game);

        document.getElementsByClassName("turn-text")[0].innerText = "AI is thinking...";

        setTimeout(() => {
            var ai = new AI();
            var best_move = ai.find_best_move(game, 0);
            console.log("Best move: ", best_move);
            if (game.current_color == 1 && game.get_win_state() == 0)
            {
                game.squares[best_move.move] = game.current_color;
                game.current_color = game.current_color == 1 ? 2 : 1;
                this.draw_game(game);
            }

            var win_state = game.get_win_state();
            var count = game.get_possible_moves().length;
            if (win_state == 0 && count != 0)
            {
                document.getElementsByClassName("turn-text")[0].innerText = "Your turn";
            }
            else if (win_state == 1)
            {
                document.getElementsByClassName("turn-text")[0].innerText = "AI won!";
            }
            else if (win_state == 2)
            {
                document.getElementsByClassName("turn-text")[0].innerText = "You won! (if this happened, contact arian.dannemann@gmail.com as it shouldn't)";
            }
            else
            {
                document.getElementsByClassName("turn-text")[0].innerText = "It's a draw!";
            }
        }, 30);
    }

    /**
     * Renders the game to the screen
     * @param {Game} game The game to draw
     */
    draw_game(game)
    {
        var squares = document.getElementsByClassName("field");

        for (var i = 0; i < squares.length; i++)
        {
            if (game.squares[i] == 0)
            {
                continue;
            }
            squares[i].style.backgroundColor = game.squares[i] == 2 ? "#5454ff" : "#ff5454";
            squares[i].style.color = game.squares[i] == 2 ? "#5454ff" : "#ff5454";
        }
    }
}
