import { Link } from 'react-router-dom';
import { concepts } from '../data/concepts';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="metallic-navbar">
      <h2 className="navbar-title">Concepts</h2>
      <ul className="nav-menu">
        {concepts.map((concept) => (
          <li key={concept.id} className="nav-item">
            <Link
              to={`/concept/${concept.id}`}
              className="nav-link"
            >
              {concept.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;