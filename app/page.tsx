import styles from './page.module.css'

export default function Home() {
  // WebSocket URL https://slurp-dev.deno.dev/v1/socket/
  // const ws = new WebSocket('https://slurp-dev.deno.dev/v1/socket/')

  return (
    <main className={styles.main}>
      <form>
        <label htmlFor="roomcode">Roomcode</label>
        <input type="text" id="roomcode" name="roomcode" />
      </form>
    </main>
  )
}
