import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div style={{fontSize: "16px"}}>
        Click on Next JS logo to open assignment page
      </div>

      <div className={styles.center}>
        <a href="/1" >
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        </a>
      </div>
    </main>
  )
}
