two2the10 = [2^n | n <- [1..10]]
offVowels word = [x | x <- word, not (elem x "aeiou")]

xxs = [[1,3,5,2,3,1,2,4,5],[1,2,3,4,5,6,7,8,9],[1,2,4,2,1,6,3,1,3,2,3,6]]
evenXxs = [[x | x <- xs, even x] | xs <- xxs]
