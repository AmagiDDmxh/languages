{-# LANGUAGE OverloadedStrings #-}
import CodeWorld

wall, ground, storage, box :: Picture
wall =    colored (darker 0.4 grey) (solidRectangle 1 1)
ground =  colored yellow     (solidRectangle 1 1)
storage = solidCircle 0.3 & ground
box =     colored brown      (solidRectangle 1 1)

data Tile = Wall | Ground | Storage | Box | Blank

drawTile :: Tile -> Picture
drawTile Wall    = wall
drawTile Ground  = ground
drawTile Storage = storage
drawTile Box     = box
drawTile Blank   = blank

pictureOfMaze :: Picture
pictureOfMaze = draw21times (\r -> draw21times (\c -> drawTileAt (C r c)))

draw21times :: (Integer -> Picture) -> Picture
draw21times something = go (-10)
  where
    go :: Integer -> Picture
    go 11 = blank
    go n  = something n & go (n+1)

drawTileAt :: Coord -> Picture
drawTileAt (C r c) = translated (fromIntegral r) (fromIntegral c) (drawTile (maze (C r c)))
         
maze :: Coord -> Tile 
maze (C x y)
  | abs x > 4  || abs y > 4  = Blank
  | abs x == 4 || abs y == 4 = Wall
  | x ==  2 && y <= 0        = Wall
  | x ==  3 && y <= 0        = Storage
  | x >= -2 && y == 0        = Box
  | otherwise                = Ground

data Direction = R | U | L | D

data Coord = C Integer Integer


initialCoord :: Coord
initialCoord = C 0 0

atCoord :: Coord -> Picture -> Picture
atCoord (C x y) pic = translated (fromIntegral x) (fromIntegral y) pic

adjacentCoord :: Direction -> Coord -> Coord
adjacentCoord R (C x y) = C (x+1) y
adjacentCoord U (C x y) = C  x   (y+1)
adjacentCoord L (C x y) = C (x-1) y
adjacentCoord D (C x y) = C  x   (y-1)

handleTime :: Double -> Coord -> Coord
handleTime _ c = c

handleEvent :: Event -> Coord -> Coord
handleEvent (KeyPress key) c
    | key == "Right" = move R c
    | key == "Up"    = move U c
    | key == "Left"  = move L c
    | key == "Down"  = move D c
    | otherwise      = c
handleEvent _ c      = c

move :: Direction -> Coord -> Coord
move d c = if (isOK (maze to)) 
  then to 
  else c 
  where to = adjacentCoord d c

isOK :: Tile -> Bool
isOK Ground = True
isOK Storage = True
isOK _ = False

player :: Picture
player = colored pink (solidCircle 0.5)

drawState :: Coord -> Picture
drawState c = (atCoord c player) & pictureOfMaze

exercise1 :: IO ()
exercise1 = activityOf initialCoord handleEvent drawState

main :: IO ()
main = exercise1
