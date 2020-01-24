import VueRouter from 'vue-router';
import Journal from './components/pages/AppJournal';
import Welcome from './components/pages/Welcome';

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Welcome
        },
        {
            name: 'journal',
            path: '/journal',
            component: Journal
        }
    ],
    mode: 'history'
});
