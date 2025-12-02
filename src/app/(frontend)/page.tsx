export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Welcome to Kenos Website</h1>
      <p style={{ marginTop: '1rem' }}>
        Your website is running! Visit <a href="/admin" style={{ color: 'blue', textDecoration: 'underline' }}>/admin</a> to access the CMS.
      </p>
    </main>
  )
}
