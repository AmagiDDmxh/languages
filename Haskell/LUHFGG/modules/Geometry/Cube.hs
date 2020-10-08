module Geometry.Cube
  ( volume
  -- , area
  ) where

import qualified Geometry.Cuboid as Cuboid

volume side = Cuboid.volume side side side 

-- area
