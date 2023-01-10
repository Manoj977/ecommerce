import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import  {toast} from 'react-toastify';
import Pagination from 'react-js-pagination';

export  default function Home(){
   
    const {products, loading, error, productsCount, resPerPage} =    useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    useEffect(()=>{
        if(error) {
            return toast.error(error,{
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(currentPage)) 
      
    }, [error,dispatch, currentPage])

    const setCurrentPageNo = (pageNo) =>{
        setCurrentPage(pageNo);
    }

    return (
        <Fragment>
            {loading ? <Loader/>:
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                    <div className="row">
                        { products && products.map(product => (
                            <Product key={product._id} product={product}/>
                        ))}
                    
                    </div>
                    </section>
                    {productsCount>0 && resPerPage <= productsCount?
                    <div className="d-flex justify-content-center mt-5">
                  
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText= {'Next'}
                            prevPageText = {'Prev'}
                            firstPageText = {'First'}
                            lastPageText = {'Last'}
                            itemClass = {'page-item'}
                            linkClass = {'page-link'}    
                        />
                    </div>
                    :null}
                 
                </Fragment>
           }
        </Fragment>
    )
}