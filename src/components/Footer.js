import React from 'react'
import '../styles/footer.css'

const Footer = () => {
  return (
    <main className="footer-main">
      <p style={{ color: 'white' }}>
        © {new Date().getFullYear()} <span>ASIL Online Store</span>. All Rights
        Reserved
      </p>
    </main>
  )
}

export default Footer
