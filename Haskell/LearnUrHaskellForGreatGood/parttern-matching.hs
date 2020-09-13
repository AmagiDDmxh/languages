sayMe :: (Integral a) => a -> String  
sayMe 1 = "One!"  
sayMe 2 = "Two!"  
sayMe 3 = "Three!"  
sayMe 4 = "Four!"  
sayMe 5 = "Five!"  
-- sayMe x = "Not between 1 and 5"  
-- Cause non-exhaustive error on other value


addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
-- addVectors a b = (fst a + fst b, snd a + snd b)
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)


tell :: (Show a) => [a] -> String  
tell [] = "The list is empty"  
tell [x] = "The list has one element: " ++ show x  
tell [x,y] = "The list has two elements: " ++ show x ++ " and " ++ show y  
tell (x:y:_) = "This list is long. The first two elements are: " ++ show x ++ " and " ++ show y  
-- tell (x:y:xs) = "This list is long. The first two elements are: " ++ show x ++ " and " ++ show y  

capital :: String -> String
capital [] = "Empty string, Whoops!"
capital all@(x:_) = "The first letter of '" ++ all ++ "' is " ++ [x]

-- Guards

