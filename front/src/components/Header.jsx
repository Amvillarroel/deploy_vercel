import React from 'react';

const Header = () => {
    return (
        <header style={{padding: '0 32px', backgroundColor:'#003d96'}}>
            <nav style={{height:'68px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <section style={{height:'68px', display:'flex', gap:'8px', justifyContent:'space-between', alignItems:'center'}}>
                    <picture>
                        <a style={{display:'inline-block'}} href="#">
                            <img style={{maxWidth:'150px'}} src="/Netflix_2015_logo.svg.png" alt="logo" />
                        </a>
                    </picture>
                    <ul style={{ margin:'0', listStyle:'none', display:'flex', gap:'8px', justifyContent:'space-between'}}>
                        <li style={{color:'white'}}>Home</li>
                        <li style={{color:'white'}}>Movies</li>
                        <li style={{color:'white'}}>Series</li>
                    </ul>
                </section>

                <form action="">
                    <input type="text" placeholder='Titulos, generos'/>
                </form>
            </nav>
        </header>
    )
}

export { Header };