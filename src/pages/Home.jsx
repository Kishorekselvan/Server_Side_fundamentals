import PageWrapper from '../components/PageWrapper';
import ConceptCard from '../components/ConceptCard';
import { concepts } from '../data/concepts';
import { Typewriter } from 'react-simple-typewriter';
import Sidebar from '../components/Sidebar';
import '../styles/Home.css';
const Home = () => (
  <PageWrapper>
    <div className="flex">
      {/* 📎 Sticky Sidebar - shown on lg screens only */}
      <Sidebar />

      {/* 📦 Main Content Area */}
      <div className="flex-1 p-6">
        {/* 📽 Typewriter Heading */}
        <h1 className="text-3xl font-bold mb-6 text-cyan-400">
          <Typewriter
            words={[
              'Server-Side Engineering Concepts',
              'Master the Backend 🔧',
              'React + Node.js + More',
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </h1>

        {/* 💡 Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              id={concept.title.toLowerCase().replace(/\s+/g, '')} // anchor for sidebar scroll
            >
              <ConceptCard concept={concept} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageWrapper>
);

export default Home;
