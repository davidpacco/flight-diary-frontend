import { useState } from "react"
import axios from "axios"
import diaryService from "../services/diary"
import { DiaryEntry } from "../types"
import { visibilityOptions, weatherOptions } from "../consts"

interface Props {
  diaries: DiaryEntry[]
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

export function DiaryForm({ diaries, setDiaries }: Props) {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [notification, setNotification] = useState('')

  const addDiary = (e: React.SyntheticEvent) => {
    e.preventDefault()
    diaryService.addNew({ date, visibility, weather, comment })
      .then(addedDiary => setDiaries(diaries.concat(addedDiary)))
      .catch(error => {
        if (axios.isAxiosError(error)) {
          setNotification(`Error: Invalid ${error.response?.data.error[0].path[0]}`)
          setTimeout(() => setNotification(''), 5000)
        }
      })

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <h2>Add New Entry</h2>

      {notification && <p style={{ color: 'red' }}>{notification}</p>}

      <form onSubmit={addDiary}>
        <div>
          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          Visibility
          {visibilityOptions.map(option => (
            <span key={option}>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value={option}
                  checked={option === visibility}
                  onChange={e => setVisibility(e.target.value)}
                />
                {option}
              </label>
            </span>
          ))}
        </div>
        <div>
          Weather
          {weatherOptions.map(option => (
            <span key={option}>
              <label>
                <input
                  type="radio"
                  name="weather"
                  value={option}
                  checked={option === weather}
                  onChange={e => setWeather(e.target.value)}
                />
                {option}
              </label>
            </span>
          ))}
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
    </div>
  )
}
