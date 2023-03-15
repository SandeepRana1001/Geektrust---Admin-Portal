import './loader.css'

const Loader = ({ loading, msg }) => {
    return (
        <div className='mt-5'>
            {
                loading && (
                    <div className="row justify-content-center">
                        <div className="spinner-border mb-3" role="status">
                        </div>
                        <h5> {msg} </h5>
                    </div>
                )
            }
        </div>
    )

}

export default Loader