import Summaries, {Summary} from "../components/summary/Summaries";
import {useContext, useEffect, useState} from "react";
import {AppContext, queryClient} from "./AppContainer";
import {useQuery} from "react-query";
import callApi from "../util/apiHelper";
import {API_ROUTES, REQUEST_METHODS} from "../util/constants";
import {Typography} from "@mui/material";
export const mockSummaries = [
    {
        text: 'The API is able to grasp the context of text and rephrase it in different ways. In this example, we create an explanation a child would understand from a longer, more sophisticated text passage. This illustrates that the API has a deep grasp of language.',
        summary:
            'This technology can understand the meaning of a text and explain it in a way that is easier to understand. It can take a complicated text and make it simpler, like explaining something to a child.',
        name: 'Sample summary',
        userId: '643f88a892dfce96270ea28a',
    },
];
const SummaryContainer = () => {
    const context = useContext(AppContext)
    const userId = context?.userInfo.id;
    const [summaries, setSummaries] = useState<Summary[]>([])
    const { isLoading, isError, data, error } = useQuery(['summaries',userId ], () => userId && callApi(`${API_ROUTES.getSummariesForUser}/${userId}`, null, REQUEST_METHODS.GET, null, null))
    useEffect(() => {
        if(data) {
            setSummaries(data)
        }
    },[data])
    useEffect(() => {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                setSummaries([request.summary,...summaries])
            }
        );
    }, [summaries]);
    const saveSummary = async (summary: Summary) => {
        await callApi(API_ROUTES.saveSummary, null, REQUEST_METHODS.POST,summary, null)
        await queryClient.invalidateQueries()
    }
    return (
        <>
            {isLoading && <Typography color="white" variant="h1">Loading...</Typography>}
            <Summaries summaries={summaries} saveSummary={saveSummary} />
        </>
    )
}
export default SummaryContainer