
import { Card, Flex, Grid, SimpleGrid } from '@mantine/core';
import { Competitor, GameData } from '../../constants/customTypes';
import { ReactNode } from 'react';

interface LiveGameScoreProps {
  gameData: GameData
}

function TeamLogo({ abbreviation = '' }: { abbreviation?: string }): ReactNode {
  return <img width={36} src={"../images/teams/" + abbreviation + ".png"}></img>
}

function GameStatus({ gameData }: LiveGameScoreProps) {
  let date = new Date(gameData.date).toLocaleString("en-US", { weekday: "short" })
  let time = new Date(gameData.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  switch (gameData.status.type.name) {
    case "STATUS_IN_PROGRESS":
      return <>
        <span>{gameData.status.type.detail.replace(" - ", "<br/>").replace(" Quarter", "")}</span>
        <span>{gameData.status.displayClock}</span>
      </>
    case "STATUS_HALFTIME":
      return <span>Halftime</span>
    case "STATUS_SUSPENDED":
      return <span>Suspended</span>
    case "STATUS_END_PERIOD":
      return <span>{gameData.status.type.detail.replace(" of ", "<br/>").replace(" Quarter", "")}</span>
    case "STATUS_FINAL":
      return <span>Final</span>
    case "STATUS_SCHEDULED":
      return <>
        <span>{date}</span>
        <span>{time}</span>
      </>
    default:
      <></>
  }
}

function showScore(status: string) {
  return status !== 'STATUS_SCHEDULED'
}

export default function LiveGameScore({ gameData }: LiveGameScoreProps): React.ReactElement {
  const homeTeam = gameData.competitions[0].competitors.find((team: Competitor) => team.homeAway === 'home')
  const awayTeam = gameData.competitions[0].competitors.find((team: Competitor) => team.homeAway === 'away')

  return <Card padding='md' shadow='xs' withBorder bg='white' style={{ height: '100%' }}>
    <Flex style={{ width: '100%', height: '100%' }}>
      <Flex direction='column' style={{ width: '70%' }}>
        <Flex align='flex-start'>
          <TeamLogo abbreviation={awayTeam?.team.abbreviation} />
          <Flex justify='space-between' style={{ padding: '2px 12px', width: '100%' }}>
            <span>{awayTeam?.team.shortDisplayName}</span>
            {showScore(gameData.status.type.name) && <span>{awayTeam?.score}</span>}
          </Flex>
        </Flex>
        <Flex align='flex-start'>
          <TeamLogo abbreviation={homeTeam?.team.abbreviation} />
          <Flex justify='space-between' style={{ padding: '2px 12px', width: '100%' }}>
            <span>{homeTeam?.team.shortDisplayName}</span>
            {showScore(gameData.status.type.name) && <span>{homeTeam?.score}</span>}
          </Flex>
        </Flex>
      </Flex>
      <Flex direction='column' justify='center' align='center' style={{ width: '30%', height: '100%' }}>
        <GameStatus gameData={gameData} />
      </Flex>
    </Flex>
  </Card >


}