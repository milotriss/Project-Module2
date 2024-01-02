import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import ProductService from "../../services/products.service";
import Product from "../product/product";
import "./products.css";
import { CgSearchLoading } from "react-icons/cg";
import { IProduct } from "../../types/interface";
import { useSelector } from "react-redux";

const Products = (): JSX.Element => {
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [active, setActive] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const status = useSelector((state: any) => state.update);
  const productService = new ProductService();
  useEffect(() => {
    const getProducts = async () => {
      const productService = new ProductService();
      const allProducts = await productService.getAllProducts();
      setProductsData(allProducts);
    };
    getProducts();
  }, [status]);

  const handleGetProducts = async (e: MouseEvent<HTMLElement>) => {
    let liElement = e.target as HTMLElement;
    setActive(liElement.innerText);
    if (liElement.innerText === "All") {
      const allProducts = await productService.getAllProducts();
      setProductsData(allProducts);
    } else {
      const categoryProducts = await productService.getProductsCategory(
        liElement.innerText
      );
      setProductsData(categoryProducts);
    }
  };

  const handleSearch = async (e: any) => {
    if (e.target.value != "") {
      setSearch(e.target.value);
    } else {
      setSearch("");
    }
  };
  useEffect(() => {
    const getProductsSearch = async () => {
      const productsSearch = await productService.onSearch(search);
      setProductsData(productsSearch);
    };
    setTimeout(() => {
      getProductsSearch();
    }, 1000);
  }, [search]);
  return (
    <div className="productsBackGround">
      <div className="products__overlay">
        <main className="mainProducts">
          <div className="category">
            <ul>
              <li
                onClick={handleGetProducts}
                className={
                  active === "All"
                    ? "list-category active-category"
                    : "list-category"
                }
              >
                All
              </li>
              <li
                onClick={handleGetProducts}
                className={
                  active === "Cake & Deserts"
                    ? "list-category active-category"
                    : "list-category"
                }
              >
                Cake & Deserts
              </li>
              <li
                onClick={handleGetProducts}
                className={
                  active === "Bread"
                    ? "list-category active-category"
                    : "list-category"
                }
              >
                Bread
              </li>
              <li
                onClick={handleGetProducts}
                className={
                  active === "Cookie & Biscuit"
                    ? "list-category active-category"
                    : "list-category"
                }
              >
                Cookie & Biscuit
              </li>
              <li
                onClick={handleGetProducts}
                className={
                  active === "Burger & Pizza"
                    ? "list-category active-category"
                    : "list-category"
                }
              >
                Burger & Pizza
              </li>
              <li
                onClick={handleGetProducts}
                className={
                  active === "Donuts"
                    ? "list-category active-category"
                    : "list-category"
                }
              >
                Donuts
              </li>
            </ul>
            <div className="category__search">
              <input
                onChange={handleSearch}
                value={search}
                className="search-input"
                placeholder="Search..."
                type="text"
              />
              <CgSearchLoading className="iconSearchProduct" />

              {/* <ul className="list-search" /> */}
            </div>
          </div>
          <Product productsData={productsData} />
        </main>
      </div>
    </div>
  );
};

export default Products;
