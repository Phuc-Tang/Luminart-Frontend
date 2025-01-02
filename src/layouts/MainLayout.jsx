import { Header } from '../components';
import { DiscussionProvider } from '../hooks/useDiscussion';

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <DiscussionProvider>{children}</DiscussionProvider>
        </div>
    );
}

export default MainLayout;
