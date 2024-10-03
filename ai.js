/**
 * Tic Tac Toe AI
 */
class AI
{
    max_depth = 9;

    // Finds the best move in the current game position
    find_best_move(game, depth)
    {
        var results = [];

        // Get a list of all possible moves
        var possible_moves = game.get_possible_moves();

        // If we have reached maximum calculation depth, just return the current eval
        if (depth == this.max_depth || possible_moves.length == 0 || game.get_win_state() != 0)
        {
            return new Eval_Move(-1, this.evaluate(game));
        }

        // Search through all possible moves
        for (var i = 0; i < possible_moves.length; i++)
        {
            // Play the move on a new board
            var copied_game = game.create_copy();
            copied_game.squares[possible_moves[i]] = game.current_color;
            copied_game.current_color = game.current_color == 2 ? 1 : 2;

            // Continue searching for the new move
            var new_depth = depth + 1;
            var searched_move = this.find_best_move(copied_game, new_depth);
            // Save the move and its result in the results array
            searched_move.move = possible_moves[i];
            results.push(searched_move);
        }

        // Find the best move in all possible moves
        var best_move_index = -1;
        var best_eval = 0;
        for (var i = 0; i < results.length; i++)
        {
            if ((results[i].evaluation > best_eval && game.current_color == 2)
                || (results[i].evaluation < best_eval && game.current_color == 1)
                || (best_move_index == -1 && best_eval == 0))
            {
                best_eval = results[i].evaluation;
                best_move_index = i;
            }
            else if (results[i].evaluation == best_eval)
            {
                // If two moves are equally good, choose a random one
                if (Math.random() * 100 < 50)
                {
                    best_eval = results[i].evaluation;
                    best_move_index = i;
                }
            }
        }

        // Print out the move information
        if (depth == 0)
        {
            console.log("All move evals: ", results);
        }
        return results[best_move_index];
    }

    /**
     * Assigns a number score to the current game position
     * @param {Game} game The game to be evaluated
     * @returns Evaluation score, 0 = nobody has won, 1 = red has won, 2 = blue has won
     */
    evaluate(game)
    {
        var result = game.get_win_state();

        if (result == 1)
        {
            return -10;
        }
        else if (result == 2)
        {
            return 10;
        }

        return 0;
    }
}
