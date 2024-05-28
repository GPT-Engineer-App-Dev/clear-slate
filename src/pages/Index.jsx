import { Container, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();

  if (isLoading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th>Venue</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map(event => (
            <Tr key={event.id}>
              <Td>{event.name}</Td>
              <Td>{event.date}</Td>
              <Td>{event.description}</Td>
              <Td>{event.venue.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Index;