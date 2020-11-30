data List a = Cons a (List a) | Nil

data Maybe a = Just a | Nothing

data Tree a = Node a (Tree a) (Tree a) | Empty deriving (Show)

simpleTree = Node 3 (Node 4 Empty Empty) (Node 5 Empty Empty)

{-
   1
 2  5
3 4
 -}
upperTree = Node 1 (Node 2 (Node 3 Empty Empty) (Node 4 Empty Empty)) (Node 5 Empty Empty)

invertTree :: Tree a -> Tree a
invertTree (Node v l r) = Node v (invertTree r) (invertTree l)
invertTree Empty = Empty

pluralize :: String -> [Int] -> [String]
pluralize word = map plural
  where
    plural 0 = "no " ++ word ++ "s"
    plural 1 = "one " ++ word
    plural n = show n ++ " " ++ word ++ "s"

myLength :: [a] -> Int
myLength (_ : xs) = 1 + myLength xs
myLength _ = 0

lengthGuard :: [a] -> Int
lengthGuard (_ : xs)
  | null xs = 1
  | otherwise = 1 + lengthGuard xs

mean :: (Real a, Fractional b) => [a] -> b
mean xs = realToFrac (sum xs) / fromIntegral (length xs)
  where
    sum :: Num a => [a] -> a
    sum (x : xs) = x + sum xs
    sum _ = 0
    
palindrome :: [a] -> [a]
palindrome (x:xs) = x : palindrome xs ++ [x]
palindrome _ = []

isPalindrome :: (Eq a) => [a] -> Bool
isPalindrome [] = True
isPalindrome [_] = True
isPalindrome xs = head xs == last xs && isPalindrome (tail (init xs))
