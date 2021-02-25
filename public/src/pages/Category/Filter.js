import { useEffect, useState } from "react";
import { Button, Box, Flex, SelectMenu, Text, TextInput } from "@primer/components";
import { ChevronUpIcon, ChevronDownIcon, ArrowRightIcon } from "@primer/styled-octicons";

const Filter = ({ fields, onChange = () => { } }) => {
  const [query, setQuery] = useState({});

  useEffect(() => {
    onChange(query);
  }, [query]);

  return (
    <>
      {fields.map(({ key, title, options, type }) => {
        return (
          <SelectMenu mr={2} key={key}>
            <Button as="summary">
              <Flex alignItems="center">
                <Text>{title}</Text>
                {(type === "range") && query[key] &&
                  <Text ml={2}>
                    {(query[key] && query[key][options.from.key]) && options.from.parse(query[key][options.from.key])}
                    {"\u2192"}
                    {(query[key] && query[key][options.to.key]) && options.to.parse(query[key][options.to.key])}
                  </Text>}
                {(type === "select" && query[key] > 0) &&
                  <ChevronUpIcon ml={2} />}
                {(type === "select" && query[key] < 0) &&
                  <ChevronDownIcon ml={2} />}
              </Flex>
            </Button>
            <SelectMenu.Modal direction="se" width={150}>
              <SelectMenu.Header>
                {type === "range" && "Range"}
                {type === "select" && "Select"}
              </SelectMenu.Header>
              {type === "range" && (
                <Box as="form" p={2}>
                  {Object.keys(options).map((k) => {
                    let option = options[k];
                    return (<TextInput
                      key={k}
                      mb={2}
                      variant="small"
                      name={k}
                      placeholder={option.placeholder}
                      type={option.type}
                      onChange={(e) => {
                        setQuery(query => ({
                          ...query,
                          [key]: {
                            ...query[key],
                            [`${option.key}`]: Number(e.target.value)
                          }
                        }))
                      }}
                    />)
                  })}
                </Box>
              )}
              {type === "select" && options.map(({ name, value }) => (
                <SelectMenu.Item
                  as="button"
                  width="unset"
                  key={value}
                  selected={query[key] === value}
                  onClick={() => {
                    setQuery(query => ({
                      ...query,
                      [key]: value
                    }));
                  }}
                >{name}</SelectMenu.Item>
              ))}
            </SelectMenu.Modal>
          </SelectMenu>
        )
      })}

    </>
  )
}

export default Filter;