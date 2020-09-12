-- Arithmetics

seventeen = 15 + 2
a49 = 15 + 2

fortyNineHundreds = 49 * 100
a4900 = 49 * 100

fourHundredNinety = 5300 - 400
a490 = 5300 - 400

notEqual1 = 5 /= 4
notEqual2 = "Hello" /= "Hi"

doubleMe x = x + x

amagi'DDmxh = "Hey its me, Amagi'ddmxh!->"

alist = [1..5]
blist = [5,4..1]
alist' = reverse blist
concatenateLinkedList = [1] ++ [2,3,4]
concatenateString = "hello" ++ " " ++ "world"  
concatenateChars = ['a', 'm'] ++ ['a', 'g', 'i']

-- Cons operator
consList = "A" : ["B", "C", "D"]
consNumber = 2 : [1, 0]
consChar = 'c' : "ba"

-- Indexing
c = "abc" !! 2
-- Check this
5 = [1,5] !! 1

one = head alist
twoTo5 = tail alist
anotherOne = last blist
noOneCan = init blist

-- It would go inifinite
-- theInifinite = [1..]

tenCircle = take 10 (cycle [1,2,3])
tripleLOL = take 11 (cycle "LOL ")
