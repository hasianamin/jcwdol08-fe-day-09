import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { catchPokemon, releasePokemon } from "../../redux/reducer/pokemon";
import { useDispatch, useSelector } from "react-redux";

function Details() {
  const { name } = useParams();

  const pokemonRedux = useSelector((state) => state.pokemon.pokemons);
  const dispatch = useDispatch();

  const [detailPokemon, setDetailPokemon] = useState({});

  const fetchPokemonDetail = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/pokemon/${name}`
      );
      setDetailPokemon(data);
    } catch (error) {
      console.log(error);
    }
  }, [name]);

  useEffect(() => {
    fetchPokemonDetail();
  }, [fetchPokemonDetail]);

  const handleCatchPokemon = (data) => {
    dispatch(catchPokemon(data));
  };

  const handleReleasePokemon = (data) => {
    dispatch(releasePokemon(data));
  };

  const handleCheckInventory = (data) => {
    const indexToCheck = pokemonRedux.filter((value) => {
      return value.name === data.name;
    });
    return indexToCheck.length;
  };

  return (
    <Container mt="4rem">
      <Box w="100%" h="300" border="1px" borderRadius="8px" p="1rem">
        <Flex justifyContent="center">
          <Image
            src={`${process.env.REACT_APP_IMG_URL}/${name}.jpg`}
            alt={name}
            boxSize="100px"
            objectFit="contain"
          />
        </Flex>
        <Box mb="2rem">
          <Center>
            <Text style={{ textTransform: "capitalize" }} mt=".5rem" as="b">
              Name: {name}
              <br />
              Height: {detailPokemon?.height}
              <br />
              Weight: {detailPokemon?.weight}
            </Text>
          </Center>
        </Box>
        {handleCheckInventory(detailPokemon) ? (
          <Stack>
            <Button
              colorScheme="red"
              onClick={() => handleReleasePokemon({ name })}
            >
              Release
            </Button>
          </Stack>
        ) : (
          <Stack>
            <Button
              colorScheme="teal"
              onClick={() => handleCatchPokemon({ name })}
            >
              Catch em!
            </Button>
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default Details;
