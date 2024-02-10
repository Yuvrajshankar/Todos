import React from 'react'
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className='error'>
            <h3>Go back to
                <Link to="/"> Home</Link>
            </h3>
        </div>
    )
}

export default Error;