import React from 'react';

const List = ({list, renderList = () => {}}) => {
    return (
        <section>
            <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'32px', padding:'16px 32px'}}>
                {list?.map((item, index) => renderList(item, index))}
            </ul>
        </section>
    )
}

export { List };