import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Text,
  Stack,
  Button,
  Grid,
  GridItem,
  Image,
  Center,
} from "@chakra-ui/react";

function Home() {
  const [listPokemon, setListPokemon] = useState([]);
  const fetchPokemon = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/pokemon?offset=0&limit=10`
      );
      setListPokemon(data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const PokemonList = () => {
    return listPokemon?.map((pokemon, index) => {
      return (
        <GridItem
          key={index}
          w="100%"
          h="200"
          border="1px"
          borderRadius="8px"
          p="1rem"
        >
          <Image
            src={`${process.env.REACT_APP_IMG_URL}/${pokemon?.name}.jpg`}
            alt={pokemon?.name}
            boxSize="100px"
            objectFit="contain"
          />
          <Center>
            <Text style={{ textTransform: "capitalize" }} mt=".5rem" as="b">
              {pokemon?.name}
            </Text>
          </Center>
          <Link to={`/details/${pokemon?.name}`}>
            <Stack>
              <Button colorScheme="teal">Details</Button>
            </Stack>
          </Link>
        </GridItem>
      );
    });
  };

  return (
    <Container>
      <Text fontSize="4xl" mb="1rem" mt="1rem">
        Pokemon List
      </Text>
      <Grid
        templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={6}
      >
        <PokemonList />
      </Grid>
    </Container>
  );
}

export default Home;
