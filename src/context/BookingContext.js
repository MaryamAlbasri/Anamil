
import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import { bookings as initialBookings } from "../data/bookings";

// AI Assistance: ChatGPT helped implement shared booking state
// using React Context and localStorage for the frontend prototype.

const BookingContext = createContext(null);

const STORAGE_KEY = "anamil-shared-bookings";

function loadBookings() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch {
        // If storage is unavailable, use the initial mock data.
    }

    return initialBookings.map((booking) => ({
        ...booking,
        declineReason: booking.declineReason || "",
    }));
}

export function BookingProvider({ children }) {
    const [bookings, setBookings] = useState(loadBookings);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
        } catch {
            // Continue without persistence if storage is unavailable.
        }
    }, [bookings]);

    function updateBookingStatus(id, newStatus, declineReason = "") {
        const validStatuses = [
            "Pending",
            "Confirmed",
            "Declined",
            "Completed",
            "Cancelled",
        ];

        if (!validStatuses.includes(newStatus)) return false;

        let updated = false;

        setBookings((previous) =>
            previous.map((booking) => {
                if (booking.id !== Number(id)) return booking;

                const allowedTransitions = {
                    Pending: ["Confirmed", "Declined", "Cancelled"],
                    Confirmed: ["Completed", "Cancelled"],
                    Declined: [],
                    Completed: [],
                    Cancelled: [],
                };

                if (!allowedTransitions[booking.status]?.includes(newStatus)) {
                    return booking;
                }

                updated = true;

                return {
                    ...booking,
                    status: newStatus,
                    declineReason:
                        newStatus === "Declined" ? declineReason.trim() : "",
                };
            })
        );

        return updated;
    }

    function getBookingById(id) {
        return bookings.find((booking) => booking.id === Number(id));
    }

    return (
        <BookingContext.Provider
            value={{
                bookings,
                updateBookingStatus,
                getBookingById,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBookings() {
    const context = useContext(BookingContext);

    if (!context) {
        throw new Error("useBookings must be used within BookingProvider");
    }

    return context;
}
