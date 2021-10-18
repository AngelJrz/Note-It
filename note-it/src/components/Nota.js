import React from 'react'

export default function Nota(props){
    const { nota } = props;
    
    return( 
        <div key={nota._id} className="nota">
            <h1>{nota.title}</h1>
            <h2>usuario generico</h2>
            <p>
                {
                    nota.body
                }
            </p>
        </div>
    );
} 