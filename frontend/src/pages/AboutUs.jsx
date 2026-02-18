//Om oss

export const AboutUs = () => {
  return (
    <>
      <header className="header">
        <img src="/images/aboutUs.jpg" alt="About us" className="hero-video" />

        <div className="hero-content">
          <h1 className="Title">About us</h1>
          <div className="why-text">
            <p>
              We are a couple from different backgrounds, brought together by a
              shared vision: to help people make more sustainable food choices. We
              believe that eating sustainably shouldn't feel complicated or
              overwhelming. By focusing on seasonal and locally sourced
              ingredients, we want to make it easier to understand what's in
              season and how to cook with it. Our goal is to inspire mindful
              everyday cooking through simple guidance, practical recipes, and
              thoughtful design — helping sustainability become a natural part of
              daily life.
            </p>
          </div>

          <div className="about-cards">
            <div className="about-card">
              <img
                src="/images/erik.jpg"
                alt="Erik"
                className="about-card-img"
                loading="lazy"
              />
              <div>
                <h2>Erik</h2>
                <p>
                  Erik has a background in environmental science and works as an
                  environmental specialist. He loves spending time in the
                  kitchen and discovering new recipes that support sustainable
                  eating.
                </p>
              </div>
            </div>
            <div className="about-card">
              <img
                src="/images/agnes.jpg"
                alt="Agnes"
                className="about-card-img"
                loading="lazy"
              />
              <div>
                <h2>Agnes</h2>
                <p>
                  Agnes has a background as a social worker and is currently
                  studying web and digital service development. Unlike Erik, she
                  prefers cooking to be simple and appreciates easy ways to find
                  recipes that support sustainable food choices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
