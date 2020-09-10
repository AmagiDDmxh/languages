module listComperhensions where

type List = Selist [a]
  | Tlist [[a]]

two2the10 = [2^n | n <- [1..10]]

offVowels word = [x | x <- word, not (elem x "aeiou")]


