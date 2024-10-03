/**
 * Represents the current state of the game
 */
class Game
{
    squares = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] // 0 = neutral, 1 = red, 2 = blue
    current_color = 2;

    /**
     * Returns a list of possible move
     * A move is considered possible if the square has not been taken by any side
     * @returns List of possible moves
     */
    get_possible_moves()
    {
        var moves = [];

        for (var i = 0; i < this.squares.length; i++)
        {
            if (this.squares[i] == 0)
            {
                moves.push(i);
            }
        }

        return moves;
    }

    /**
     * Checks if the game has been won yet
     * @returns 0 if no side won yet, 1 if blue won, 2 if red won
     */
    get_win_state()
    {
        for (var color = 1; color <= 2; color++)
        {
            if ((this.squares[0] == color && this.squares[1] == color && this.squares[2] == color)
                || (this.squares[3] == color && this.squares[4] == color && this.squares[5] == color)
                || (this.squares[6] == color && this.squares[7] == color && this.squares[8] == color)
                || (this.squares[0] == color && this.squares[3] == color && this.squares[6] == color)
                || (this.squares[1] == color && this.squares[4] == color && this.squares[7] == color)
                || (this.squares[2] == color && this.squares[5] == color && this.squares[8] == color)
                || (this.squares[0] == color && this.squares[4] == color && this.squares[8] == color)
                || (this.squares[2] == color && this.squares[4] == color && this.squares[6] == color))
            {
                return color;
            }
        }

        return 0;
    }

    /**
     * Creates a new Game object that holds the same position as this one
     * @returns Copy of the game
     */
    create_copy()
    {
        var new_game = new Game();
        new_game.squares = [...this.squares];
        new_game.current_color = this.current_color;
        return new_game;
    }
}
