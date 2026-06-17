# Accessible Tactile Chess Set

Generated from `make_accessible_chess_models.js`.

## Files

- `accessible_tactile_board_8x8.stl`: one-piece 8x8 board
- `accessible_pawn.stl`
- `accessible_rook.stl`
- `accessible_knight.stl`
- `accessible_bishop.stl`
- `accessible_queen.stl`
- `accessible_king.stl`

## Built-in features

- Raised tactile borders between squares.
- Flat board surface except for the raised borders.
- No square sockets, no alternating square height, and no setup marks on the board.
- Flat piece bases for attachable magnets.
- Fluted waist on each piece for easier grip.
- More traditional chess silhouettes:
  - pawn: ball head
  - rook: stronger castle top with crenellations
  - knight: clearer horse-head top with muzzle and ears
  - bishop: rounded mitre top with a slit mark
  - queen: taller crown with outer points and a center point
  - king: taller, thicker cross top
- Cleaned STL normals for smoother lighting in slicers and model viewers.
- Piece footprints are about 19-21.6 mm wide so they fit within the 24 mm board squares.

## Main dimensions

Edit the `CFG` block in `make_accessible_chess_models.js` and run:

```powershell
node .\make_accessible_chess_models.js
```

Useful values:

- `square`: square size in mm. Current: 24
- `borderWidth`: tactile border width in mm. Current: 1.6
- `borderHeight`: tactile border height in mm. Current: 1.4
- `socket`: disabled. Current: 0
- `peg`: disabled. Current: 0
- `magnetPocketDiameter`: unused in this flat-base version.
