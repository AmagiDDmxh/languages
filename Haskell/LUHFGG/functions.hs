lucky :: (Integral a) => a -> String
lucky 7 = "Lucky number seven!"
lucky _ = "Lucky number seven!"

charName :: Char -> String  
charName 'a' = "Albert"  
charName 'b' = "Broseph"  
charName 'c' = "Cecil"  
-- Comment the below one to see the non-exhaustive error
-- charName _ = "Nothing match"

maximum' :: (Ord a) => [a] -> a
maximum' [] = error "maximum of empty list"
maximum' [x] = x
maximum' (x:xs) = max x (maximum' xs)

replicate' :: (Integral i, Ord n) => i -> n -> [n]
replicate' n x
  | n <= 0 = []
  | otherwise = x:replicate' (n-1) x
  
repeat' :: (Integral i) => i -> [i]
repeat' n = n:repeat' n 

take' :: (Integral i, Ord i) => i -> [a] -> [a]
take' n _
    | n <= 0   = []
take' _ []     = []
take' n (x:xs) = x : take' (n-1) xs

reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

zip' :: [a] -> [b] -> [(a,b)]
zip' _ [] = []
zip' [] _ = []
zip' (x:xs) (y:ys) = (x,y):zip' xs ys

elem' :: (Eq a) => a -> [a] -> Bool
elem' a [x] = a == x
elem' a (x:xs)
  | a == x    = True
  | otherwise = a `elem'` xs

quicksort :: (Ord a) => [a] -> [a]  
quicksort [] = []  
quicksort (x:xs) =   
    let smallerSorted = quicksort [a | a <- xs, a <= x]  
        biggerSorted  = quicksort [a | a <- xs, a > x]  
    in  smallerSorted ++ [x] ++ biggerSorted 
