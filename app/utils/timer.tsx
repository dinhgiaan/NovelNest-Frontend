'use client'

import { useState, useEffect, useCallback, memo } from 'react';

interface TimeUnitProps {
      value: number;
      label: string;
}

// Tách thành component con để tránh re-render không cần thiết
const TimeUnit: React.FC<TimeUnitProps> = memo(({ value, label }) => (
      <div className="flex flex-col items-center w-12 py-1 bg-blue-100 rounded-2xl shadow-xl hover:bg-blue-200 transition-colors duration-300">
            <p className="text-xl font-semibold text-blue-800">{value}</p>
            <p className="text-xs text-gray-600">{label}</p>
      </div>
));

TimeUnit.displayName = 'TimeUnit';

const Timer = () => {
      const targetDate: Date = new Date(2025, 0, 29, 0, 0, 0);

      const [days, setDays] = useState<number>(0);
      const [hours, setHours] = useState<number>(0);
      const [minutes, setMinutes] = useState<number>(0);
      const [seconds, setSeconds] = useState<number>(0);

      const calculateTimeLeft = useCallback((): void => {
            const now: Date = new Date();
            const timeDifference: number = targetDate.getTime() - now.getTime();

            if (timeDifference <= 0) {
                  setDays(0);
                  setHours(0);
                  setMinutes(0);
                  setSeconds(0);
                  return;
            }

            const daysLeft: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hoursLeft: number = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft: number = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft: number = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setDays(daysLeft);
            setHours(hoursLeft);
            setMinutes(minutesLeft);
            setSeconds(secondsLeft);
      }, []);

      useEffect(() => {
            calculateTimeLeft();
            const intervalId: NodeJS.Timeout = setInterval(calculateTimeLeft, 1000);

            return () => clearInterval(intervalId);
      }, [calculateTimeLeft]);

      return (
            <div className="flex justify-start items-center space-x-8">
                  <TimeUnit value={days} label="Ngày" />
                  <TimeUnit value={hours} label="Giờ" />
                  <TimeUnit value={minutes} label="Phút" />
                  <TimeUnit value={seconds} label="Giây" />
            </div>
      );
};

export default Timer