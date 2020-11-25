lastButOne :: [a] -> a
-- lastButOne (x : xs) = if null (tail xs) then x else lastButOne xs 
lastButOne [x, _] = x
lastButOne xs = lastButOne (tail xs)
