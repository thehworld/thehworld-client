import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Hi</h5>
          <h1>Welcome To The H World</h1>
          <p style={{
            textAlign: 'justify',
            textJustify: 'inter-word'
          }}>
          The story of our revolutionary hair styling product <b>The H World</b> began with a concern close to my heart – my brother's sudden and alarming hair loss at the young age of 25. This was a cause for worry because my brother had always been meticulous about his diet and lifestyle. He followed a healthy routine, exercised regularly, and maintained a balanced diet. It perplexed us that despite his efforts, he was losing his hair rapidly.<br></br><br></br>

One day, while observing his daily grooming routine, I noticed that he used an excessive amount of chemical-laden hair products. It struck me that these products might be the culprits behind his hair loss. This revelation prompted me to delve deeper into the issue. I began my research by scouring the internet, and what I found was unsettling – early-age baldness was on the rise, and many young men like my brother were grappling with the same problem.<br></br><br></br>

The desire to look good has always been a significant aspect of our lives, but it shouldn't come at the cost of our health. Determined to find a solution, I embarked on a journey to seek alternative remedies. I started meeting various practitioners, including Siddha experts and Yoga gurus, who held the key to natural well-being. They shared their knowledge and techniques, which set the foundation for our quest to create something unique.<br></br><br></br>

Over the course of six years, I immersed myself in extensive research. I studied ancient texts, experimented with natural ingredients, and consulted with experts from various holistic disciplines. It was a challenging and rewarding journey filled with countless trials and errors.<br></br><br></br>

Finally, after years of relentless dedication and hard work, we emerged with a groundbreaking product for hair styling <b>The H World's Hair Products</b>. Our innovation was a chemical-free hair gel that harnessed the power of natural ingredients. This hair gel not only offered a styling solution but also nourished and protected the hair without any harmful chemicals.

However, there was one trade-off due to our commitment to purity and naturalness – the shelf life of our product was limited to just five months. But we believed that this was a small price to pay for a chemical-free alternative that could help people like my brother regain their confidence and maintain their hair health.

Our revolutionary hair gel became a symbol of our commitment to holistic well-being and our determination to address the rising issue of early-age baldness. It was a product born out of love and concern, and it marked the beginning of a journey to promote natural and healthy grooming choices for everyone.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
