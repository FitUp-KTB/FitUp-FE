import { CaptionProps } from "react-day-picker"

export type Props = CaptionProps & {setMonth: (month: Date) => void}
export function CalendarDropdownCaption({ displayMonth, setMonth }: Props) {
  const year = displayMonth.getFullYear()
  const month = displayMonth.getMonth()

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i)
  const months = Array.from({ length: 12 }, (_, i) => i)

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value)
    setMonth(new Date(newYear, month))
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(e.target.value)
    setMonth(new Date(year, newMonth))
  }

  return (
    <div className="flex gap-2 justify-center items-center">
      <select
        value={year}
        onChange={handleYearChange}
        className="border rounded px-2 py-1 text-sm"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}년
          </option>
        ))}
      </select>
      <select
        value={month}
        onChange={handleMonthChange}
        className="border rounded px-2 py-1 text-sm"
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m + 1}월
          </option>
        ))}
      </select>
    </div>
  )
}
