import { useRouter } from "next/router";
import styles from '../styles/toolbar.module.css';

export const Toolbar=()=>{
    const router=useRouter();

    return(
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>National</div>
            <div onClick={() => router.push('/feed/1')}>Tech</div>
            <div onClick={() => router.push('/eom')}>EOM</div>
            <div onClick={()=> window.location.href=''}>Twitter</div>
        </div>
    );
};