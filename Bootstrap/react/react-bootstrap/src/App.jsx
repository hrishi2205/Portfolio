import "bootstrap/dist/css/bootstrap.min.css";
import { Stack, Button, Badge } from "react-bootstrap";

function App() {
  return (
    <>
      <h1 className="text-danger">Welcome To React</h1>
      <Stack direction="horizontal" gap={2}>
        <Button as="a" variant="primary">
          Button as link
        </Button>
        <Button as="a" variant="success">
          Button as link
        </Button>
      </Stack>
      ;
      <div>
        <h1>
          Example heading
          <Badge bg="secondary" as={Button}>
            New
          </Badge>
        </h1>
      </div>
    </>
  );
}

export default App;
