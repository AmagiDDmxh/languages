main = interact wordCount
  where
    wordCount input =
      show
        ( length
            -- (lines input)
            -- (words input)
            input
        )
        ++ "\n"