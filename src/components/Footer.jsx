export default function Footer(){
    return (
        <footer className="footer">
            <div className='footer__container'>
                <div className='footer__top'>
                    <article className="footer-section">
                        <h4>About</h4>
                        <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Careers</a></li>
                        </ul>
                    </article>
        
                    <article className="footer-section">
                        <h4>Resources</h4>
                        <ul>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Support</a></li>
                        </ul>
                    </article>
        
                    <article className="footer-section">
                        <h4>Legal</h4>
                        <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Contact</a></li>
                        </ul>
                    </article>
        
                    <article className="footer-section">
                        <h4>Connect</h4>
                        <ul>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">GitHub</a></li>
                        </ul>
                    </article>
                </div>
                <div className="footer__bottom">
                <p>&copy; 2025 FreedomInvest Encyclopedia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}