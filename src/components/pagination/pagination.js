import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './pagination.css'

const Pagination = ({ currentPage, range, paginationLogic, pageLimit }) => {


    useEffect(() => {
        console.log(`Current Page = ${currentPage}`)
        console.log(`Range = ${range}`)
        console.log(`PageLimit = ${pageLimit}`)
    })

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                        <Link className="page-link" to='#'>Previous</Link>
                    </li>
                    {
                        range.map((num, index) => {
                            return (
                                <li className={`page-item ${currentPage === index ? 'active' : ''} `} key={num}>
                                    <Link className="page-link" to="#"
                                        onClick={() => paginationLogic(num - 1)}
                                    >
                                        {num}
                                    </Link>
                                </li>

                            )
                        })
                    }
                    <li className={`page-item ${currentPage === pageLimit - 1 ? 'disabled' : ''}`}>
                        <Link className="page-link" to="#">Next</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination