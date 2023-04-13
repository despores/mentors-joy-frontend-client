import React from 'react';
import {Box, Grommet, Page, PageContent} from "grommet";
import {theme} from "./theme";
import PageRoutes from './components/PageRoutes';


function App() {
    return (
    <Grommet full theme={theme} background={"light-3"}>
        <Page kind="narrow">
            <PageContent>
                <Box
                    align="center" 
                    justify="center" 
                    style={{ minHeight: '94vh' }}
                    margin={{vertical: '24px'}}
                    height="100%"
                    width="650px"
                    round='20px'
                    background="white"
                    elevation='0px 4px 20px rgba(180, 180, 180, 0.25)'
                >
                <PageRoutes/>
                </Box>
            </PageContent>
        </Page>
    </Grommet>
  );
}

export default App;
