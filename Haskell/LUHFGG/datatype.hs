-- Typeclass and Type

factorial :: Integer -> Integer  
factorial n = product [1..n]  

circumference :: Float -> Float  
circumference r = 2 * pi * r  

circumference' :: Double -> Double
circumference' r = 2 * pi * r

-- Typeclass Show 
-- all type except function are part of Show
strNum = show 123

-- Typeclass Read

-- Typeclass Enum
-- () Bool Char Ordering Int Integer Float Double
-- Use of succ and pred

-- Typeclass Bounded
minimalInt = minBound :: Int

-- Typeclass Num
numOne = fromIntegral 1

-- Typeclass Eq
fiveEqToFive = 5 == 5
fiveNotEqToFive = 5 /= 5

-- Typeclass Ord
orderingLt = 4 `compare` 5
