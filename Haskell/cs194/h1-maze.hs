

maze :: Integer -> Integer -> Integer 
maze x y
  | abs x > 4  || abs y > 4  = 0
  | abs x == 4 ||  y == 4 = 1
  | x ==  2 && y <= 0        = 1
  | x ==  3 && y <= 0        = 3
  | x >= -2 && y == 0        = 4
  | otherwise                = 2

mazeResult = [maze x y | x <- [(-10)..10], y <- [(-10)..10]]
numResult = [x + y | x <- [(-10)..10], y <- [(-10)..10]]
