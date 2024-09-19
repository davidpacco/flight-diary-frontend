import { DiaryEntry } from "../types"

interface Props {
  diaries: DiaryEntry[]
}

export function DiaryEntries({ diaries }: Props) {
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3 key={diary.id}>{diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Wether: {diary.weather}</p>
        </div>
      ))}
    </div>
  )
}
