import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import UserPage from '../containers/user/UserPage';
import AgreementPage from '../containers/agreement/AgreementPage';
import SupervisorManagement from '../containers/supervisor/SupervisorManagementPage';
import ThesisListPage from '../containers/thesis/ThesisListPage';
import AssesmentOfTheses from '../containers/thesis/AssesmentOfTheses';
import ThesisManage from '../containers/thesis/ThesisManagePage';
import ThesisStatistics from '../containers/thesis/ThesisStatisticsPage';
import CouncilmeetingManage from '../containers/councilmeeting/CouncilmeetingManagePage';
import CouncilmeetingView from '../containers/councilmeeting/CouncilmeetingViewPage';
import EmailDraftPage from '../containers/email/EmailDraftPage';

export const paths = {
    home: { path: '/', component: UserPage, navText: 'Homepage' },
    agreement: { path: '/agreement', component: AgreementPage, navText: 'Agreement' },
    theses: { path: '/theses', component: ThesisListPage, navText: 'Thesis List' },
    supervisorManagement: { path: '/supervisorManagement', component: SupervisorManagement, navText: 'Supervisor management' },
    thesisView: { path: '/thesis/:id', component: ThesisManage },
    thesis: { path: '/thesis', component: ThesisManage, navText: 'New thesis' },
    assesment: { path: '/assesment', component: AssesmentOfTheses, navText: 'Assesment of theses' },
    councilMeeting: { path: '/councilmeeting/:id', component: CouncilmeetingView, navText: 'Next councilmeeting' },
    councilMeetings: { path: '/councilmeetings', component: CouncilmeetingManage, navText: 'Councilmeetings' },
    emailDrafts: { path: '/emaildrafts', component: EmailDraftPage, navText: 'Email drafts' },
    statistics: { path: '/stats', component: ThesisStatistics, navText: 'Statistics' }
}

export default () => {
    return (
        <Switch>
            {Object.keys(paths).map((key, index) => <Route key={index} exact path={paths[key].path} component={paths[key].component} />)}
        </Switch>
    )
}