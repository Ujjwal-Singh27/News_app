import styles from '../../styles/feed.module.css'
import { useRouter } from 'next/router';
import { Toolbar } from '@/components/toolbar';

export const Feed = ({pageNumber, articles}) =>{
    const router = useRouter();
    // console.log(articles, pageNumber);
    return(
        <div className='pageContainer'> 
        <Toolbar/>
            <div className={styles.main}>
                {articles.map((article,index)=>(
                    <div key={index} className={styles.post}>
                        <div className={styles.image}>{!!article.urlToImage && <img src={article.urlToImage} alt={article.title}/>}</div>

                        <div><h1 onClick={()=>(window.location.href=article.url)}>{article.title}</h1>
                        <p>{article.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.paginator}>
                <div 
                    onClick={()=>{
                        if(pageNumber>1){
                            router.push(`/feed/${pageNumber-1}`).then(()=> window.scrollTo(0,0)); 
                        }
                    }}
                    className={pageNumber === 1? styles.disabled : styles.active}>
                        Previous Page
                </div>
                <div>#{pageNumber}</div>
                <div 
                    onClick={()=>{
                        if(pageNumber<5){
                            router.push(`/feed/${pageNumber+1}`).then(()=> window.scrollTo(0,0)); 
                        }
                    }}
                    className={pageNumber === 5? styles.disabled : styles.active}>
                        Next Page
                </div>
            </div>
        </div>
    )
};

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.slug;

    if(!pageNumber || pageNumber <1 || pageNumber>5){
        return{
            props:{
                articles:[],
                pageNumber:1,
            }
        }
    }

    const apiResponse =await fetch (
        // `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&page=${pageNumber}&apiKey=7afd29de617e499097960168c71e03f6`
        // `https://newsapi.org/v2/everything?q=com&sortBy=publishedAt&pageSize=5&page=${pageNumber}&apiKey=7afd29de617e499097960168c71e03f6`
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=6&page=${pageNumber}&apiKey=7afd29de617e499097960168c71e03f6`
        // `https://newsapi.org/v2/everything?q=apple&from=2023-03-23&to=2023-03-23&sortBy=popularity&pageSize=6&page=${pageNumber}&apiKey=7afd29de617e499097960168c71e03f6`
    );

    const apiJson = await apiResponse.json();

    // console.log(apiJson);
    
    const {articles}=apiJson;
    
    return{
        props:{
            articles,
            pageNumber: Number.parseInt(pageNumber)
        }
    }
};

export default Feed;
