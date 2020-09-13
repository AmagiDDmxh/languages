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
bmiTell :: (RealFloat a) => a -> a -> String  
bmiTell weight height  
    | bmi <= skinny = "You're underweight, you emo, you!"  
    | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"  
    | bmi <= fat    = "You're fat! Lose some weight, fatty!"  
    | otherwise     = "You're a whale, congratulations!" 
    where bmi = weight / height ^ 2
          (skinny, normal, fat) = (18.5, 25.0, 30.0)

initials :: String -> String -> String
initials firstname lastname = [f] ++ "." ++ [l] ++ "."
      where (f : _) = firstname
            (l : _) = lastname

max' :: (Ord a) => a -> a -> a
max' a b | a > b = a | otherwise = b

compare' :: (Ord a) => a -> a -> Ordering
a `compare'` b
  | a > b     = GT
  | a < b     = LT
  | otherwise = EQ

