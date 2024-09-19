import { useEffect, useState } from "react"
import { DiaryEntry } from "./types"
import diaryService from "./services/diary"
import { DiaryEntries } from "./components/DiaryEntries"
import { DiaryForm } from "./components/DiaryForm"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    diaryService.getAll()
      .then(data => setDiaries(data))
  }, [])

  return (
    <>
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      <DiaryEntries diaries={diaries} />
    </>
  )
}

export default App
