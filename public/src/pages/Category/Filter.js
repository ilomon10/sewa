import { useEffect, useState } from "react";
import { Button, Flex, SelectMenu, Text } from "@primer/components";
import { ChevronUpIcon, ChevronDownIcon } from "@primer/styled-octicons";

const Filter = ({ fields, onChange = () => { } }) => {
  const [query, setQuery] = useState({});

  useEffect(() => {
    onChange(query);
  }, [query]);

  return (
    <>
      {Object.keys(fields).map((key) => {
        const field = fields[key];
        return (
          <SelectMenu mr={2} key={key}>
            <Button as="summary">
              <Flex alignItems="center">
                <Text>{field.name}</Text>
                {query[key] > 0 &&
                  <ChevronUpIcon ml={2} />}
                {query[key] < 0 &&
                  <ChevronDownIcon ml={2} />}
              </Flex>
            </Button>
            <SelectMenu.Modal direction="se" width={150}>
              {field.options.map(({ name, value }) => (
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