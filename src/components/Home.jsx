import gsap from 'gsap';
import { useEffect, useRef } from 'react';
const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, baseWeight = 400, className = '') => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};
const setupTextHover = (container, type) => {
  if (!container) return;
  const letters = container.querySelectorAll('span');
  const { min, max } = FONT_WEIGHT[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    gsap.to(letter, {
      duration,
      ease: 'power2.out',
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000); // gaussian
      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) =>
      animateLetter(letter, FONT_WEIGHT[type].default)
    );
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);
};

const Home = () => {
  const title = useRef(null);
  const subTitle = useRef(null);

  useEffect(() => {
    setupTextHover(title.current, 'title');
    setupTextHover(subTitle.current, 'subtitle');
  }, []);
  return (
    <section
      style={{
        fontFamily: "'Roboto Flex', sans-serif",
        fontSize: '3rem',
        padding: '50px',
      }}
      id="home"
      className="w-full h-screen flex items-center justify-center "
    >
      <div className="content text-center">
        <p ref={subTitle} className="my-3 cursor-pointer">
          {renderText("Hey I'm Sohan! welcome to my", 'text-3xl', 100)}
        </p>
        <h1 ref={title} className="cursor-pointer">
          {renderText('portfolio', 'text-8xl italic')}
        </h1>
      </div>
    </section>
  );
};

export default Home;
