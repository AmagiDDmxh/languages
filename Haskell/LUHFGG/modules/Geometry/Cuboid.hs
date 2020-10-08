module Geometry.Sphere
  ( volume
  , area
  ) where

volume a b c = rectangleArea a b * c

area a b c = rectangleArea a b * 2 + rectangleArea a c * 2 + rectangleArea b c * 2

rectangleArea a b = a * b
