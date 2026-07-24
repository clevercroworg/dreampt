import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const Industries = () => {
  return (
    <section className="section-space section-tint">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="section-kicker">Domain Experience</p>
          <h2 className="section-title">Industries We Serve</h2>
        </Reveal>
        <Reveal className="industry-pill-wrap mt-12">
          <Link to="/contact" className="industry-pill">Aerospace &amp; Defence</Link>
          <Link to="/contact" className="industry-pill">Automotive</Link>
          <Link to="/contact" className="industry-pill">General Engineering</Link>
          <Link to="/contact" className="industry-pill">Communication</Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Industries;
