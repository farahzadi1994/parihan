import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HttpMethod, sendRequest } from "@/utils/axios";
import Link from "next/link";
import { useDashboard } from "@/src/layout/DashboardContext";

export const CourseMenu = () => {
    const [expanded, setExpanded] = React.useState<string | false>("panel1");
    const [data, setData] = useState<any>({});
    const router = useRouter();
    const { sessions } = useDashboard();

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    function categorizeSessionsByLevel(sessions: any) {
        const sessionsByLevel: any = {};

        sessions.forEach((session: any) => {
            const level = session.session_information.session_level;

            // اگر سطح در شیء وجود نداشت، آن را به عنوان یک آرایه جدید اضافه کن
            if (!sessionsByLevel[level]) {
                sessionsByLevel[level] = [];
            }

            // جلسه را به آرایه مربوط به سطح اضافه کن
            sessionsByLevel[level].push(session);
        });
        console.log(sessionsByLevel);

        setData(sessionsByLevel);
    }

    useEffect(() => {
        if (sessions) categorizeSessionsByLevel(sessions);
    }, [sessions]);
    return (
        <Box>
            <Accordion
                dir="rtl"
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    <Typography>Basic</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        {data?.Basic?.slice()
                            .reverse()
                            .map((item: any, index: number) => (
                                <Link
                                    key={index}
                                    href={`/dashboard/courses/general-course/${item.session_id}/video`}
                                >
                                    <Typography variant="caption">
                                        {item.session_name}:{" "}
                                        {
                                            item.session_information
                                                .session_subject
                                        }
                                    </Typography>
                                </Link>
                            ))}
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                >
                    <Typography>Intermediate</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        {data?.Intermediate?.slice()
                            .reverse()
                            .map((item: any, index: number) => (
                                <Link
                                    key={index}
                                    href={`/dashboard/courses/general-course/${item.session_id}/video`}
                                >
                                    <Typography variant="caption">
                                        {item.session_name}:{" "}
                                        {
                                            item.session_information
                                                .session_subject
                                        }
                                    </Typography>
                                </Link>
                            ))}
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3d-content"
                    id="panel3d-header"
                >
                    <Typography>Upper Intermediate</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        {data?.["Upper Intermediate"]
                            ?.slice()
                            .reverse()
                            .map((item: any, index: number) => (
                                <Link
                                    key={index}
                                    href={`/dashboard/courses/general-course/${item.session_id}/video`}
                                >
                                    <Typography variant="caption">
                                        {item.session_name}:{" "}
                                        {
                                            item.session_information
                                                .session_subject
                                        }
                                    </Typography>
                                </Link>
                            ))}
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === "panelr"}
                onChange={handleChange("panelr")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3d-content"
                    id="panelrd-header"
                >
                    <Typography>Pre Advanced</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        {data?.["Pre Advanced"]
                            ?.slice()
                            .reverse()
                            .map((item: any, index: number) => (
                                <Link
                                    key={index}
                                    href={`/dashboard/courses/general-course/${item.session_id}/video`}
                                >
                                    <Typography variant="caption">
                                        {item.session_name}:{" "}
                                        {
                                            item.session_information
                                                .session_subject
                                        }
                                    </Typography>
                                </Link>
                            ))}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};
