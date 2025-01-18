import { HttpMethod, sendRequest } from "@/utils/axios";
import { catchRequestError } from "@/utils/functions";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

// تعریف نوع داده‌های کانتکست
interface DashboardContextType {
    profile: any;
    loading: boolean;
    sessions: any;
}

// مقدار پیش‌فرض کانتکست
const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

// کامپوننت ارائه‌دهنده DashboardContext
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [profile, setProfile] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [sessions, setSessions] = useState<any>();

    useEffect(() => {
        setLoading(true);
        sendRequest("users/user/getProfile", HttpMethod.POST)
            .then((res) => {
                setProfile(res.data.data.user);
            })
            .catch((err) => catchRequestError(err))
            .finally(() => setLoading(false));
        sendRequest("sessions/guest/getAll", HttpMethod.POST, {
            session_name: "",
            page: 1,
            count: 100,
        })
            .then((res) => {
                setSessions(res.data.data.sessions);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <DashboardContext.Provider value={{ profile, loading, sessions }}>
            {children}
        </DashboardContext.Provider>
    );
};

// هوک برای استفاده از DashboardContext
export const useDashboard = (): DashboardContextType => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard باید درون DashboardProvider استفاده شود");
    }
    return context;
};
