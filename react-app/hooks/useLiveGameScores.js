import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

const fetchLiveGames = async () => {
  const data = await fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard")
    .then((res) => {
      return res.json().then((data) => {
        const sortedliveGames = data.events.sort(function (a, b) {
          var adate = new Date(a.date).getTime();
          var bdate = new Date(b.date).getTime();
          return adate == bdate ? (a.id) - (b.id) : adate - bdate;
        });
        console.log('::sortedLiveGames', sortedliveGames)

        return sortedliveGames
      })

    })
  return data
}

export default function useLiveGameScores() {
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['liveGames'],
    queryFn: fetchLiveGames,
    refetchInterval: 30 * 1000
  })

  return { data, isLoading, isError }
}