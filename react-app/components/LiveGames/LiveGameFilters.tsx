
import { Button, Group, Flex } from '@mantine/core';

export default function LiveGameFilters(): React.ReactElement {


  return (
    <Flex justify="flex-end" style={{ width: '100%' }}>
      <Group>
        <Button>Ongoing Games</Button>
        <Button>Completed Games</Button>
        <Button>{`>10% Scorigami Chance`}</Button>
        <Button>Select All</Button>
        <Button>Deselect All</Button>
      </Group>
    </Flex>
  );
}