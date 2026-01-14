import { Lunar, Solar } from 'lunar-javascript';
import { addYears, differenceInDays, isAfter, isSameDay, parseISO, setYear, startOfDay } from 'date-fns';

export type EventType = 'anniversary' | 'birthday' | 'holiday';

export interface FamilyEvent {
  id: string;
  date: Date;
  title: string;
  type: EventType;
  description?: string;
  isLunar?: boolean;
}

const START_DATE = '2021-01-01'; // 纪念日

export function getDaysTogether(): number {
  const start = parseISO(START_DATE);
  const now = new Date();
  return differenceInDays(now, start) + 1; // Include today
}

export function getAnniversaryCount(targetDate: Date): number {
    const start = parseISO(START_DATE);
    const startYear = start.getFullYear();
    const targetYear = targetDate.getFullYear();
    return targetYear - startYear;
}

// Get events for a specific year
export function getEventsForYear(year: number): FamilyEvent[] {
  const events: FamilyEvent[] = [];

  // 1. Anniversary (Jan 1st)
  const anniversaryDate = new Date(year, 0, 1); // Month is 0-indexed
  events.push({
    id: `anniversary-${year}`,
    date: anniversaryDate,
    title: `在一起 ${year - 2021} 周年纪念日`,
    type: 'anniversary',
    description: '这一天我们在一起啦！',
    isLunar: false,
  });

  // 2. Xiaoqian Birthday (公历 08-17) - Swapped from Aokiba
  const xiaoqianBday = new Date(year, 7, 17); // Aug is 7
  events.push({
    id: `bday-xiaoqian-${year}`,
    date: xiaoqianBday,
    title: '晓倩的生日',
    type: 'birthday',
    description: '祝晓倩生日快乐！',
    isLunar: false,
  });

  // 3. Aokiba Birthday (农历 09-25) - Swapped from Xiaoqian
  try {
      const checkLunarYear = (lunarYear: number) => {
          const lunar = Lunar.fromYmd(lunarYear, 9, 25);
          const solar = lunar.getSolar();
          const solarDate = new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
          if (solarDate.getFullYear() === year) {
              events.push({
                  id: `bday-aokiba-${lunarYear}`,
                  date: solarDate,
                  title: 'Aokiba 的生日 (农历九月廿五)',
                  type: 'birthday',
                  description: '祝 Aokiba 生日快乐！',
                  isLunar: true,
              });
          }
      };
      
      checkLunarYear(year - 1);
      checkLunarYear(year);
      checkLunarYear(year + 1);
      
  } catch (e) {
      console.error("Error calculating lunar birthday", e);
  }

  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getUpcomingEvents(count: number = 5): FamilyEvent[] {
  const now = startOfDay(new Date());
  const currentYear = now.getFullYear();
  
  let events = [
      ...getEventsForYear(currentYear),
      ...getEventsForYear(currentYear + 1)
  ];
  
  // Filter out past events
  events = events.filter(e => isAfter(e.date, now) || isSameDay(e.date, now));
  
  return events.slice(0, count);
}
