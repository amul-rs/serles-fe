'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Offcanvas Menu Begin */}
      <div className={`offcanvas-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
      <div className={`offcanvas-menu-wrapper ${isMenuOpen ? 'active' : ''}`}>
        <div className="offcanvas__cart">
          <div className="offcanvas__cart__links">
            <a href="#" className="search-switch">
              <Image src="/img/icon/search.png" alt="Search" width={20} height={20} />
            </a>
            <a href="#">
              <Image src="/img/icon/heart.png" alt="Wishlist" width={20} height={20} />
            </a>
          </div>
          <div className="offcanvas__cart__item">
            <a href="#">
              <Image src="/img/icon/cart.png" alt="Cart" width={20} height={20} />
              <span>0</span>
            </a>
            <div className="cart__price">Cart: <span>$0.00</span></div>
          </div>
        </div>
        <div className="offcanvas__logo">
          <Link href="/">
            <Image src="/img/logo.png" alt="Logo" width={150} height={50} />
          </Link>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div className="offcanvas__option">
          <ul>
            <li>USD <span className="arrow_carrot-down"></span>
              <ul>
                <li>EUR</li>
                <li>USD</li>
              </ul>
            </li>
            <li>ENG <span className="arrow_carrot-down"></span>
              <ul>
                <li>Spanish</li>
                <li>ENG</li>
              </ul>
            </li>
            <li><a href="#">Sign in</a> <span className="arrow_carrot-down"></span></li>
          </ul>
        </div>
      </div>
      {/* Offcanvas Menu End */}

      {/* Header Section Begin */}
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="header__top__inner">
                  <div className="header__top__left">
                    <ul>
                      <li>USD <span className="arrow_carrot-down"></span>
                        <ul>
                          <li>EUR</li>
                          <li>USD</li>
                        </ul>
                      </li>
                      <li>ENG <span className="arrow_carrot-down"></span>
                        <ul>
                          <li>Spanish</li>
                          <li>ENG</li>
                        </ul>
                      </li>
                      <li><a href="#">Sign in</a> <span className="arrow_carrot-down"></span></li>
                    </ul>
                  </div>
                  <div className="header__logo">
                    <Link href="/">
                      <Image src="/img/logo.png" alt="Logo" width={150} height={50} />
                    </Link>
                  </div>
                  <div className="header__top__right">
                    <div className="header__top__right__links">
                      <a href="#" className="search-switch">
                        <Image src="/img/icon/search.png" alt="Search" width={20} height={20} />
                      </a>
                      <a href="#">
                        <Image src="/img/icon/heart.png" alt="Wishlist" width={20} height={20} />
                      </a>
                    </div>
                    <div className="header__top__right__cart">
                      <a href="#">
                        <Image src="/img/icon/cart.png" alt="Cart" width={20} height={20} />
                        <span>0</span>
                      </a>
                      <div className="cart__price">Cart: <span>$0.00</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="canvas__open" onClick={() => setIsMenuOpen(true)}>
              <i className="fa fa-bars"></i>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About</Link></li>
                  <li className="active"><Link href="/cakes">Cakes</Link></li>
                  <li><a href="#">Pages</a>
                    <ul className="dropdown">
                      <li><Link href="/shop-details">Shop Details</Link></li>
                      <li><Link href="/shopping-cart">Shopping Cart</Link></li>
                      <li><Link href="/checkout">Check Out</Link></li>
                      <li><Link href="/wishlist">Wishlist</Link></li>
                      <li><Link href="/class">Class</Link></li>
                      <li><Link href="/blog-details">Blog Details</Link></li>
                    </ul>
                  </li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* Header Section End */}
    </>
  );
} 