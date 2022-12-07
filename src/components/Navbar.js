import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const POKEMON = useSelector((state) => state.pokemon.pokemons);
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to="/">Pokemon App</Link>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src="https://e7.pngegg.com/pngimages/1001/304/png-clipart-pokemon-go-poke-ball-pokemon-go-trademark-logo-thumbnail.png"
                />
              </MenuButton>
              {POKEMON?.length ? (
                <MenuList>
                  {POKEMON?.map((val, index) => {
                    return (
                      <Link to={`/details/${val?.name}`} key={index}>
                        <MenuItem>
                          <Flex gap={2} alignItems="center">
                            <Avatar
                              size="sm"
                              src={`${process.env.REACT_APP_IMG_URL}/${val.name}.jpg`}
                            />
                            <Box>{val?.name}</Box>
                          </Flex>
                        </MenuItem>
                      </Link>
                    );
                  })}
                </MenuList>
              ) : null}
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
