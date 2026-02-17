//Info om hållbar mat

import { seasonData } from "../data/seasonData";

export const Why = () => {
  return (
    <>
      <header className="header">
        <img src="/images/Carrot.jpg" alt="About us" className="hero-video" />

        <div className="hero-content">
          <h1 className="Title">Why sustainable eating?</h1>

          <div className="why-row">
            <div className="why-text">
              <p>
                Eating sustainably helps reduce environmental impact, supports
                local farmers, and encourages healthier food choices. By
                choosing seasonal ingredients, we rely less on imported food and
                energy-intensive farming methods. Small, everyday choices can
                make a big difference for the climate, biodiversity, and future
                food systems.
              </p>
              <p>
                {" "}
                Sometimes it can be difficult to know what types of foods to eat
                during each season. Below, we list some typical seasonal foods
                that fit the time of year and support sustainable eating.
              </p>
            </div>
          </div>

          <div className="season-grid">
            {seasonData.map((s) => (
              <div key={s.season} className="season-box">
                <h3>{s.season}</h3>
                <p className="season-months">{s.months}</p>

                <div className="season-categories">
                  {s.categories.map((cat) => (
                    <div key={cat.label} className="season-category">
                      <h4>{cat.label}</h4>
                      <ul>
                        {cat.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="why-card">
            <p>
              Want to learn more about sustainable food practices? Visit the
              Naturskyddsföreningen.
            </p>
            <a
              className="visit-link"
              href="https://www.naturskyddsforeningen.se/artiklar/valj-bland-frukt-och-gronsaker-i-sasong/"
              target="_blank"
            >
              Visit
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
