
import { Button, ButtonGroup, Flex, Grid, SimpleGrid } from '@mantine/core';
import LiveGameFilters from './LiveGameFilters';
import LiveGameScore from './LiveGameScore';
import useLiveGameScores from '../../hooks/useLiveGameScores';
import { Competitor, GameData } from '../../constants/customTypes';

export default function LiveGames(): React.ReactElement {
  const { data: liveGames, isLoading, isError } = useLiveGameScores()

  const indexIsInRange = (index: number) => {
    return index < liveGames?.length
  }

  return (
    <SimpleGrid cols={1} style={{ width: '100%' }}>
      <LiveGameFilters />
      <Grid gutter={{ base: 12, sm: 8, md: 4 }}>
        {liveGames?.map((game: GameData, index: number) => {

          return <Grid.Col span={{ base: 6, md: 4, lg: 3 }} key={index}>
            <LiveGameScore gameData={game} />
          </Grid.Col>
        })}
      </Grid>
    </SimpleGrid>
  );
}