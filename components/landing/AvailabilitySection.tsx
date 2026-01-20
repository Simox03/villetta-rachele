/**
 * @file components/landing/AvailabilitySection.tsx
 * @purpose Contains the interactive calendar for checking availability and calculating prices.
 */
import React, { useState, useMemo, useRef } from 'react';
import { BookingRequest } from '../../types';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import { HIGH_SEASON_MONTHS } from '../../constants';
import Calendar from '../shared/Calendar';
import BookingSummary from '../shared/BookingSummary';
import { useOnScreen } from '../../hooks/useOnScreen';

interface AvailabilitySectionProps {
    dateInfo: { [key: string]: { occupied?: boolean, price?: number } };
    onBooking: (booking: Omit<BookingRequest, 'id' | 'submittedAt'>) => void;
    highSeasonRate: number;
    lowSeasonRate: number;
    content: typeof INITIAL_SITE_CONTENT['availability']
}

const formatDateToKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ dateInfo, onBooking, highSeasonRate, lowSeasonRate, content }) => {
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [isSummaryVisible, setIsSummaryVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');
    
    const handleDateClick = (date: Date) => {
        const dateKey = formatDateToKey(date);
        if (dateInfo[dateKey]?.occupied) return;

        if (!checkInDate || (checkInDate && checkOutDate)) {
            setCheckInDate(date);
            setCheckOutDate(null);
        } else if (date > checkInDate) {
            let isRangeOccupied = false;
            const tempDate = new Date(checkInDate);
            tempDate.setDate(tempDate.getDate() + 1);
            while(tempDate < date) {
                if (dateInfo[formatDateToKey(tempDate)]?.occupied) {
                    isRangeOccupied = true;
                    break;
                }
                tempDate.setDate(tempDate.getDate() + 1);
            }

            if (isRangeOccupied) {
                 alert("Il periodo selezionato include giorni già occupati. Scegli un altro periodo.");
                 setCheckInDate(null);
                 setCheckOutDate(null);
            } else {
                setCheckOutDate(date);
            }
        } else {
             setCheckInDate(date);
             setCheckOutDate(null);
        }
    };
    
    // FIX: Decoupled calculation to prevent ReferenceError on 'totalPrice'
    const bookingCalculation = useMemo(() => {
        if (!checkInDate || !checkOutDate) return { nights: 0, totalPrice: 0 };
        const nightsCalc = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        if (nightsCalc <= 0) return { nights: 0, totalPrice: 0 };
        
        let total = 0;
        const currentDate = new Date(checkInDate);
        for (let i = 0; i < nightsCalc; i++) {
            const dateKey = formatDateToKey(currentDate);
            const dayInfo = dateInfo[dateKey];
            let priceForNight = HIGH_SEASON_MONTHS.includes(currentDate.getMonth()) ? highSeasonRate : lowSeasonRate;
            if (dayInfo?.price) {
                priceForNight = dayInfo.price;
            }
            total += priceForNight;
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return { nights: nightsCalc, totalPrice: total };
    }, [checkInDate, checkOutDate, dateInfo, highSeasonRate, lowSeasonRate]);

    const { nights, totalPrice } = bookingCalculation;

    const handleConfirmBooking = (name: string, email: string) => {
        if (!checkInDate || !checkOutDate || nights <= 0) return;
        onBooking({ name, email, checkIn: checkInDate, checkOut: checkOutDate, nights, totalPrice });
        setCheckInDate(null);
        setCheckOutDate(null);
        setIsSummaryVisible(false);
    };
    
    const handleReset = () => {
        setCheckInDate(null);
        setCheckOutDate(null);
    }
    
    return (
      <section id="availability" className="py-20 bg-slate-50 scroll-mt-24" ref={sectionRef}>
        <div className={`container mx-auto px-6 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">{content.title}</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
            {content.description}
          </p>
          <Calendar dateInfo={dateInfo} onDateClick={handleDateClick} isAdmin={false} checkInDate={checkInDate} checkOutDate={checkOutDate}/>
           {checkInDate && (
                <div className="mt-8 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg text-left">
                    <h3 className="text-2xl font-semibold text-slate-800 mb-4">Riepilogo Selezione</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div>
                            <p><strong>Check-in:</strong> {checkInDate.toLocaleDateString('it-IT')}</p>
                            <p><strong>Check-out:</strong> {checkOutDate ? checkOutDate.toLocaleDateString('it-IT') : 'Seleziona...'}</p>
                             <button onClick={handleReset} className="text-sm text-teal-600 hover:underline mt-2">Azzera selezione</button>
                        </div>
                        {checkOutDate && nights > 0 && (
                            <div className="text-center md:text-right bg-teal-50 p-4 rounded-md">
                                <p className="text-xl font-bold">{nights} Notti</p>
                                <p className="text-3xl font-bold text-teal-600">€{totalPrice}</p>
                                <p className="text-sm text-slate-500">(media €{Math.round(totalPrice/nights)} / notte)</p>
                            </div>
                        )}
                    </div>
                     {checkOutDate && nights > 0 && (
                        <button onClick={() => setIsSummaryVisible(true)} className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            Prenota Ora
                        </button>
                     )}
                </div>
           )}
        </div>
        {isSummaryVisible && checkInDate && checkOutDate && (
            <BookingSummary 
                checkIn={checkInDate} 
                checkOut={checkOutDate} 
                nights={nights}
                totalPrice={totalPrice}
                onConfirm={handleConfirmBooking}
                onClose={() => setIsSummaryVisible(false)}
            />
        )}
      </section>
    );
};

export default AvailabilitySection;