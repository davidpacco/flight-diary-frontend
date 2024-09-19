import React, { useEffect, useState } from "react"
import { DiaryEntry } from "./types"
import diaryService from "./services/diary"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    diaryService.getAll()
      .then(data => setDiaries(data))
  }, [])

  const addDiary = (e: React.SyntheticEvent) => {
    e.preventDefault()
    diaryService.addNew({ date, visibility, weather, comment })
      .then(addedDiary => setDiaries(diaries.concat(addedDiary)))

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <>
      <h2>Add New Entry</h2>

      <form onSubmit={addDiary}>
        <div>
          <label>
            Date
            <input
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Visibility
            <input
              value={visibility}
              onChange={e => setVisibility(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Weather
            <input
              value={weather}
              onChange={e => setWeather(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Comment
            <input
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Diary Entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3 key={diary.id}>{diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Wether: {diary.weather}</p>
        </div>
      ))}
    </>
  )
}

export default App
