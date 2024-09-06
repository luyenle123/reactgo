import {useState} from 'react'

function Panel({title, children, isActive, onShow}){
    //const [isActive, setIsActive] = useState(false);
    return(
        <section className='panel'>
            <h3>{title}</h3>
            {isActive ? (
                <p>{children}</p>
            ) : (
                <button onClick={onShow}>
                    Show
                </button>
            )}
        </section>
    );
}

export function Accordion(){
    const [activeIndex, setIactiveIndex] = useState(0);

    return(
        <>
            <div className='accordion'>
            <h2>Almaty, Kazakhstan</h2>
            <Panel title="About" isActive={activeIndex === 0} onShow={() => setIactiveIndex(0)}>
                With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
            </Panel>
            <Panel title="Etymology" isActive={activeIndex === 1} onShow={() => setIactiveIndex(1)}>
                The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
            </Panel>
            <Panel title="Comment" isActive={activeIndex === 2} onShow={() => setIactiveIndex(2)}>
                Comments
            </Panel>                          
        </div>            
        </>

    );
}