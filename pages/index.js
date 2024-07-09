import { Toolbar } from "@/components/toolbar";
import styles from "@/styles/Home.module.css";

export const Home = ({ articles }) => {
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>NEWS</h1>
        <h3>Your one stop for shop the latest news article</h3>
        <div className={styles.newsArticles}>
          {articles.map((article, index) => (
            <div key={index} className={styles.newsPost}>
              {!!article.urlToImage && <img src={article.urlToImage} />}
              <h1 onClick={() => (window.location.href = article.url)}>
                {article.title}
              </h1>
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const apiResponse2 = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=7afd29de617e499097960168c71e03f6`
  );

  const apiJson = await apiResponse2.json();

  const { articles } = apiJson;

  return {
    props: { articles },
  };
};
export default Home;
