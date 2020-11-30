data Shape = Circle Float Float Float | Rectangle Float Float Float Float

surface :: Shape -> Float
surface (Circle _ _ r) = r^2 * pi
surface (Rectangle x1 x2 y1 y2) = abs (x2 - x1) * abs (y2 - y1)

