/**
 * @file components/shared/Calendar.tsx
 * @purpose A reusable calendar component used for both displaying availability and admin price management.
 */
import React, { useState, useCallback } from 'react';

const formatDateToKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

interface CalendarProps {
    dateInfo: { [key: string]: { occupied?: boolean, price?: number } };
    onDateClick: (date: Date) => void;
    isAdmin: boolean;
    checkInDate?: Date | null;
    checkOutDate?: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({ dateInfo, onDateClick, isAdmin, checkInDate, checkOutDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1));

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const getDayInfo = useCallback((day: number) => {
        const checkDate = new Date(year, month, day);
        return dateInfo[formatDateToKey(checkDate)];
    }, [dateInfo, year, month]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const monthName = currentDate.toLocaleString('it-IT', { month: 'long', year: 'numeric' });

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="border rounded-md p-2 text-center"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dayInfo = getDayInfo(day);
        const dayDate = new Date(year, month, day);
        const isDateOccupied = dayInfo?.occupied;

        const isSelected = checkInDate && checkOutDate && dayDate > checkInDate && dayDate < checkOutDate;
        const isStart = checkInDate && dayDate.getTime() === checkInDate.getTime();
        const isEnd = checkOutDate && dayDate.getTime() === checkOutDate.getTime();
        
        const isDisabled = isDateOccupied && !isAdmin;

        let dayClass = 'border rounded-md p-2 text-center text-slate-800 transition-all duration-200 relative';
        if (isDisabled) {
            dayClass += ' bg-red-600 text-white font-semibold cursor-not-allowed';
        } else if(isAdmin && isDateOccupied) {
             dayClass += ' bg-red-600 text-white font-semibold cursor-pointer hover:bg-red-700 transform hover:scale-110';
        } else if (isStart || isEnd) {
            dayClass += ' bg-teal-500 text-white font-bold transform scale-110';
        } else if (isSelected) {
            dayClass += ' bg-teal-100';
        } else {
             dayClass += ' bg-white cursor-pointer hover:bg-teal-50 transform hover:scale-110';
        }
        
        days.push(
            <div
                key={day}
                onClick={() => onDateClick(dayDate)}
                className={dayClass}
            >
                {day}
                {isAdmin && dayInfo?.price && <span className="absolute bottom-0 right-1 text-xs text-teal-700 font-bold">€{dayInfo.price}</span>}
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">&lt;</button>
                <h3 className="text-2xl font-semibold capitalize text-slate-800">{monthName}</h3>
                <button onClick={handleNextMonth} className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
                    <div key={day} className="font-bold text-center text-slate-600">{day}</div>
                ))}
                {days}
            </div>
            <div className="flex justify-center items-center mt-4 space-x-4 text-slate-700">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-white border rounded-sm mr-2"></div>
                    <span>Disponibile</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-600 rounded-sm mr-2"></div>
                    <span>Occupato</span>
                </div>
                 {isAdmin && (
                    <div className="flex items-center">
                        <div className="relative w-4 h-4 bg-white border rounded-sm mr-2">
                             <span className="absolute bottom-0 right-0 text-xs text-teal-700 font-bold -translate-x-1/2 translate-y-1/2">€</span>
                        </div>
                        <span>Prezzo Pers.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;