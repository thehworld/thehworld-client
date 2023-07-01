import { Fragment, useState, useEffect } from 'react';
import Paginator from 'react-hooks-paginator';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getSortedProducts } from '../../helpers/product';
import SEO from "../../components/seo";
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';

const ShopGridStandard = () => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);


    const products = [
        {
            id: "1",
            name: "Hair Gel",
            price: "489",
            stock: "20",
            discount: "0",
            image: [
              "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.webp?alt=media&token=c6b985fd-7dd2-442c-8c3a-cd2a22842f95",
              "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.webp?alt=media&token=c6b985fd-7dd2-442c-8c3a-cd2a22842f95",
              "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.webp?alt=media&token=c6b985fd-7dd2-442c-8c3a-cd2a22842f95",
            ],
            description: "this a herbal hair gel made with vital herbs."
          },
          {
            id: "2",
            name: "Hair Serum",
            price: "368",
            stock: "20",
            discount: "0",
            image: [
              "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.jpg?alt=media&token=762749f0-cec2-473c-a1e8-e10fa46c882f",
              "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.jpg?alt=media&token=762749f0-cec2-473c-a1e8-e10fa46c882f",
              "https://firebasestorage.googleapis.com/v0/b/the-h-world.appspot.com/o/images%2F1.jpg?alt=media&token=762749f0-cec2-473c-a1e8-e10fa46c882f",
            ],
            description: "this a herbal hair Serum made with vital herbs."
          }
      ]
    const pageLimit = 15;
    let { pathname } = useLocation();

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue ]);

    return (
        <Fragment>
            <SEO
                titleTemplate="Shop Page"
                description="Shop page of flone react minimalist eCommerce template."
            />

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb 
                    pages={[
                        {label: "Home", path: process.env.PUBLIC_URL + "/" },
                        {label: "Shop", path: process.env.PUBLIC_URL + pathname }
                    ]} 
                />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar products={products} getSortParams={getSortParams} sideSpaceClass="mr-30"/>
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}


export default ShopGridStandard;