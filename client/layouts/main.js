import Header from '../components/Header';
import withData from '../lib/apollo'

export default ({ children }) => (
  <div>
    <Header />
    { children }
  </div>
);
