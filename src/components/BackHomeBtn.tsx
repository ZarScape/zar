import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackHomeBtn = () => {
  return (
    <Link to="/" className="back-home-btn group">
      <span className="back-home-icon group-hover:-translate-x-1 transition-transform" aria-hidden="true">
        <ArrowLeft className="w-4 h-4" />
      </span>
      <span>Back to Home</span>
    </Link>
  );
};

export default BackHomeBtn;
