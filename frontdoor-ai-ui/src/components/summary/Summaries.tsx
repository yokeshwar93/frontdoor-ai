import {Button, Chip, MenuItem, Paper, Select, Stack, styled, Typography} from "@mui/material";
import { StyledSummaryDiv } from "./SummariesStyles";
import {FILTER_OPTIONS, SORT_OPTIONS} from "../../util/constants";
import {useContext} from "react";
import {AppContext} from "../../containers/AppContainer";

type Props = {
    summaries: Summary[]
    saveSummary: (summary: Summary) => void;
}
export type Summary = {
    text: string,
    summary: string,
    name?: string,
    userId: string,
    tags?: string[],

    _id?: string
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
}));
const FilterItems = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
}));
const Summaries = ({summaries, saveSummary} : Props) => {
    const context = useContext(AppContext)
    const handleSave = (summary : Summary) => {
        saveSummary({...summary, userId: context?.userInfo.id || ''})
    }
    return (
        <>
            {summaries.length > 0 && <Stack sx={{ marginTop: '2%', marginBottom: '1%' }} direction="row" spacing={2}>
            <FilterItems>
                <span>Sort By:</span>
                <Select
                    sx={{color: 'white', borderColor: 'white'}}
                    notched={false}
                >
                    {SORT_OPTIONS.map((option) => <MenuItem key={option.value}
                        value={option.value}>{option.label}</MenuItem>)}
                </Select>
            </FilterItems>
            <FilterItems>
                <span>Filter By:</span>
                <Select
                    sx={{color: 'white', borderColor: 'white'}}
                    notched={false}
                >
                    {FILTER_OPTIONS.map((option) => <MenuItem key={option.value}
                        value={option.value}>{option.label}</MenuItem>)}
                </Select>
            </FilterItems>
        </Stack>}
        <StyledSummaryDiv>

            {summaries.length > 0 ? <Stack sx={{height: '600px', marginTop: '2%'}} spacing={2}>
                {summaries.map((summary : Summary) => (
                    <Item key={summary._id}>
                        <Typography color="#b667f1">{summary.name}
                            {!summary.userId && <Button onClick={() => handleSave(summary)} color="secondary">Save</Button>}
                        </Typography>
                        <Typography color="yellow">{summary.text}</Typography>
                        <Typography>{summary.summary}</Typography>
                        <Stack direction="row" spacing={1}>
                            {summary.tags?.map((tag: string) => <Chip key={tag} sx={{color: 'white'}} variant="outlined" label={tag} />)}

                        </Stack>
                    </Item>
                    ))}
            </Stack> :
                <Typography variant='h4'>No Summaries found.Please login or highlight text to get summary</Typography>}
        </StyledSummaryDiv>
        </>
    )
}
export default Summaries;