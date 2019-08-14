import React, { useEffect, useState } from 'react'

import { identity, curry, ifElse, length, lte, pipe } from 'ramda'

import Box from './ui/Box'
import Flex from './ui/Flex'
import Input from './ui/Input'
import Text from './ui/Text'
import ThemeProvider from './ui/ThemeProvider'
import theme from './ui/theme'

import useDebounce from './shared/hooks'

const isAtLeast = curry(n =>
  pipe(
    length,
    lte(n)
  )
)

function App() {
  const [query, set] = useState('')
  const debouncedQuery = useDebounce(query, 250)

  useEffect(() => {
    ifElse(isAtLeast(3), handleSearch, identity)(debouncedQuery)
  }, [debouncedQuery])

  const handleOnChange = ({ target: { value } }) => set(value)

  const handleSearch = console.log

  return (
    <ThemeProvider theme={theme}>
      <Box m="lg">
        <Text textAlign="center">Search for articles: </Text>
        <Flex width="full" justifyContent="center" mt="md">
          <Input type="search" onChange={handleOnChange} value={query} />
        </Flex>

        {isAtLeast(1, debouncedQuery) && <Results query={debouncedQuery} />}
      </Box>
    </ThemeProvider>
  )
}

export default App
