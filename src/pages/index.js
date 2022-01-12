import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import dateformat from "dateformat"

export default function Home({data, error}) {
  
  const router = useRouter()

  const handleNavigation = ({slug})=> {
    router.push("/"+slug)
  }

  return (
    <div>
      <Head>
        <title>
          Campaign Manager: | Home
        </title>
        <meta name="description" content="A site for campaigns"/>
      </Head>
      <main className={styles.main}>
        <div className={styles.innerContent}>
          <h1>Available campaigns</h1>
          {error&&<p>{error}</p>}

          {data.map((element)=> <div key={element.slug}>
            <div className={styles.item} onClick={()=>handleNavigation(element)}>
              
              <div className={styles.leftItems}>
                <Image className={styles.img} src={"https://res.cloudinary.com/dfcshdnfp/"+element.logo} height={500} width={500} alt="Campaign Banner" />
              </div>
              <div className={styles.rightItems}>
                <Link href={"/"+element.slug}>
                  <a>{element.title}</a>
                </Link>
                <small className={styles.dateStyle}>{dateformat(new Date(element.created_at),"dddd, mmmm, dS, yyyy, h:MM:ss TT")}</small>
                <p>{element.description}</p>
              </div>
            </div>
          </div>)}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps(){
  let data = []
  let error = null;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/`)
    data = await response.json()
  } catch (err) {
    console.log(`err:>>`, err);
    error = err.message?err.message:"Something went wrong"
  }

  return{
    props:{
      data,
      error,
    }
  }

}