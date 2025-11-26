import TopNav from '../../components/TopNav'

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Our Services
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Professional utility services for your needs
          </p>
        </div>
      </main>
    </div>
  )
}

export default ServicesPage

