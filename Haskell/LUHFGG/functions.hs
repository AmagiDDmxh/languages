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

-- quicksort example grap from: http://learnyouahaskell.com/recursion#quick-sort
-- TODO: Why is this quicksort works when, items in list like this [3, 2, 1]
-- quicksort [3, 2, 1], in this case, smaller sort whould be a infinity call
-- since [a | a <- [3,2,1], a <= 3] == [3,2,1]
quicksort :: (Ord a) => [a] -> [a]  
quicksort [] = []  
quicksort (x:xs) =   
    let smallerSorted = quicksort [a | a <- xs, a <= x]  
        biggerSorted  = quicksort [a | a <- xs, a > x]  
    in  smallerSorted ++ [x] ++ biggerSorted 

-- Higher order function
zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys  

-- zipWith' (zipWith' (*)) [[1,2,3],[3,5,6],[2,3,4]] [[3,2,2],[3,4,5],[5,4,3]]  

applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)

flip' :: (b -> a -> c) -> a -> b -> c
flip' f x y = f y x

map' :: (a -> b) -> [a] -> [b]
map' _ [] = []
map' f (x:xs) = f x : map' f xs

filter' _ [] = []
filter' p (x:xs)
  | p x       = x : rest
  | otherwise = rest
  where rest = filter' p xs

aNot b
  | b = False
  | otherwise = True

not' :: (a -> Bool) -> a -> Bool
not' f x = aNot (f x)

-- Quicksort by filter
quicksort' [] = []
quicksort' (x:xs) =
  let smallerSorted = quicksort' (filter' (<= x) xs)
      biggerSorted  = quicksort' (filter' (not' (<= x)) xs)
  in smallerSorted ++ [x] ++ biggerSorted

divisibles n = (filter' p [100000, 99999..])
  where p x = x `mod` n == 0

largestDivisible :: (Integral a) => a -> a
largestDivisible n = head (divisibles n)

chain 1 = [1]
chain x
  | even x = x : chain (x `div` 2)
  | odd  x = x : chain (x*3 + 1)


argApplyTo x = let listOfFuncs = [(+2), (*2), (^2), (/2), sqrt] 
  in map ($ x) listOfFuncs 

-- Different style of making use of composite and lazy load
oddSquareSum :: Integer
-- oddSquareSum = sum . takeWhile (<100000) . filter odd . map (^2) $ [1..]

oddSquareSum =
  let oddSquare  = filter odd $ map (^2) [1..]
      belowLimit = takeWhile (<100000) oddSquare
  in sum belowLimit

