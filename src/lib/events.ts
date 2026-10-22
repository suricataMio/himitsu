/**
 * 家庭事件管理模块
 * 
 * 负责管理和计算家庭重要事件，包括：
 * - 纪念日计算（在一起天数、周年数）
 * - 生日管理（支持公历和农历生日转换）
 * - 即将到来的事件获取
 */
import { Lunar, Solar } from 'lunar-javascript';
import { addYears, differenceInDays, isAfter, isSameDay, parseISO, setYear, startOfDay } from 'date-fns';

/** 事件类型：纪念日 | 生日 | 节假日 */
export type EventType = 'anniversary' | 'birthday' | 'holiday';

/** 家庭事件接口定义 */
export interface FamilyEvent {
  /** 事件唯一标识 */
  id: string;
  /** 事件日期 */
  date: Date;
  /** 事件标题 */
  title: string;
  /** 事件类型 */
  type: EventType;
  /** 事件描述（可选） */
  description?: string;
  /** 是否为农历日期（可选） */
  isLunar?: boolean;
}

/** 公会成立日期（纪念日起始日） */
const START_DATE = '2021-01-01';

/**
 * 计算在一起的天数
 * @returns 从纪念日到今天的总天数（包含今天）
 */
export function getDaysTogether(): number {
  const start = parseISO(START_DATE);
  const now = new Date();
  return differenceInDays(now, start) + 1; // 包含今天
}

/**
 * 计算周年数
 * @param targetDate - 目标日期
 * @returns 从纪念日到目标日期的周年数
 */
export function getAnniversaryCount(targetDate: Date): number {
    const start = parseISO(START_DATE);
    const startYear = start.getFullYear();
    const targetYear = targetDate.getFullYear();
    return targetYear - startYear;
}

/**
 * 获取指定年份的所有家庭事件
 * @param year - 年份
 * @returns 按日期排序的事件数组
 */
export function getEventsForYear(year: number): FamilyEvent[] {
  const events: FamilyEvent[] = [];

  // 1. 周年纪念日（每年1月1日）
  const anniversaryDate = new Date(year, 0, 1); // 月份从0开始
  events.push({
    id: `anniversary-${year}`,
    date: anniversaryDate,
    title: `在一起 ${year - 2021} 周年纪念日`,
    type: 'anniversary',
    description: '这一天我们在一起啦！',
    isLunar: false,
  });

  // 2. 晓倩生日（公历 08-17）
  const xiaoqianBday = new Date(year, 7, 17); // 8月是索引7
  events.push({
    id: `bday-xiaoqian-${year}`,
    date: xiaoqianBday,
    title: '晓倩的生日',
    type: 'birthday',
    description: '祝晓倩生日快乐！',
    isLunar: false,
  });

  // 3. Aokiba 生日（农历 09-25）
  // 需要将农历日期转换为对应年份的公历日期
  try {
      /**
       * 检查农历年份对应的公历日期是否在目标年份内
       * 因为农历日期可能跨年，需要检查前后年份
       */
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
      
      // 检查前一年、当年、后一年的农历日期
      checkLunarYear(year - 1);
      checkLunarYear(year);
      checkLunarYear(year + 1);
      
  } catch (e) {
      console.error("农历生日计算错误", e);
  }

  // 按日期升序排列
  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * 获取即将到来的事件
 * @param count - 返回的事件数量，默认5个
 * @returns 从今天开始即将到来的事件数组
 */
export function getUpcomingEvents(count: number = 5): FamilyEvent[] {
  const now = startOfDay(new Date());
  const currentYear = now.getFullYear();
  
  // 获取当年和下一年的事件，确保跨年时也能正确显示
  let events = [
      ...getEventsForYear(currentYear),
      ...getEventsForYear(currentYear + 1)
  ];
  
  // 过滤掉已过去的事件，保留今天及以后的事件
  events = events.filter(e => isAfter(e.date, now) || isSameDay(e.date, now));
  
  return events.slice(0, count);
}
