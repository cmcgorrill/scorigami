interface Team {
  shortDisplayName: string
  abbreviation: string
}
export interface Competitor {
  homeAway: string
  score: number
  team: Team
}
interface Status {
  clock: number
  period: number
  displayClock: string
  type: { name: string, detail: string }
}
export interface GameData {
  id: number
  date: string
  name: string
  shortName: string
  season: { year: number, type: number, slug: string },
  week: { 'number': number }
  competitions: { competitors: Competitor[] }[]
  status: Status
}
